import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PRICING_FAQ = [
  {
    question: "What are the tuition fees?",
    answer: "Fees depend on class type, subject, and how often.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "No. All charges are included in your selected plan.",
  },
  {
    question: "Do you offer any discounts?",
    answer: "Yes. We offer family discounts (5% off) when two or more siblings join the same course.",
  },
  {
    question: "Is monthly payment available?",
    answer: "Yes. All plans are billed every four weeks on the 28th of each month in advance.",
  },
  {
    question: "Can I change my package later?",
    answer: "Yes. Upgrades or adjustments are possible with admin support.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Refunds depend on our Terms & Conditions. Contact support for more details.",
  },
];

const PricingFaqSection = () => {
  return (
    <section aria-describedby="pricing-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Pricing FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Everything About Plans & Billing
          </h3>
        </div>

        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {PRICING_FAQ.map((faq, i) => (
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
            <Link href="/pricing">See Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingFaqSection;
