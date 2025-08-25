import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "../ui/button";

const FAQ_DATA = [
  {
    question: "What is Bayyinah Academy?",
    answer:
      "Bayyinah Academy is an online platform providing live Quran, Arabic, and Islamic Studies classes for students of all ages.",
  },
  {
    question: "What makes your academy unique?",
    answer:
      "We offer personalised learning, flexible scheduling, and a values-based approach with experienced tutors.",
  },
  {
    question: "Are your instructors qualified?",
    answer:
      "Yes. All instructors undergo a selection process and are trained in both subject and teaching methodology.",
  },
  {
    question: "Who operates the Academy?",
    answer:
      "Our team includes dedicated educators and administrators focused on Islamic education and student well-being.",
  },
  {
    question: "Where are you located?",
    answer:
      "We are based in the UK with a remote office in Dubai, serving students worldwide.",
  },
  {
    question: "Can I try a class before enrolling?",
    answer:
      "Yes, we offer a free 30-minute trial session to help you explore our teaching approach.",
  },
];

const FaqSection = () => {
  return (
    <React.Fragment>
      <section aria-describedby="faq-section" className="py-10 sm:py-16 bg-neutral-100">
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="top-content"
              className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24"
            >
              <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] flex items-center justify-center rounded-full w-max border border-[#C1DDEF] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#B8E0F7] hover:border-[#A5D1F0] transform">
                FAQ
              </h6>
              <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
                Got Questions? We've Got Answers
              </h3>
            </div>

            <div aria-describedby="faq-wrapper" className="mb-10 sm:mb-20">
              <Accordion type="single" collapsible className="space-y-4">
                {FAQ_DATA.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${index}`}
                    className="group p-4 sm:p-8 bg-gradient-to-r from-0% from-[#F8F8F8] to-100% to-[#F8F8F8] last:border rounded-3xl border border-[#F7F7F6] transition-all ease-in-out duration-300 data-[state=open]:border-regal-blue-500 hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.01] transform cursor-pointer"
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

            <div
              aria-describedby="free-session-btn"
              className="flex items-center justify-center flex-col w-full"
            >
              <Button
                asChild
                className="rounded-full text-base sm:text-xl py-3 h-auto px-6 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
              >
                <Link href={"/trial"}>Join Your Free Session Now!</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FaqSection;
