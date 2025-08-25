import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    text:
      "My son has been studying with Bayyinah and his love for Arabic and the Qur’an has grown so much, Alhamdulillah!",
    name: "Javed Maqsood",
    image: "/muslim-guardian.png",
    role: "Parent of Student",
  },
  {
    text:
      "This academy has been a blessing, my daughter looks forward to every class and is learning so much",
    name: "Aejaz Sayed",
    image: "/muslim-guardian.png",
    role: "Parent of Student",
  },
  {
    text:
      "Both of my kids are enrolled at Bayyinah and we’re amazed by the progress they’ve made, Alhamdulillah",
    name: "Ibrahim Sheikh",
    image: "/muslim-guardian.png",
    role: "Parent of Student",
  },
  {
    text:
      "My daughter’s confidence in reading the Qur’an has improved greatly.",
    name: "Farhat Jahan",
    image: "/review-author.png",
    role: "Parent of Student",
  },
  {
    text:
      "TBayyinah Academy has made Islamic learning easy and enjoyable for my son—highly recommended!",
    name: "Abeda Begum",
    image: "/review-author.png",
    role: "Parent of Student",
  },
];

const WhatStudentsSays = () => {
  return (
    <React.Fragment>
      <div
        aria-describedby="what-students-says-section"
        className="py-10 bg-white sm:py-20"
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="top-content"
              className="flex items-center justify-center flex-col mb-8 sm:mb-12"
            >
              <h6 className="px-5 py-2.5 mb-8 rounded-full border border-[#C1DDEF] bg-[#CFE9FA] flex items-center justify-center text-center transition-all duration-300 ease-out hover:scale-105 hover:bg-[#B8E0F7] hover:border-[#A5D1F0] transform">
                Our Students says
              </h6>

              <h3 className="text-4xl sm:text-5xl font-bold text-neutral-800 text-center mb-6 transition-all duration-500 ease-out hover:scale-105 transform">
                What Students Talk About us
              </h3>
              <p className="text-2xl font-normal text-neutral-700 text-center transition-all duration-500 ease-out hover:scale-105 hover:text-neutral-800 transform">
                See feedback from our students around the world
              </p>
            </div>

            <div aria-describedby="carousel-wrapper">
              <Carousel className="max-w-[920px] mx-auto">
                <CarouselContent>
                  {testimonials.map((t, index) => (
                    <CarouselItem key={index}>
                      <div
                        aria-describedby="item-content-wrapper"
                        className="group bg-[#E1F0F4] rounded-2xl py-12 px-14 flex items-center justify-center flex-col gap-y-10
                        h-[380px] sm:h-[220px] transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer" 
                      >
                        <p className="text-base sm:text-xl font-normal text-neutral-800 text-center transition-all duration-300 ease-out group-hover:text-neutral-900">
                          {t.text}
                        </p>

                        <div
                          aria-describedby="author"
                          className="flex items-center gap-3"
                        >
                          <div aria-describedby="image" className="w-16 flex overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform">
                            <Image
                              src={t.image}
                              width={1020}
                              height={1242}
                              alt={`Photo of ${t.name}`}
                              priority
                              className="aspect-square rounded-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                          </div>

                          <div className="flex items-start flex-col gap-y-0.5">
                            <h6 className="text-xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                              {t.name}
                            </h6>
                            <p className="text-lg font-normal text-neutral-600 transition-all duration-300 ease-out group-hover:text-neutral-700">
                              {t.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="-left-2 lg:-left-12 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg transform" />
                <CarouselNext className="-right-2 lg:-right-12 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg transform" />
                <CarouselDots />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhatStudentsSays;
