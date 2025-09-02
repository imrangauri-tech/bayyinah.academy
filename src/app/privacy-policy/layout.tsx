import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Bayyinah Academy | Online Quran & Arabic Courses",
  description:
    "Read Bayyinah Academy’s Privacy Policy to learn how we collect, protect, and use your personal information when you enroll in our online Quran, Tajweed, and Arabic courses. Your privacy and security are our priority",
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
