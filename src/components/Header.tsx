import { Link } from 'react-scroll';
import { Camera, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';

const navLinks = [
  { to: 'about', label: 'About Us' },
  { to: 'services', label: 'Services' },
  { to: 'portfolio', label: 'Portfolio' },
  { to: 'testimonials', label: 'Testimonials' },
  { to: 'contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-400 to-orange-600 shadow-md'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Link to='hero' smooth={true} duration={500} className='flex items-center space-x-2 cursor-pointer'>
            <Camera className='h-8 w-8 text-white' />
            <span className='text-2xl font-bold text-white'>Picha Zuri</span>
          </Link>
          <nav className='hidden md:flex space-x-8'>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className='text-lg font-medium text-white hover:text-orange-200 transition-colors cursor-pointer'
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className='md:hidden'>
            <Button onClick={() => setIsOpen(!isOpen)} variant='ghost' size='icon' className="text-white hover:text-white">
              {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden bg-gradient-to-r from-orange-400 to-orange-600'>
          <nav className='flex flex-col items-center space-y-4 py-4'>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className='text-lg font-medium text-white hover:text-orange-200 transition-colors cursor-pointer'
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}