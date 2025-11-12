import { Button } from './ui/Button';
import { Link } from 'react-scroll';

export function Hero() {
  return (
    <section id='hero' className='relative h-screen flex items-center justify-center'>
      <img 
        src='https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/hero-image-63h6cnt-1762775079513.webp' 
        alt='Picha Zuri' 
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-black/50' />
      <div className='relative text-center text-white'>
        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-4'>Capturing Life's Precious Moments</h1>
        <p className='text-lg md:text-2xl max-w-3xl mx-auto mb-8'>Professional photography services in the heart of Africa. Let us tell your story.</p>
        <Link to='contact' smooth={true} duration={500} offset={-80}>
            <Button size='lg'>Book a Shoot</Button>
        </Link>
      </div>
    </section>
  );
}