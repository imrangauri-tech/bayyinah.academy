// SEO metadata for /our-teachers
export const metadata = {
  title: "Quran Teacher Online | Learn Quran with Bayyinah Academy – Expert Islamic Education",
  description: "Join Bayyinah Academy to learn Quran online with expert Quran teachers. Get personalized Quran lessons, Tajweed training, and Islamic studies from the comfort of your home. Start your Quran learning journey today",
};
import PageHeroSection from "@/components/common/PageHeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FoundationCommitment from "./FoundationCommitment";
import TeachersListSection from "./TeachersListSection";
import TeacherFaqSection from "@/components/teachers/TeacherFaqSection"; 

const OurTeachersPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="our-teacher-page">
        <PageHeroSection
          title="Our Teachers"
          description="Dedicated to nurturing hearts with the light of Islam and character - our teachers strive to guide each student with sincerity, patience, and the prophetic example."
        />

        <section
          aria-describedby="what-are-u-looking-section"
          className="sm:py-20 py-10 bg-neutral-100"
        >
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div aria-describedby="single-teacher" className="mb-10 sm:mb-16">
                <h3 className="mb-10 sm:mb-12 text-4xl sm:text-5xl font-bold text-neutral-900 text-center transition-all duration-500 ease-out hover:scale-105 transform">
                  TEACHERS
                </h3>

                <div
                  aria-describedby="head-teacher-card"
                  className="group bg-white p-6 sm:p-10 rounded-2xl flex items-center gap-12 flex-col md:flex-row transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                >
                  <div
                    aria-describedby="left-column"
                    className="shrink-0 grow-0 basis-auto transition-transform duration-500 ease-out group-hover:scale-105 transform"
                  >
                    <div aria-describedby="image-wrapper" className="w-74 flex overflow-hidden rounded-2xl">
                      <Image
                        src={"/muslim-guardian.png"}
                        width={1020}
                        height={1242}
                        priority
                        alt="Guardian"
                        className="transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div aria-describedby="right-column" className="flex-1">
                    <div aria-describedby="column-content">
                      <h4 className="text-2xl sm:text-3xl font-medium text-neutral-900 mb-3 sm:mb-4 transition-all duration-300 ease-out group-hover:text-neutral-700">
                      Omar Kareem
                      </h4>
                      <h6 className="text-lg sm:text-xl font-medium text-neutral-600 mb-5 sm:mb-7 transition-all duration-300 ease-out group-hover:text-neutral-500">
                        Bsc IT AIML - Arabic Teacher
                      </h6>

                      <p className="text-base sm:text-xl font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                        Passionate and dedicated educator with a love for
                        helping students grow and succeed. With a strong focus
                        on creating engaging, supportive, and interactive
                        learning experiences, I strive to make every lesson
                        meaningful and enjoyable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div aria-describedby="teacher-and-students">
                <div
                  aria-describedby="top-content"
                  className="flex flex-col items-center justify-center gap-y-8 mb-8 sm:mb-12"
                >
                  <h6 className="py-2.5 px-5 rounded-full bg-[#CFE9FA] border border-[#C1DDEF] text-center text-base font-medium text-neutral-800 max-w-max transition-all duration-300 ease-out hover:scale-105 hover:bg-[#B8E0F7] hover:border-[#A5D1F0] transform">
                    TEACHER & STUDENTS
                  </h6>
                  <h3 className="text-4xl text-center sm:text-5xl font-bold text-neutral-800 leading-snug sm:leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
                    WHAT ARE YOU LOOKING FOR?
                  </h3>
                </div>

                <div
                  aria-describedby="action-card-wrapper"
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      aria-describedby="action-card"
                      className="group bg-white p-5 sm:p-10 rounded-3xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <div
                        aria-describedby="image-icon-wrapper"
                        className="w-16 flex mb-6 sm:mb-8 transition-transform duration-300 ease-out group-hover:scale-110 transform"
                      >
                        <Image
                          src={
                            index === 1
                              ? "/school-teaching.png"
                              : "/reading-book.png"
                          }
                          width={180}
                          height={180}
                          alt="school-teaching moment"
                          priority
                          className="aspect-square transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>

                      <div
                        aria-describedby="content-wrapper"
                        className="flex w-full flex-col gap-y-5 mb-6 sm:mb-7"
                      >
                        <h4 className="text-2xl sm:text-3xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-700">
                          {index === 1
                            ? "Do you want to teach here?"
                            : "Do you want to learn here?"}
                        </h4>

                        <p className="text-base sm:text-lg font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                          {index === 1
                            ? "What we offer is not just employment, but a chance to earn rewards from Allah by fulfilling your duties with sincerity and purpose."
                            : "Encourage the thirst for knowledge; watch minds bloom. Seeking knowledge refines character, and brings the seeker closer to Allah"}
                            <br />
                        </p>
                      </div>

                      <div aria-describedby="action-btn">
                        {index === 1 ? (
                          <Button 
                            asChild 
                            className="text-base sm:text-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                          >
                            <Link href="/teacher-form">Register as Teacher</Link>
                          </Button>
                        ) : (
                          <Button 
                            asChild 
                            className="text-base sm:text-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                          >
                            <Link href="/student-form">Register as Student</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FoundationCommitment />
        <TeachersListSection />
        <TeacherFaqSection />
      </div>
    </React.Fragment>
  );
};

export default OurTeachersPage;
