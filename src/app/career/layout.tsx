import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Bayyinah Academy | Teach Quran & Arabic Online",
  description:
    "Join Bayyinah Academy’s team of expert Quran and Arabic teachers. Explore career opportunities in online Islamic education, connect with students worldwide, and make an impact by teaching Quran, Tajweed, and Islamic studies online.",
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
