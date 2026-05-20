import React from "react";
import {
  ContactHero,
  ContactInfoCards,
  ContactForm,
  ContactMap,
  ContactFAQ,
  ContactSocials,
} from "./components";
import { PageGlow } from "@/components/ui";

const Contact = () => {
  return (
    <main
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-[#f8fbfd]
        via-white
        to-[#eef4f8]

        text-[#0f172a]

        transition-colors
        duration-300

        dark:from-[#020617]
        dark:via-[#07111f]
        dark:to-[#0f172a]

        dark:text-[#e7ecef]
      "
    >
      <PageGlow />

      <div className="relative z-10 contact-page">
        <ContactHero />
        <ContactInfoCards />
        <ContactForm />
        <ContactMap />
        <ContactFAQ />
        <ContactSocials />
      </div>
    </main>
  );
};

export default Contact;
