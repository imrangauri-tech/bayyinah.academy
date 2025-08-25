"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TESTIMONIALS_FAQ = [
  {
    question: "Are your testimonials genuine?",
    answer: "Yes. All reviews are from real students and parents.",
  },
  {
    question: "Can I send in my review?",
    answer: "Yes. Share your feedback via email or the contact form.",
  },
  {
    question: "Do you publish video testimonials?",
    answer: "Yes, with consent from the parent or student.",
  },
  {
    question: "How do you collect feedback?",
    answer: "Via forms after classes, periodic check-ins, or at course completion.",
  },
  {
    question: "Do testimonials reflect current staff?",
    answer: "Yes, we ensure they relate to active tutors.",
  },
  {
    question: "Are all reviews published?",
    answer: "We publish selected reviews to help guide others.",
  },
];

const TestimonialsFaqSection = () => {
  return (
    <section aria-describedby="testimonials-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        {/* Heading block (same style as PricingFaqSection) */}
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Testimonials FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Everything About Reviews & Feedback
          </h3>
        </div>

        {/* Accordion (identical styling to PricingFaqSection) */}
        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {TESTIMONIALS_FAQ.map((faq, i) => (
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

export default TestimonialsFaqSection;
