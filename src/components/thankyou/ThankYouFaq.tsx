"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const THANK_YOU_FAQ = [
  {
    question: "What happens after I book a trial?",
    answer: "You receive a confirmation, and our admin team schedules the class.",
  },
  {
    question: "Is the trial really free?",
    answer: "Yes. No payment or commitment is required.",
  },
  {
    question: "Can I choose the trial timing?",
    answer: "Yes. We offer flexible scheduling.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "Just a quiet space, a laptop or computer, stable internet, and headphones with a mic if needed.",
  },
  {
    question: "What if I want to continue after the trial?",
    answer: "Select a plan and begin classes right away with admin support.",
  },
  {
    question: "Can I give feedback after my trial?",
    answer: "Absolutely! We welcome your feedback to improve your learning experience.",
  },
];

const ThankYouFaq = () => {
  return (
    <section
      aria-describedby="thankyou-faq-section"
      className="py-10 sm:py-16 bg-neutral-100"
    >
      <div className="container">
        {/* Heading */}
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Trial FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Everything About Your Free Trial
          </h3>
        </div>

        {/* Accordion */}
        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {THANK_YOU_FAQ.map((faq, i) => (
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

export default ThankYouFaq;
