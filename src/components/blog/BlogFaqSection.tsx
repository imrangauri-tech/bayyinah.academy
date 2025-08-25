"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BLOG_FAQ = [
  {
    question: "What topics are covered in your blog?",
    answer:
      "Our blog features Islamic knowledge and essential teachings to help families grow in faith and understanding.",
  },
  {
    question: "How often is new content posted?",
    answer:
      "We update the blog regularly with relevant, engaging content.",
  },
  {
    question: "Who writes your blog posts?",
    answer:
      "Our content is written by our educators and guest contributors with expertise in Islamic and educational fields.",
  },
  {
    question: "Can I share your blog articles?",
    answer:
      "Yes, please credit Bayyinah Academy when sharing.",
  },
  {
    question: "Can I suggest a topic?",
    answer:
      "Yes. Submit your ideas via our contact page.",
  },
  {
    question: "Is the blog suitable for families?",
    answer:
      "Yes, all posts follow a family-friendly and Islamic tone.",
  },
];

const BlogFaqSection = () => {
  return (
    <section aria-describedby="blog-faq-section" className="py-10 sm:py-16 bg-neutral-100">
      <div className="container">
        {/* Heading block (same style as PricingFaqSection) */}
        <div className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-14 sm:mb-24">
          <h6 className="px-5 text-base font-medium text-neutral-800 text-center py-2.5 bg-[#CFE9FA] rounded-full w-max border border-[#C1DDEF]">
            Blog FAQ
          </h6>
          <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug">
            Everything About Our Blog
          </h3>
        </div>

        {/* Accordion (identical styling to PricingFaqSection) */}
        <div className="mb-10 sm:mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {BLOG_FAQ.map((faq, i) => (
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

export default BlogFaqSection;
