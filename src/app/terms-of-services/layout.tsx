import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – Bayyinah Academy | Online Quran & Arabic Courses",
  description:
    "Read Bayyinah Academy’s Terms of Service to understand policies, rules, and guidelines for enrolling in our online Quran, Tajweed, and Arabic courses. Stay informed about your rights and responsibilities as a student",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
