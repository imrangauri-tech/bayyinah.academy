// components/teachers/TeacherFaqSection.tsx
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

const TEACHER_FAQS: QA[] = [
  {
    question: "How do I apply to teach with Bayyinah Academy?",
    answer:
      "Apply using our Teacher Application Form. Shortlisted candidates will be contacted for a demo.",
  },
  {
    question: "What are the teaching expectations?",
    answer:
      "Punctuality, commitment, Islamic etiquette, and professionalism are essential.",
  },
  {
    question: "What equipment do I need to teach?",
    answer:
      "A laptop or computer with stable internet and headphones with a mic; mobile phones are not allowed.",
  },
  {
    question: "What conduct is expected during class?",
    answer:
      "Teachers must remain professional, respectful, and focused during every session.",
  },
  {
    question: "Can I reschedule or cancel a class?",
    answer:
      "Yes, but with at least 24 hours’ notice to the Admin Team.",
  },
  {
    question: "How is teaching quality monitored?",
    answer:
      "Through feedback, class recordings, and parent communication.",
  },

];

const TeacherFaqSection: React.FC = () => {
  return (
    <section aria-describedby="teachers-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#B8E0F7] hover:border-[#A5D1F0] transform">
            Teachers FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
            Questions About Our Teachers
          </h3>
        </div>

        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {TEACHER_FAQS.map((faq, i) => (
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

        <div className="flex items-center justify-center w-full">
          <Button 
            asChild 
            className="rounded-full text-base sm:text-xl py-3 h-auto px-6 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
          >
            <Link href="/teacher-form">Apply to Teach</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeacherFaqSection;
