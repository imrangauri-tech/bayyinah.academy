// components/courses/CoursesFaqSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type QA = { question: string; answer: string };

const COURSES_FAQ: QA[] = [
  {
    question: "What does the Quran course cover?",
    answer: "It includes reading, Tajweed, Makharij and basic understanding.",
  },
  {
    question: "What skills are taught in Arabic classes?",
    answer: "Reading, writing, grammar, and conversation.",
  },
  {
    question: "What is taught in Islamic Studies?",
    answer: "Subjects include Aqeedah, Seerah and Akhlaaq.",
  },
  {
    question: "Is the curriculum authentic?",
    answer: "Yes. All lessons are based on reliable Islamic sources.",
  },
  {
    question: "Will I get reports on student progress?",
    answer:
      "Yes. Feedback and progress reports are shared regularly based on the course enrolled.",
  },
  {
    question: "Are certificates given?",
    answer:
      "Yes, certificates are awarded upon course completion as per the enrolled program.",
  },
];

const CoursesFaqSection: React.FC = () => {
  return (
    <section
      aria-describedby="courses-faq-section"
      className="py-10 sm:py-16 bg-neutral-100"
    >
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
