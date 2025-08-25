"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 1. Define the teachers' data
const teachers = [
  {
    name: "Omar Kareem",
    title: "Quran Teacher",
    image: "/muslim-guardian.png",
  },
  {
    name: "Ali Hassan",
    title: "Tajweed Specialist",
    image: "/muslim-guardian.png",
  },
  {
    name: "Sami Rahman",
    title: "Arabic Instructor",
    image: "/muslim-guardian.png",
  },
  {
    name: "Noor Khalid",
    title: "Quran Teacher",
    image: "/female.jpg",
  },
  {
    name: "Hana Yusuf",
    title: "Quran Teacher",
    image: "/female.jpg",
  },
  {
    name: "Mariam Zaki",
    title: "Islamic Studies Mentor",
    image: "/female.jpg",
  },
];

const TeachersListSection = () => {
  return (
    <section
      aria-describedby="teachers-lists-section"
      className="sm:py-20 py-10 bg-neutral-100"
    >
      <div className="container">
        <div aria-describedby="main-wrapper">
          {/* Header Section */}
          <div
            aria-describedby="top-content"
            className="flex flex-col items-center justify-center gap-y-10 mb-8 sm:mb-16"
          >
            <h6 className="py-2.5 px-5 rounded-full bg-[#CFE9FA] border border-[#C1DDEF] text-center text-base font-medium text-neutral-800 max-w-max transition-all duration-300 ease-out hover:scale-105 hover:bg-[#B8E0F7] hover:border-[#A5D1F0] transform">
              Teachers
            </h6>
            <h3 className="text-4xl uppercase text-center sm:text-5xl font-bold text-neutral-800 leading-snug sm:leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
              Meet Our Teachers
            </h3>
          </div>

          {/* Teacher Cards */}
          <div
            aria-describedby="teachers-card-wrapper"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teachers.map((teacher, index) => (
              <div
                key={index}
                aria-describedby="teacher-card"
                className="group bg-white p-10 rounded-2xl flex flex-col gap-y-6 items-center justify-center transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
              >
                <div className="w-32 h-32 relative overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform">
                  <Image
                    src={teacher.image}
                    width={128}
                    height={128}
                    alt={`${teacher.name} photo`}
                    className="rounded-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h4 className="text-2xl text-center sm:text-3xl font-bold text-neutral-900 transition-all duration-300 ease-out group-hover:text-neutral-700">
                  {teacher.name}
                </h4>
                <p className="text-xl font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                  {teacher.title}
                </p>
              </div>
            ))}
          </div>

          {/* View All Teachers button */}
          <div
            aria-describedby="view-all"
            className="w-full flex flex-col items-center justify-center mt-12 sm:mt-16"
          >
            <Button 
              asChild
              className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
            >
              <Link href="/all-teachers">View All Teachers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachersListSection;
