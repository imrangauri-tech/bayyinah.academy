"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CONTACT_FAQ = [
  // Provided items
  {
    question: "How can I contact Bayyinah Academy?",
    answer:
      "Reach out via our website contact form, WhatsApp, or email at support@bayyinahschool.com.",
  },
  {
    question: "How quickly do you respond?",
    answer: "We aim to reply within 24 hours on working days.",
  },
  {
    question: "Can I talk to a tutor before enrolling?",
    answer: "Yes—book a free trial to interact with a tutor.",
  },
  {
    question: "Do you support international time zones?",
    answer: "Yes, our admin and teaching teams operate across multiple regions.",
  },
  {
    question: "Can I leave feedback or a complaint?",
    answer:
      "Absolutely. Use our email or the contact form to share concerns or suggestions.",
  },
  {
    question: "How do I get help in urgent cases?",
    answer:
      'Use WhatsApp or write "URGENT" in your email subject for priority assistance.',
  },

];

const ContactFaqSection = () => {
  return (
    <section aria-describedby="contact-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Contact FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Get Help & Reach Us
          </h3>
        </div>

        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {CONTACT_FAQ.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`${i}`}
                className="group p-4 sm:p-8 bg-gradient-to-r from-[#F8F8F8] to-[#F8F8F8] last:border rounded-3xl border border-[#F7F7F6] transition-all duration-300 data-[state=open]:border-regal-blue-500 hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.01] transform cursor-pointer"
              >
                <AccordionTrigger className="text-lg sm:text-2xl p-0 font-bold text-neutral-900 hover:no-underline [&>svg]:w-7 [&>svg]:h-7 transition-all duration-300 ease-out group-hover:text-regal-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg font-normal text-neutral-700 pb-0 mt-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ContactFaqSection;
