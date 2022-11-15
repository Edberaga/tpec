import React, {useRef} from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4jw6323', 'template_2lbsywe', form.current, '4fUckbrucyinVihca')
      .then((result) => {
          console.log(result.text);
          alert('Mail sent succesfully');
      }, (error) => {
          console.log(error.text);
          alert('Mail sent error...');
      });
  };
  return (
    <form ref={form} onSubmit={sendEmail} className='contact-form'>
      <input 
        type="text" 
        name="name"
        placeholder='Your name'
        className='label-input' 
      />

      <input 
        type="email" 
        name="email"
        placeholder='Email address'
        className='label-input'  
      />

      <input 
        type="number" 
        name="phone_number"
        placeholder='Phone number'
        className='label-input' 
      />

      <input 
        type="text" 
        name="subject"
        placeholder='Subject'
        className='label-input' 
      />

      <textarea 
        name="message" 
        placeholder='Write message'
        className='text-input' 
      />

      <input type="submit" value="Send Message" className='submit-btn' />
    </form>
  )
}
