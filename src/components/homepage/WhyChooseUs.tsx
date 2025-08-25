import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { WhyChooseListDataTypes } from "@/types";

const WHY_CHOOSE_LISTS: WhyChooseListDataTypes[] = [
  {
    title: "Qualified Instructors",
    image: {
      url: "/instructor-vector.png",
      width: 120,
      height: 120,
      alt: "Bayyinah Instructor",
    },
    shortDescription:
      "You’ll learn from native Arabic speakers, Al-Azhar graduates, and certified Quran instructors.",
  },
  {
    title: "Interactive Learning Tools",
    image: {
      url: "/learning-tool.png",
      width: 120,
      height: 120,
      alt: "Bayyinah learning tool",
    },
    shortDescription:
      "Engage through live classes, multimedia tools, and quizzes to boost understanding and retention.",
  },
  {
    title: "Flexible Scheduling",
    image: {
      url: "/scheduling.png",
      width: 120,
      height: 120,
      alt: "Bayyinah scheduling",
    },
    shortDescription:
      "Study anytime with 24/7 classes and self-paced courses that fit your lifestyle.",
  },
  {
    title: "Supportive Community",
    image: {
      url: "/supportive.png",
      width: 120,
      height: 120,
      alt: "Bayyinah supportive community",
    },
    shortDescription:
      "Join global students and scholars for mentorship, motivation, connection, and spiritual growth together.",
  },
  {
    title: "Comprehensive Curriculum",
    image: {
      url: "/curriculum.png",
      width: 120,
      height: 120,
      alt: "Bayyinah curriculum",
    },
    shortDescription:
      "Tajweed, Hifz, Arabic grammar, and Islamic studies for all ages and levels.",
  },
  {
    title: "Awarded Certificate",
    image: {
      url: "/award.png",
      width: 120,
      height: 120,
      alt: "Bayyinah award certificate",
    },
    shortDescription:
      "After successfully finishing the course, students will receive an e-certificate.",
  },
];

const WhyChooseUs = () => {
  return (
    <React.Fragment>
      <section
        aria-describedby="why-choose-us-section"
        className="py-10 sm:py-16 bg-white"
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="top-content"
              className="flex items-center justify-center flex-col gap-y-8 max-w-3xl mx-auto mb-14"
            >
              <h3 className="text-3xl sm:text-5xl font-bold text-neutral-800 text-center">
                WHY CHOOSE US
              </h3>
              <p className="text-lg sm:text-2xl text-neutral-700 font-normal text-center">
                We blend tradition with technology to deliver an unmatched
                learning experience. Here's what sets us apart:
              </p>
            </div>

            <div
              aria-describedby="feature-content"
              className="bg-[#E1F0F4] p-9 sm:p-12 rounded-tl-[80px] rounded-[28px] sm:rounded-tl-[120px] sm:rounded-[48px] flex items-start flex-col gap-y-14"
            >
              <ul
                aria-describedby="content-list"
                className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 w-full"
              >
                {WHY_CHOOSE_LISTS.map((item, index) => (
                  <li
                    key={index}
                    aria-describedby="list-item"
                    className="group flex flex-col items-start gap-y-5 transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center gap-x-4">
                      <div
                        aria-describedby="image-wrapper"
                        className="w-10 flex items-center shrink-0 grow-0 basis-auto transition-transform duration-300 ease-out group-hover:scale-110"
                      >
                        <Image
                          src={item.image.url}
                          width={item.image.width}
                          height={item.image.height}
                          alt={item.image.alt}
                        />
                      </div>
                      <h5 className="text-lg sm:text-xl font-bold text-neutral-900 transition-colors duration-300 ease-out group-hover:text-neutral-700">
                        {item.title}
                      </h5>
                    </div>

                    <p className="text-base sm:text-lg font-normal text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-600">
                      {item.shortDescription}
                    </p>
                  </li>
                ))}
              </ul>

              <div
                aria-describedby="trial-btn"
                className="flex items-center justify-center flex-col w-full"
              >
                <Button 
                  asChild 
                  className="rounded-full text-base sm:text-2xl py-3 h-auto px-6 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                >
                  <Link href={"/trial"}>Book a Free Trial Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default WhyChooseUs;
