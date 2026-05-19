import React from 'react';
import {
  ContactHero,
  ContactInfoCards,
  ContactForm,
  ContactMap,
  ContactFAQ,
  ContactSocials,
} from './components';

const Contact = () => {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <ContactMap />
      <ContactFAQ />
      <ContactSocials />
    </div>
  );
};

export default Contact;