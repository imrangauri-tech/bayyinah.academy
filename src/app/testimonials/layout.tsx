import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Testimonials – Bayyinah Academy Reviews & Success Stories",
  description:
    "Read real testimonials from Bayyinah Academy students worldwide. Discover how our online Quran, Tajweed, and Arabic courses have helped learners achieve their goals and transform their Islamic learning journey",
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
