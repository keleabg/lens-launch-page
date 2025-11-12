import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Camera, Video, ShoppingBag } from 'lucide-react';

const services = [
  {
    title: 'Portrait Photography',
    description: 'Professional headshots, family portraits, and personal branding sessions.',
    icon: <Camera className='h-12 w-12 text-primary' />,
    image: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/portrait-photography-9786kzf-1762775087787.webp'
  },
  {
    title: 'Event Photography',
    description: 'Capturing the energy and emotion of weddings, corporate events, and parties.',
    icon: <Video className='h-12 w-12 text-primary' />,
    image: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/event-photography-edylmoz-1762775098040.webp'
  },
  {
    title: 'Product Photography',
    description: 'High-quality images of your products for e-commerce and marketing.',
    icon: <ShoppingBag className='h-12 w-12 text-primary' />,
    image: 'https://localhost:9000/dala-staging-public-data-storage/generated-images/d99de7ee-0eac-41a1-9870-eeb1ac8b4b37/product-photography-871nyyr-1762775106376.webp'
  },
];

export function Services() {
  return (
    <section id='services' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold tracking-tight'>Our Services</h2>
          <p className='mt-4 text-lg text-gray-600'>We offer a range of photography services to meet your needs.</p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {services.map((service) => (
            <Card key={service.title} className='overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <img src={service.image} alt={service.title} className='w-full h-56 object-cover'/>
              <CardHeader className='text-center'>
                {service.icon}
                <CardTitle className='mt-4'>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-gray-600'>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}