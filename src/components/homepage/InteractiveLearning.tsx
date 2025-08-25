import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const LEARNING_STEP = [
  {
    title: "Browse Our Courses",
    shortDescription: "Explore & Choose from Our Interactive Courses Today!",
  },
  {
    title: "Enroll Instantly with Confidence",
    shortDescription:
      "Simple, secure, and stress-free – your learning begins now!",
  },
  {
    title: "Start Learning Right Away!",
    shortDescription:
      "You're all set! Enjoy seamless access to your course anytime, anywhere.",
  },
];

const InteractiveLearning = () => {
  return (
    <React.Fragment>
      <section
        aria-describedby="interactive-learning-section"
        className="pt-10 sm:pt-20 bg-regal-blue-500"
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="top-content"
              className="flex items-center justify-center flex-col gap-y-8 mb-10 sm:mb-20"
            >
              <h6 className="flex items-center justify-center py-2.5 px-5 rounded-full bg-[#155699] border border-[#1E63AA] text-base font-medium text-white text-center w-max">
                Progress
              </h6>
              <h3 className="text-3xl leading-tight sm:text-5xl text-white font-bold text-center">
                LET'S STEP INTO INTERACTIVE LEARNING
              </h3>
            </div>

            <div
              aria-describedby="section-content-wrapper"
              className="flex xl:items-end items-center justify-between gap-x-14 gap-y-8 flex-col lg:flex-row"
            >
              <div aria-describedby="left-column" className="pb-10 sm:pb-16 order-2 lg:order-1">
                <div
                  aria-describedby="content-box-wrapper"
                  className="space-y-8"
                >
                  {LEARNING_STEP.map((step, index) => (
                    <div
                      key={index}
                      aria-describedby="content-box"
                      className={cn(
                        "group bg-white sm:py-6 py-3 sm:px-5 px-3 flex items-center gap-x-2 rounded-xl rounded-tr-4xl max-w-[29.68rem] transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer",
                        index === 0 && "sm:ml-36",
                        index === 1 && "sm:ml-14 sm:max-w-[32rem]",
                        index === 2 && 'sm:max-w-[31rem]'
                      )}
                    >
                      <div aria-describedby="count-column">
                        <h5 className="text-yellow-500 text-5xl font-semibold transition-all duration-300 ease-out group-hover:scale-110 transform">
                          0{index + 1}
                        </h5>
                      </div>
                      <div
                        aria-describedby="content-column"
                        className="flex items-start flex-col gap-y-1"
                      >
                        <h4 className="text-xl sm:text-2xl font-semibold text-neutral-900 transition-colors duration-300 ease-out group-hover:text-neutral-700">
                          {step.title}
                        </h4>
                        <p className="text-base sm:text-lg font-medium text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-600">
                          {step.shortDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div aria-describedby="right-column" className="order-1 lg:order-2">
                <div
                  aria-describedby="image-wrapper"
                  className="max-w-[31.25rem] flex items-center transition-transform duration-500 ease-out hover:scale-105 transform"
                >
                  <Image
                    src={"/interactive-learning.png"}
                    width={1499}
                    height={1569}
                    alt="Interactive learning in bayyinah"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default InteractiveLearning;
