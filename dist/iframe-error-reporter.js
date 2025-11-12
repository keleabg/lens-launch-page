/**
 * Runtime Error Reporter for Child Frames
 *
 * This script captures runtime errors in a child iframe and reports them
 * to the parent window using the postMessage API.
 *
 * Usage:
 * Include this script in your iframe/child application:
 * <script src="/iframe-error-reporter.js"></script>
 *
 * Or for Next.js, add to _app.tsx or _document.tsx
 */

(function () {
  "use strict";

  // Configuration
  const config = {
    // Maximum stack trace lines to include
    maxStackLines: 20,
    // Debounce time to prevent duplicate error reports (ms)
    debounceTime: 100,
    // Whether to log errors to console as well
    logToConsole: true,
    // Parent origin (use '*' for any origin, or specify like 'https://example.com')
    parentOrigin: "*",
  };

  // Track reported errors to avoid duplicates
  const reportedErrors = new Set();
  let debounceTimer = null;

  /**
   * Normalize and truncate stack trace
   */
  function normalizeStack(stack) {
    if (!stack) return "";

    const lines = stack.split("\n").slice(0, config.maxStackLines);
    return lines.join("\n");
  }

  /**
   * Create a unique error signature for deduplication
   */
  function getErrorSignature(message, filename, lineno, colno) {
    return `${message}|${filename}|${lineno}|${colno}`;
  }

  /**
   * Send error details to parent window
   */
  function reportErrorToParent(errorData) {
    try {
      if (!window.parent || window.parent === window) {
        // No parent window or we are the parent
        return;
      }

      // Create the message payload
      const message = {
        type: "dala_runtime_error",
        timestamp: new Date().toISOString(),
        ...errorData,
      };

      // Send to parent
      window.parent.postMessage(message, config.parentOrigin);

      if (config.logToConsole) {
        console.log("[IframeErrorReporter] Error reported to parent:", message);
      }
    } catch (err) {
      console.error(
        "[IframeErrorReporter] Failed to report error to parent:",
        err,
      );
    }
  }

  /**
   * Handle global errors
   */
  function handleError(event) {
    // Extract error details
    const message = event.message || event.error?.message || "Unknown error";
    const filename = event.filename || "";
    const lineno = event.lineno || 0;
    const colno = event.colno || 0;
    const stack = event.error?.stack || "";

    // Create error signature for deduplication
    const signature = getErrorSignature(message, filename, lineno, colno);

    // Check if we've already reported this error
    if (reportedErrors.has(signature)) {
      return;
    }

    // Mark as reported
    reportedErrors.add(signature);

    // Clear the set after 5 seconds to allow re-reporting if the error persists
    setTimeout(() => reportedErrors.delete(signature), 5000);

    // Debounce to prevent flooding
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      reportErrorToParent({
        errorType: "javascript_error",
        message: message,
        filename: filename,
        line: lineno,
        column: colno,
        stack: normalizeStack(stack),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    }, config.debounceTime);

    // Don't prevent default error handling
    return false;
  }

  /**
   * Handle unhandled promise rejections
   */
  function handleUnhandledRejection(event) {
    const reason = event.reason;
    let message = "Unhandled Promise Rejection";
    let stack = "";

    if (reason instanceof Error) {
      message = reason.message || message;
      stack = reason.stack || "";
    } else if (typeof reason === "string") {
      message = reason;
    } else if (reason && typeof reason === "object") {
      message = reason.message || JSON.stringify(reason);
      stack = reason.stack || "";
    }

    const signature = getErrorSignature(message, "promise", 0, 0);

    if (reportedErrors.has(signature)) {
      return;
    }

    reportedErrors.add(signature);
    setTimeout(() => reportedErrors.delete(signature), 5000);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      reportErrorToParent({
        errorType: "unhandled_rejection",
        message: message,
        stack: normalizeStack(stack),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    }, config.debounceTime);
  }

  /**
   * Listen for messages from parent (handshake, config, etc.)
   */
  function handleParentMessage(event) {
    const data = event.data;

    if (!data || typeof data !== "object") {
      return;
    }

    // Respond to parent's ping with pong
    if (data.type === "host_ping") {
      try {
        window.parent.postMessage({ type: "pong" }, config.parentOrigin);
      } catch (err) {
        console.error("[IframeErrorReporter] Failed to respond to ping:", err);
      }
    }

    // Respond to error request
    if (data.type === "host_request_error") {
      try {
        window.parent.postMessage({ type: "alive" }, config.parentOrigin);
      } catch (err) {
        console.error(
          "[IframeErrorReporter] Failed to respond to error request:",
          err,
        );
      }
    }

    // Handle ready signal from parent
    if (data.type === "host_ready") {
      try {
        window.parent.postMessage({ type: "ready" }, config.parentOrigin);
      } catch (err) {
        console.error(
          "[IframeErrorReporter] Failed to respond to host ready:",
          err,
        );
      }
    }
  }

  /**
   * Initialize error reporting
   */
  function init() {
    // Only initialize if we're in an iframe
    if (window.parent === window) {
      if (config.logToConsole) {
        console.log(
          "[IframeErrorReporter] Not in an iframe, skipping initialization",
        );
      }
      return;
    }

    // Set up error listeners
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("message", handleParentMessage);

    // Optional: Wrap console.error to capture console errors
    // Uncomment the line below if you want to capture console.error calls
    // wrapConsoleError();

    if (config.logToConsole) {
      console.log("[IframeErrorReporter] Error reporting initialized");
    }

    // Send ready signal to parent
    try {
      window.parent.postMessage({ type: "app_ready" }, config.parentOrigin);
    } catch (err) {
      console.error("[IframeErrorReporter] Failed to send ready signal:", err);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose configuration function for advanced users
  window.IframeErrorReporter = {
    configure: function (options) {
      Object.assign(config, options);
    },
    getConfig: function () {
      return { ...config };
    },
  };
})();
