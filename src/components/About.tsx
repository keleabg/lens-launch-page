export function About() {
    return (
      <section id='about' className='py-20 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl font-extrabold tracking-tight'>About Picha Zuri</h2>
              <p className='mt-4 text-lg text-gray-600'>
                Picha Zuri, Swahili for 'Beautiful Pictures', is a premier photography studio based in the heart of Africa. We are a passionate team of storytellers who believe in the power of an image to capture a moment, convey an emotion, and preserve a memory forever.
              </p>
              <p className='mt-4 text-gray-600'>
                Our style is a blend of fine-art and photojournalism. We craft images that are not only beautiful but also authentic and meaningful. From the grandest celebrations to the most intimate portraits, we approach every project with creativity, professionalism, and a commitment to excellence.
              </p>
            </div>
            <div>
                <img 
                    src='https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/portfolio-image-2-gsvgsbx-1762775123150.webp' 
                    alt='About Picha Zuri' 
                    className='rounded-lg shadow-xl w-full h-auto object-cover' 
                />
            </div>
          </div>
        </div>
      </section>
    );
  }