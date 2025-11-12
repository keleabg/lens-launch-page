import { Card, CardContent } from './ui/Card';

const testimonials = [
  {
    quote: 'Picha Zuri captured our wedding day perfectly. The photos are stunning, and they managed to get all the special moments without us even noticing. Highly recommended!',
    name: 'Aisha & Omar',
    location: 'Nairobi, Kenya',
  },
  {
    quote: 'The team at Picha Zuri is incredibly professional and talented. They made me feel so comfortable during my portrait session, and the results were beyond my expectations.',
    name: 'Samuel Kiprop',
    location: 'Eldoret, Kenya',
  },
  {
    quote: 'We hired Picha Zuri for our corporate event, and they did an amazing job. The photos are a great asset for our marketing materials. We will definitely be using their services again.',
    name: 'Jumoke Adisa, CEO of KaziConnect',
    location: 'Lagos, Nigeria',
  },
];

export function Testimonials() {
  return (
    <section id='testimonials' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold tracking-tight'>What Our Clients Say</h2>
          <p className='mt-4 text-lg text-gray-600'>We are proud to have worked with amazing people and businesses.</p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className='flex flex-col justify-between'>
              <CardContent className='pt-6'>
                <p className='text-gray-600 italic'>"{testimonial.quote}"</p>
              </CardContent>
              <div className='p-6 pt-0 text-right'>
                <p className='font-bold'>{testimonial.name}</p>
                <p className='text-sm text-gray-500'>{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}