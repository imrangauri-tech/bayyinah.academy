'use client';

import React from "react";
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const StudentSays = () => {
     const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )


  return (
    <React.Fragment>
      <section
        aria-describedby="student-says-section"
        className="py-10 sm:py-16 bg-white"
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="top-content"
              className="flex flex-col gap-y-8 items-center justify-center max-w-4xl mx-auto mb-16"
            >
              <h6 className="px-5 py-2.5 bg-[#CFE9FA] rounded-full w-max text-base font-medium text-neutral-800 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#B8E0F7] hover:border-[#A5D1F0] transform">
                Our Students says
              </h6>
              <h3 className="text-3xl sm:text-5xl font-bold text-neutral-900 text-center uppercase leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
                Discover Your Perfect Program in Our courses
              </h3>
            </div>

            <div aria-describedby="carousel-main-wrapper" className="flex flex-col justify-center items-center">
              <Carousel className="w-full max-w-4xl" opts={{loop: true}} plugins={[plugin.current]}>
                <CarouselContent>
                  {/* Item 1 */}
                  <CarouselItem>
                    <div
                      aria-describedby="carousel-item"
                      className="group bg-[#E1F0F4] p-5 sm:p-10 rounded-xl flex items-center justify-center flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <h3 className="text-2xl sm:text-3xl text-center font-bold text-neutral-800 mb-6 transition-all duration-300 ease-out group-hover:text-neutral-900">
                        What our students say
                      </h3>

                      <p
                        aria-describedby="review-text"
                        className="text-lg sm:text-xl font-normal text-neutral-800 text-center transition-all duration-300 ease-out group-hover:text-neutral-700"
                      >
                        My son has been studying with Bayyinah and his love for Arabic and the Qur'an has grown so much, Alhamdulillah!
                      </p>

                      <div
                        aria-describedby="author-detail"
                        className="flex items-center gap-x-4 mt-12"
                      >
                        <div
                          aria-describedby="image-wrapper"
                          className="w-12 sm:w-16 flex overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform"
                        >
                          <Image
                            src={"/muslim-guardian.png"}
                            width={1020}
                            height={1242}
                            alt="Bayyinah guardian photo"
                            className="rounded-full aspect-square object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-y-1">
                          <h6 className="text-base sm:text-xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                          Javed Maqsood
                          </h6>
                          <p className="text-sm sm:text-lg font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                          Parent of Student
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Item 2 */}
                  <CarouselItem>
                    <div
                      aria-describedby="carousel-item"
                      className="group bg-[#E1F0F4] p-5 sm:p-10 rounded-xl flex items-center justify-center flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <h3 className="text-2xl sm:text-3xl text-center font-bold text-neutral-800 mb-6 transition-all duration-300 ease-out group-hover:text-neutral-900">
                        What our students say
                      </h3>

                      <p
                        aria-describedby="review-text"
                        className="text-lg sm:text-xl font-normal text-neutral-800 text-center transition-all duration-300 ease-out group-hover:text-neutral-700"
                      >
                       This academy has been a blessing, my daughter looks forward to every class and is learning so much.
                      </p>

                      <div
                        aria-describedby="author-detail"
                        className="flex items-center gap-x-4 mt-12"
                      >
                        <div
                          aria-describedby="image-wrapper"
                          className="w-12 sm:w-16 flex overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform"
                        >
                          <Image
                            src={"/muslim-guardian.png"}
                            width={1020}
                            height={1242}
                            alt="Bayyinah guardian photo"
                            className="rounded-full aspect-square object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-y-1">
                          <h6 className="text-base sm:text-xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                          Aejaz Sayed
                          </h6>
                          <p className="text-sm sm:text-lg font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                          Parent of Student
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Item 3 */}
                  <CarouselItem>
                    <div
                      aria-describedby="carousel-item"
                      className="group bg-[#E1F0F4] p-5 sm:p-10 rounded-xl flex items-center justify-center flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <h3 className="text-2xl sm:text-3xl text-center font-bold text-neutral-800 mb-6 transition-all duration-300 ease-out group-hover:text-neutral-900">
                        What our students say
                      </h3>

                      <p
                        aria-describedby="review-text"
                        className="text-lg sm:text-xl font-normal text-neutral-800 text-center transition-all duration-300 ease-out group-hover:text-neutral-700"
                      >
                        Both of my kids are enrolled at Bayyinah and we're amazed by the progress they've made, Alhamdulillah
                      </p>

                      <div
                        aria-describedby="author-detail"
                        className="flex items-center gap-x-4 mt-12"
                      >
                        <div
                          aria-describedby="image-wrapper"
                          className="w-12 sm:w-16 flex overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform"
                        >
                          <Image
                            src={"/muslim-guardian.png"}
                            width={1020}
                            height={1242}
                            alt="Bayyinah guardian photo"
                            className="rounded-full aspect-square object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-y-1">
                          <h6 className="text-base sm:text-xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                          Ibrahim Sheikh
                          </h6>
                          <p className="text-sm sm:text-lg font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                          Parent of Student
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Item 4 */}
                  <CarouselItem>
                    <div
                      aria-describedby="carousel-item"
                      className="group bg-[#E1F0F4] p-5 sm:p-10 rounded-xl flex items-center justify-center flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <h3 className="text-2xl sm:text-3xl text-center font-bold text-neutral-800 mb-6 transition-all duration-300 ease-out group-hover:text-neutral-900">
                        What our students say
                      </h3>

                      <p
                        aria-describedby="review-text"
                        className="text-lg sm:text-xl font-normal text-neutral-800 text-center transition-all duration-300 ease-out group-hover:text-neutral-700"
                      >
                       My daughter's confidence in reading the Qur'an has improved greatly.
                      </p>
                      <br />

                      <div
                        aria-describedby="author-detail"
                        className="flex items-center gap-x-4 mt-12"
                      >
                        <div
                          aria-describedby="image-wrapper"
                          className="w-12 sm:w-16 flex overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform"
                        >
                          <Image
                            src={"/muslim-guardian.png"}
                            width={1020}
                            height={1242}
                            alt="Bayyinah guardian photo"
                            className="rounded-full aspect-square object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-y-1">
                          <h6 className="text-base sm:text-xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                          Farhat Jahan
                          </h6>
                          <p className="text-sm sm:text-lg font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                          Parent of Student
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Item 5 */}
                  <CarouselItem>
                    <div
                      aria-describedby="carousel-item"
                      className="group bg-[#E1F0F4] p-5 sm:p-10 rounded-xl flex items-center justify-center flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <h3 className="text-2xl sm:text-3xl text-center font-bold text-neutral-800 mb-6 transition-all duration-300 ease-out group-hover:text-neutral-900">
                        What our students say
                      </h3>

                      <p
                        aria-describedby="review-text"
                        className="text-lg sm:text-xl font-normal text-neutral-800 text-center transition-all duration-300 ease-out group-hover:text-neutral-700"
                      >
                        TBayyinah Academy has made Islamic learning easy and enjoyable for my son—highly recommended!
                      </p>

                      <div
                        aria-describedby="author-detail"
                        className="flex items-center gap-x-4 mt-12"
                      >
                        <div
                          aria-describedby="image-wrapper"
                          className="w-12 sm:w-16 flex overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform"
                        >
                          <Image
                            src={"/muslim-guardian.png"}
                            width={1020}
                            height={1242}
                            alt="Bayyinah guardian photo"
                            className="rounded-full aspect-square object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-y-1">
                          <h6 className="text-base sm:text-xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                          Abeda Begum
                          </h6>
                          <p className="text-sm sm:text-lg font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600">
                          Parent of Student
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="bottom-0 -left-3 lg:-left-12 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg transform"/>
                <CarouselDots />
                <CarouselNext className="bottom-0 -right-3 lg:-right-12 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg transform"/>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default StudentSays;
