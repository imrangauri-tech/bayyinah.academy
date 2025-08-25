import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TEACHERS_FAQ = [
  {
    question: "How are your teachers hired?",
    answer:
      "Through a multi-step selection process that includes application screening, demo sessions, and background checks.",
  },
  {
    question: "Are teachers trained for child instruction?",
    answer:
      "Yes. Many specialise in early childhood and teen learning, with training focused on engagement, patience, and age-appropriate methods.",
  },
  {
    question: "Can I select a preferred tutor?",
    answer:
      "Yes. We’ll match you based on your preferences and allow future changes if needed.",
  },
  {
    question: "Where are your teachers located?",
    answer:
      "They’re from various countries including the UK, Egypt, India, and Gulf countries, serving students across time zones.",
  },
  {
    question: "Can I choose a male or female tutor?",
    answer:
      "Yes. We respect student and parent preferences wherever possible.",
  },
  {
    question: "Do teachers speak multiple languages?",
    answer:
      "Our teachers support English and Arabic. More languages may be added soon.",
  },
];

const TeachersFaqSection = () => {
  return (
    <section aria-describedby="teachers-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Teachers FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Questions About Our Teachers
          </h3>
        </div>

        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {TEACHERS_FAQ.map((faq, i) => (
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

export default TeachersFaqSection;
