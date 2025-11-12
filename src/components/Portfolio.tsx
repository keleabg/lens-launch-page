const portfolioImages = [
    { src: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/portfolio-image-1-2a7ws1p-1762775114478.webp', alt: 'Landscape' },
    { src: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/portfolio-image-2-gsvgsbx-1762775123150.webp', alt: 'Street' },
    { src: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/portfolio-image-3-909pxvm-1762775132035.webp', alt: 'Festival' },
    { src: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/portfolio-image-4-te4pypz-1762775141253.webp', alt: 'Architecture' },
    { src: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/african-woman-portrait-n51ktec-1762775509909.webp', alt: 'African Woman Portrait' },
    { src: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/happy-family-portrait-6xexpgg-1762775526892.webp', alt: 'Happy Family Portrait' },
  ];
  
  export function Portfolio() {
    return (
      <section id='portfolio' className='py-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-extrabold tracking-tight'>Our Portfolio</h2>
            <p className='mt-4 text-lg text-gray-600'>A glimpse into our world of captivating imagery.</p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {portfolioImages.map((image, index) => (
              <div key={index} className='overflow-hidden rounded-lg shadow-lg'>
                <img src={image.src} alt={image.alt} className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }