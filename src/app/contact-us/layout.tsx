import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us – Bayyinah Academy | Get in Touch for Online Quran & Arabic Courses",
  description:
    "Have questions about Bayyinah Academy’s Quran, Tajweed, or Arabic courses? Contact us today for enrollment details, pricing, and support. Our team is here to guide you on your online learning journey",
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
