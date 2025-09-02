import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Bayyinah Academy | Online Quran & Arabic Courses Frequently Asked Questions",
  description:
    "Find answers to common questions about Bayyinah Academy’s online Quran, Tajweed, and Arabic courses. Explore details on pricing, class schedules, teachers, certifications, and how to start your learning journey.",
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
