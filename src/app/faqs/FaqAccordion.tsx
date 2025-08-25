import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqTypes } from "@/types";
import React from "react";

interface FaqAccordionProps {
  faqData: FaqTypes[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqData }) => {
  return (
    <React.Fragment>
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`${index}`}
            className="p-4 sm:p-8 bg-gradient-to-r from-0% from-[#F8F8F8] to-100% to-[#F8F8F8] last:border rounded-3xl border border-[#F7F7F6] transition-all ease-in-out duration-300 data-[state=open]:border-regal-blue-500"
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
    </React.Fragment>
  );
};

export default FaqAccordion;
