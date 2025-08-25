'use client';

import React, { useState } from "react";
import PageHeroSection from "@/components/common/PageHeroSection";
import CourseCard from "./CourseCard";
import { CourseCardTypes } from "@/types";
import ActionSection from "./ActionSection";
import { FaqSectionCourse } from "@/components/homepage";

const COURSES_DATA: CourseCardTypes[] = [
  {
    image: {
      url: "/quran-ayat.jpg",
      alt: "course featured image",
      height: 3046,
      width: 4096,
    },
    subTitle: "Quran Tajweed",
    title: "Mastery in Quran Reading",
    shortDescription:
      "This Tajweed-focused course guides students from beginner to advanced Quran reading with clear pronunciation, fluency, and confidence.",
    action: {
      label: "Learn More",
      url: "/courses/mastery-in-quran-reading", // fixed: lowercase-kebab
    },
    enrollUrl: "/trial",
  },
  {
    image: {
      url: "/course-image-1.jpg",
      alt: "course featured image",
      height: 3046,
      width: 4096,
    },
    subTitle: "Quran Hifz",
    title: "Quran Hifz (Memorization)",
    shortDescription:
      "This course helps you memorize the entire Quran or selected portions through structured techniques, Tajweed, and revision.",
    action: {
      label: "Learn More",
      url: "/courses/quran-memorization", // fixed
    },
    enrollUrl: "/trial",
  },
  {
    image: {
      url: "/arabic.jpeg",
      alt: "course featured image",
      height: 3046,
      width: 4096,
    },
    subTitle: "Arabic Language",
    title: "Arabic Language Read, Write, Speak, and Understand",
    shortDescription:
      "Arabic language course for intermediate learners to improve reading, writing, speaking, and comprehension in formal and daily use.",
    action: {
      label: "Learn More",
      url: "/courses/arabic-language-read-write-talk-and-understand", // fixed: Talk (not Speak) + lowercase-kebab
    },
    enrollUrl: "/trial",
  },
  {
    image: {
      url: "/islamic-studies.jpg",
      alt: "course featured image",
      height: 3046,
      width: 4096,
    },
    subTitle: "Islamic Studies",
    title: "Islamic Studies Islamic Etiquettes and Manners",
    shortDescription:
      "Islamic etiquette (Adab) course covers personal, social, and spiritual manners to build strong character and deepen faith.",
    action: {
      label: "Learn More",
      url: "/courses/islamic-studies-islamic-etiquettes-and-manners", // fixed
    },
    enrollUrl: "/trial",
  },
  {
    image: {
      url: "/arabicuae.jpeg",
      alt: "course featured image",
      height: 3046,
      width: 4096,
    },
    subTitle: "Academic Arabic",
    title: "Arabic Language for School Students",
    shortDescription:
      "Academic Arabic course for Gulf schools strengthens reading, writing, speaking, and listening skills while integrating Arab culture and MSA.",
    action: {
      label: "Learn More",
      url: "/courses/arabic-language-for-school-students", // fixed
    },
    enrollUrl: "/trial",
  },
];

// Define course groups by category
const COURSE_GROUPS = {
  all: [0, 1, 2, 3, 4],
  quran: [0, 1],
  arabic: [2, 4],
  islamic: [3],
};

const CoursesPage = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "quran" | "arabic" | "islamic">("all");

  const filteredCourses = COURSE_GROUPS[activeCategory].map((index) => COURSES_DATA[index]);

  return (
    <div aria-describedby="courses-page">
      <PageHeroSection
        title="Courses"
        description="Master Quran reading and Arabic fluency with step-by-step lessons that build confidence and deepen your spiritual connection."
      />

      <section className="py-10 sm:py-18 bg-neutral-100">
        <div className="container">
          {/* Category Buttons */}
          <div className="flex gap-4 flex-wrap mb-10">
            <button
              className={`rounded-md px-8 py-3 text-base font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform ${
                activeCategory === "all"
                  ? "text-black"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              style={activeCategory === "all" ? { backgroundColor: "#FAAF2F" } : {}}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>

            <button
              className={`rounded-md px-8 py-3 text-base font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform ${
                activeCategory === "arabic"
                  ? "text-black"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              style={activeCategory === "arabic" ? { backgroundColor: "#FAAF2F" } : {}}
              onClick={() => setActiveCategory("arabic")}
            >
              Arabic
            </button>

            <button
              className={`rounded-md px-8 py-3 text-base font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform ${
                activeCategory === "quran"
                  ? "text-black"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              style={activeCategory === "quran" ? { backgroundColor: "#FAAF2F" } : {}}
              onClick={() => setActiveCategory("quran")}
            >
              Quran
            </button>

            <button
              className={`rounded-md px-8 py-3 text-base font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform ${
                activeCategory === "islamic"
                  ? "text-black"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              style={activeCategory === "islamic" ? { backgroundColor: "#FAAF2F" } : {}}
              onClick={() => setActiveCategory("islamic")}
            >
              Islamic Studies
            </button>
          </div>

          {/* Course Cards */}
          <div className="w-full flex flex-col items-start gap-y-8 mb-16">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} cardData={course} />
            ))}
          </div>
        </div>
      </section>

      <ActionSection />
      <FaqSectionCourse />
    </div>
  );
};

export default CoursesPage;
