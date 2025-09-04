"use client";

import PageHeroSection from "@/components/common/PageHeroSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import {
  IconBalance,
  IconCode,
  IconCommunity,
  IconEmpower,
  IconExcellence,
  IconTeamWork,
} from "./svgIcons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SLIDE_IMAGES = [
  {
    url: "/commitment-slide-1.png",
    width: 2000,
    height: 1333,
    alt: "Class indoor preview",
  },
  {
    url: "/commitment-slide-2.png",
    width: 2000,
    height: 1500,
    alt: "Class indoor preview",
  },
  {
    url: "/commitment-slide-3.png",
    width: 2000,
    height: 1500,
    alt: "Class indoor preview",
  },
  {
    url: "/commitment-slide-4.png",
    width: 2000,
    height: 1500,
    alt: "Class indoor preview",
  },
  {
    url: "/commitment-slide-5.png",
    width: 2000,
    height: 2000,
    alt: "Class indoor preview",
  },
  {
    url: "/commitment-slide-6.jpg",
    width: 3000,
    height: 2000,
    alt: "Class indoor preview",
  },
];

const FLOW_CONTENT = [
  {
    key: "amanah",
    labelEn: "Trustworthiness",
    labelAr: "Amanah",
    description:
      "We approach teaching with responsibility, ensuring we provide accurate knowledge and guide students with integrity",
  },
  {
    key: "adab",
    labelEn: "Proper Conduct",
    labelAr: "Adab",
    description:
      "We respect and value each student, fostering an environment where they can develop both academically and ethically.",
  },
  {
    key: "ihsan",
    labelEn: "Excellence",
    labelAr: "Ihsan",
    description:
      "We are dedicated to delivering the highest quality of education, striving to inspire students to achieve their full potential.",
  },
  {
    key: "ikhlas",
    labelEn: "Sincerity",
    labelAr: "Ikhlas",
    description:
      "Our efforts in teaching are driven by a sincere desire to seek the pleasure of Allah & make a positive impact on the lives of our students.",
  },
];

const WHY_JOIN_FEATURES_LIST = [
  {
    icon: IconCommunity,
    label: "Community",
    description:
      "Build lasting bonds with a team of like-minded individuals, united in their commitment to a shared, greater purpose.",
  },
  {
    icon: IconTeamWork,
    label: "Teamwork",
    description:
      "Collaborate with diverse teams, global colleagues, and academics to foster creativity, innovation, and mutual learning",
  },
  {
    icon: IconCode,
    label: "Development",
    description:
      "Thrive in an environment that encourages continuous  learning, both spiritually and professionally, supporting  your personal and career development",
  },
  {
    icon: IconEmpower,
    label: "Empowerment",
    description:
      "Contribute to the positive transformation of lives by  nurturing faith and leaving an enduring impact on  individuals and communities",
  },
  {
    icon: IconExcellence,
    label: "Excellence",
    description:
      "Experience well-structured workplace with hig tandards of integrity, ensuring a professional atmospher for all.",
  },
  {
    icon: IconBalance,
    label: "Balance",
    description:
      "Work in harmony where both your spiritual values and  worldly aspirations align toward a common goal, fostering  balance and purpose.",
  },
];

const JOB_LISTS = [
  {
    type: "Quran Teacher - Female",
    title: "Quran Study with Tajweed & Makharij",
    description: `Qur'an Teacher with Ijaza & having 2-3 years online teaching experience for all ages.`,
    action: {
      label: "Apply Now",
      url: "/teacher-form",
    },
  },
  {
    type: "Arabic Teacher - Female",
    title: "Arabic Language Study",
    description: `Arabic teacher with command of the Arabic language, ability to design the course as per the age group and teach for all ages and  should be able to teach the school Arabic curriculum, with a  minimum of 2-3 years of experience.`,
    action: {
      label: "Apply Now",
      url: "/teacher-form",
    },
  },
  {
    type: "Admin Staff - Female",
    title: "Administrative Co-ordinator",
    description: `To manage letters, communicate with clients, and interact with the public, a candidate has to possess outstanding written communication abilities. She must be well organized to keep the Schedule of teacher and kids, minimum 2 years of experience.`,
    action: {
      label: "Apply Now",
      url: "/teacher-form",
    },
  },
  {
    type: "Digital Marketing Staff - Female",
    title: "Digital Marketing Executive",
    description: `- Plans and implements all display, email, social media, database marketing, and web advertising campaigns.
    - Evaluates all digital marketing initiatives' performance, measures it, and reports it, and compares it to objectives (ROl and KPls)....`,
    action: {
      label: "Apply Now",
      url: "/teacher-form",
    },
  },
];

