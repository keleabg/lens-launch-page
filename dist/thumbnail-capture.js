/**
 * Screenshot Capture Script for Sandbox Iframes
 * This script is injected into sandbox iframes to enable screenshot capture
 * via postMessage communication with the parent window.
 */

(function () {
  "use strict";

  // Check if we're already injected
  if (window.__screenshotCaptureInjected) {
    return;
  }
  window.__screenshotCaptureInjected = true;

  // Check if we should auto-load based on URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("enableScreenshotCapture") === "true") {
    // Send ready signal immediately since we're auto-loaded
    window.parent.postMessage(
      {
        type: "SANDBOX_READY",
        ready: true,
      },
      "*",
    );
  }

  // Load html2canvas dynamically
  function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
      // Check if html2canvas is already loaded
      if (window.html2canvas) {
        resolve(window.html2canvas);
        return;
      }

      // Create script element to load html2canvas-pro
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/html2canvas-pro@1.5.12/dist/html2canvas-pro.min.js";
      script.onload = () => {
        console.log("html2canvas-pro loaded in sandbox");
        resolve(window.html2canvas);
      };
      script.onerror = () => {
        reject(new Error("Failed to load html2canvas-pro"));
      };
      document.head.appendChild(script);
    });
  }

  // Capture screenshot function
  async function captureScreenshot(options = {}) {
    try {
      console.log("Capturing screenshot within sandbox...");

      const html2canvas = await loadHtml2Canvas();

      const {
        quality = 0.95,
        format = "jpeg",
        scale = 1,
        width,
        height,
        backgroundColor = "#ffffff",
        useCORS = true,
        allowTaint = false,
      } = options;

      // Determine target element (prefer body, fallback to documentElement)
      let targetElement = document.body;
      if (!targetElement || targetElement.offsetHeight === 0) {
        targetElement = document.documentElement;
      }

      // Get viewport dimensions (visible area only)
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      console.log("Target element:", {
        tagName: targetElement.tagName,
        viewportWidth,
        viewportHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });

      // Capture only the visible viewport area
      const canvas = await html2canvas(targetElement, {
        scale,
        width: width || viewportWidth,
        height: height || viewportHeight,
        backgroundColor,
        useCORS,
        allowTaint,
        logging: true,
        x: window.scrollX,
        y: window.scrollY,
        windowWidth: viewportWidth,
        windowHeight: viewportHeight,
        onclone: (clonedDoc) => {
          console.log(
            "Document cloned for screenshot - capturing viewport only",
          );
          // Reset scroll position in cloned document to capture from current viewport
          const clonedBody = clonedDoc.body;
          if (clonedBody) {
            clonedBody.style.width = viewportWidth + "px";
            clonedBody.style.height = viewportHeight + "px";
            clonedBody.style.overflow = "hidden";
          }
        },
      });

      console.log("Canvas created:", {
        width: canvas.width,
        height: canvas.height,
      });

      // Validate canvas
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas is empty");
      }

      // Convert to data URL
      const dataUrl = canvas.toDataURL(`image/${format}`, quality);

      if (!dataUrl || dataUrl === "data:," || dataUrl.length < 100) {
        throw new Error("Invalid data URL generated");
      }

      // Convert to blob
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size === 0) {
              reject(new Error("Empty blob generated"));
              return;
            }
            console.log("Blob created:", blob.size, "bytes");
            resolve(blob);
          },
          `image/${format}`,
          quality,
        );
      });

      return {
        success: true,
        dataUrl,
        blob: dataUrl, // Send data URL since we can't send blob directly
        width: canvas.width,
        height: canvas.height,
        format,
        quality,
        size: blob.size,
      };
    } catch (error) {
      console.error("Screenshot capture failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Listen for screenshot requests from parent
  window.addEventListener("message", async (event) => {
    // Validate origin (in production, you might want to check specific origins)
    if (event.source !== window.parent) {
      return;
    }

    const { type, requestId, options } = event.data;

    if (type === "PING_SCREENSHOT_SCRIPT") {
      console.log("🏓 Ping received - responding with ready signal");
      window.parent.postMessage(
        {
          type: "SCREENSHOT_SCRIPT_READY",
          message: "Screenshot script is ready and loaded",
        },
        "*",
      );
    } else if (type === "CAPTURE_SCREENSHOT") {
      console.log("Received screenshot request:", requestId);

      const result = await captureScreenshot(options);

      // Send result back to parent
      window.parent.postMessage(
        {
          type: "SCREENSHOT_RESULT",
          requestId,
          ...result,
        },
        "*",
      );
    }
  });

  // Send ready signal to parent
  window.addEventListener("load", () => {
    window.parent.postMessage(
      {
        type: "SANDBOX_READY",
        ready: true,
      },
      "*",
    );
  });

  // Also send ready signal if already loaded
  if (document.readyState === "complete") {
    window.parent.postMessage(
      {
        type: "SANDBOX_READY",
        ready: true,
      },
      "*",
    );
  }
})();
