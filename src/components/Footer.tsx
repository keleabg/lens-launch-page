import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-white">Picha Zuri</p>
          <p className="mt-1 text-sm text-gray-400">&copy; 2025 Picha Zuri. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
            <Facebook size={24} />
          </a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;