const CareerPage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <React.Fragment>
      <div aria-describedby="career-page">
        <PageHeroSection
          title="Career"
          description="More than a job — serve Allah and earn blessings in every step."
        />

        <section
          aria-describedby="foundation-commitment-section"
          className="pt-10 sm:pt-24 pb-10 sm:pb-18 bg-white"
        >
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="top-content"
              className="flex items-center justify-center mb-18 px-4"
            >
              <h3 className="text-2xl sm:text-4xl font-bold text-neutral-900 text-center max-w-4xl leading-tight">
                This is not just a Job; it's an opportunity to serve Allah
                through your work, earning His blessings and rewards with every
                task you complete.
              </h3>
            </div>

            <div aria-describedby="carousel-wrapper" className="mb-14 sm:mb-22">
              <Carousel
                plugins={[plugin.current]}
                opts={{ loop: true, align: "center" }}
                setApi={(api) => {
                  if (api) {
                    setActiveIndex(api.selectedScrollSnap());
                    api.on("select", () => {
                      setActiveIndex(api.selectedScrollSnap());
                    });
                  }
                }}
              >
                <CarouselContent>
                  {SLIDE_IMAGES.map((img, index) => (
                    <CarouselItem
                      key={index}
                      className={cn(
                        "basis-[80%] sm:basis-[45%] lg:basis-[35%] xl:basis-1/4 shrink-0 grow-0",
                        activeIndex === index ? "scale-y-100" : "scale-y-70",
                        activeIndex + 1 === index && "scale-y-90",
                        activeIndex - 1 === index && "scale-y-90"
                      )}
                    >
                      <div aria-describedby="image-wrapper" className="group overflow-hidden rounded-xl transition-all duration-500 ease-out hover:scale-105 transform">
                        <Image
                          src={img.url}
                          width={img.width}
                          height={img.height}
                          alt={img.alt}
                          priority
                          className="aspect-square rounded-xl transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="container">
              <div aria-describedby="content-wrapper">
             <div aria-describedby="top-content"
             className="flex flex-col gap-y-5 mb-8 items-start text-left lg:pl-[23rem]">
              <h3 className="text-4xl sm:text-5xl font-bold text-neutral-800 transition-all duration-500 ease-out hover:scale-105 transform">
                Our Foundation Commitment
              </h3>
              <p className="text-xl font-normal text-neutral-800 max-w-3xl transition-all duration-500 ease-out hover:scale-105 transform">
                We approach teaching with responsibility, ensuring we
                provide accurate knowledge and guide students with
                integrity.
              </p>
            </div>

            <div
              aria-describedby="flow-wrapper"
              className="space-y-5 lg:space-y-0"
            >
              {FLOW_CONTENT.map((flow) => (
                <div
                  key={flow.key}
                  aria-describedby="flow-item"
                  className="group flex items-start justify-between flex-col lg:flex-row transition-all duration-500 ease-out hover:scale-[1.01] cursor-pointer"
                >
                  <div
                    aria-describedby="flow-topic"
                    className={cn(
                      "lg:pr-9 lg:border-r lg:border-neutral-200 relative shrink-0 grow-0 basis-auto pb-3.5 w-80",
                      // point
                      "before:hidden before:lg:block before:absolute before:w-3 before:h-3 before:bg-white before:z-[2] before:border before:border-yellow-500 before:rounded-full before:-right-1.5 before:top-1/2 before:-translate-y-1/2"
                    )}
                  >
                    <div
                      aria-describedby="topic-box"
                      className="bg-regal-blue-500 py-4 px-7 rounded-md transition-all duration-300 ease-out group-hover:bg-regal-blue-600 group-hover:scale-105 transform"
                    >
                      <p className="text-2xl font-normal text-white transition-all duration-300 ease-out group-hover:text-blue-100">
                        {flow.labelAr}
                      </p>
                      <h6 className="text-2xl font-semibold text-white transition-all duration-300 ease-out group-hover:text-blue-100">
                        {flow.labelEn}
                      </h6>
                    </div>
                  </div>

                  <div
                    aria-describedby="flow-detail"
                    className={cn(
                      "bg-[#E5ECF4] rounded-lg py-4 px-8 flex items-center lg:ml-12 flex-1 min-h-24 relative transition-all duration-300 ease-out group-hover:bg-[#D1E0F0] group-hover:shadow-lg",
                      // indicator
                      "before:absolute before:border-8 before:border-l-transparent before:border-t-transparent before:-left-4 before:top-2 before:border-b-[#E5ECF4] before:border-r-[#E5ECF4] before:z-[2] group-hover:before:border-b-[#D1E0F0] group-hover:before:border-r-[#D1E0F0]"
                    )}
                  >
                    <p className="text-lg font-normal text-neutral-800 line-clamp-2 transition-all duration-300 ease-out group-hover:text-neutral-700">
                      {flow.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-describedby="why-join-us-section"
          className="py-10 sm:py-20 bg-regal-blue-500"
        >
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div
                aria-describedby="top-content"
                className="flex items-center justify-center flex-col gap-y-5 sm:gap-y-8 max-w-4xl mx-auto mb-16"
              >
                <h3 className="text-center text-4xl sm:text-5xl font-bold text-white leading-snug">
                  Why Join Us?
                </h3>
                <p className="text-lg sm:text-2xl font-normal text-center text-white leading-snug">
                  What we offer is not just employment, but a chance to earn
                  rewards from Allah by fulfilling your duties with sincerity
                  and purpose.
                </p>
              </div>

              <div aria-describedby="content-wrapper">
                <div
                  aria-describedby="feature-card-wrapper"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-20"
                >
                  {WHY_JOIN_FEATURES_LIST.map((feat, index) => (
                    <div
                      key={index}
                      aria-describedby="feature-card"
                      className="group flex flex-col items-center justify-normal transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                    >
                      <span
                        aria-describedby="icon"
                        className="flex items-center text-5xl text-white mb-4 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-blue-100 transform"
                      >
                        <feat.icon />
                      </span>

                      <h4 className="text-2xl font-medium text-white text-center mb-3 transition-all duration-300 ease-out group-hover:text-blue-100">
                        {feat.label}
                      </h4>
                      <p className="text-base font-normal text-center text-white transition-all duration-300 ease-out group-hover:text-blue-100">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-describedby="join-our-team-section"
          className="bg-[#EBEFF3] py-10 sm:py-18"
        >
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div
                aria-describedby="top-content"
                className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto mb-10 sm:mb-20"
              >
                <h3 className="text-4xl sm:text-5xl font-bold text-neutral-800 text-center">
                  Join Our Team
                </h3>
                <p className="text-xl sm:text-2xl font-normal text-neutral-700 text-center">
                  We are seeking the perfect candidates for the positions listed
                  below.
                </p>
              </div>

              <div aria-describedby="content-wrapper">
                <div
                  aria-describedby="job-card-wrapper"
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                >
                  {JOB_LISTS.map((job, index) => (
                    <div
                      key={index}
                      aria-describedby="job-card"
                      className="group bg-white p-6 rounded-3xl border border-[#EAECF0] flex flex-col items-start gap-y-8 justify-between transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 cursor-pointer"
                    >
                      <div aria-describedby="card-header">
                        <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-3 transition-all duration-300 ease-out group-hover:text-neutral-700">
                          {job.type}
                        </h3>

                        <h6 className="text-base sm:text-xl font-medium text-neutral-800 mb-3 transition-all duration-300 ease-out group-hover:text-neutral-700">
                          <span className="text-base text-sky-blue-500">
                            Job Title:
                          </span>{" "}
                          {job.title}
                        </h6>
                        <h1 className="transition-all duration-300 ease-out group-hover:text-neutral-700">Permanent | 2 Years Exp. | Bilingual (English/Arabic)</h1>
                        <br />
                        <span className="bg-[#f4af2f] py-1 px-2 text-sm sm:text-base rounded-full text-white mb-5 flex max-w-max transition-all duration-300 ease-out group-hover:bg-[#e89b1e] group-hover:scale-105 transform">
                          Online
                        </span>

                        <p className="transition-all duration-300 ease-out group-hover:text-neutral-700">{job.description}</p>
                      </div>

                      <div aria-describedby="card-bottom">
                        <Button 
                          variant={"outline"} 
                          asChild
                          className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                        >
                          <Link href={job.action.url}>
                            {job.action.label}
                            <ArrowRight className="!w-7 !h-7 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div aria-describedby="become-instructor" className="flex items-center justify-center flex-col">
                  <a href="/teacher-form" className="text-center">
                    <Button className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform">
                      Become Tutor
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default CareerPage;
