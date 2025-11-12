import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { toast } from 'sonner';

export function Contact() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Your message has been sent! We will get back to you shortly.');
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <section id='contact' className='py-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold tracking-tight'>Get in Touch</h2>
          <p className='mt-4 text-lg text-gray-600'>Have a project in mind? We'd love to hear from you.</p>
        </div>
        <div className='max-w-xl mx-auto'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <Input type='text' placeholder='Your Name' required />
              <Input type='email' placeholder='Your Email' required />
            </div>
            <Input type='text' placeholder='Subject' required />
            <Textarea placeholder='Your Message' rows={5} required />
            <div className='text-center'>
                <Button type='submit' size='lg'>Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}