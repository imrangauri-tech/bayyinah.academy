import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COURSES_FAQ = [
  {
    question: "What subjects do you offer?",
    answer: "Courses include Quran Reading, Tajweed, Hifz, Arabic, and Islamic Studies.",
  },
  {
    question: "Are these classes based on age or level?",
    answer: "Yes. Courses are designed for different age groups and skill levels.",
  },
  {
    question: "Can I take more than one course at a time?",
    answer: "Yes, you can customise your plan to include multiple subjects.",
  },
  {
    question: "How long are the courses?",
    answer: "Courses are structured monthly but continue based on your chosen schedule.",
  },
  {
    question: "Can I start anytime?",
    answer: "Yes, enrollment is open year-round.",
  },
  {
    question: "Are different languages used?",
    answer:
      "Yes, we currently support English and Arabic, with more languages to be added based on demand.",
  },
];

const CoursesFaqSection = () => {
  return (
    <section aria-describedby="courses-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Course FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Your Course Questions Answered
          </h3>
        </div>

        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {COURSES_FAQ.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`${i}`}
                className="p-4 sm:p-8 bg-gradient-to-r from-[#F8F8F8] to-[#F8F8F8] last:border rounded-3xl border border-[#F7F7F6] transition-all duration-300 data-[state=open]:border-regal-blue-500"
              >
                <AccordionTrigger className="text-lg sm:text-2xl p-0 font-bold text-neutral-900 hover:no-underline [&>svg]:w-7 [&>svg]:h-7">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg font-normal text-neutral-700 pb-0 mt-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex items-center justify-center w-full">
          <Button asChild className="rounded-full text-base sm:text-xl py-3 h-auto px-6">
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesFaqSection;
