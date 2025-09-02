import PageHeroSection from "@/components/common/PageHeroSection";
import { FaqSectionPricing, FeedbackFromStudents } from "@/components/homepage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Bayyinah Academy Pricing – Affordable Quran & Arabic Online Classes from $8/hr",
  description:
    "Discover Bayyinah Academy’s transparent and flexible pricing plans: Basic ($8/hr), Essentials ($9/hr), Premium ($11/hr), and Platinum ($14/hr). All include native Arabic teachers, e-certificates, e-syllabus access, and more—with family discounts and no hidden fees. Choose your plan and elevate your Quran learning journey today",
};

const PRICING_PLANS = [
    {
    key: "premium",
    title: "Platinum",
    discountPercentage: "Top Choice",
    price: "$14.00",
    priceType: "/hour",
    installmentType: "Top-tier access",
    features: [
      { label: "Proficient Arabic (Native) Teacher", available: true},
      { label: " E-Certificate", available: true},
      { label: "E-Syllabus Access", available: true },
      { label: "Direct chat with Teacher and Coach", available: true },
      { label: "Unlimited Reschedules per Month", available: true },
      { label: "Coaching and Planning Sessions Every Quarter", available: true },
      { label: "Progress Report Every Quarter", available: true },
      { label: "Up to 3 Lesson Cancellation per Month", available: true },
      { label: "10% Family Discounts", available: true },
      { label: "Top 5 Star Rated Teacher", available: true },
      { label: "Video Recordings", available: true },
    ],
    action: {
      url: "/trial",
      label: "Subscribe Now",
    },
  },
  {
    key: "necessary",
    
    title: "Premium",
    discountPercentage: "Great Deal",
    price: "$11.00",
    priceType: "/hour",
    installmentType: "Advanced Benifits",
    features: [
      { label: "Proficient Arabic (Native) Teacher", available: true},
      { label: " E-Certificate", available: true},
      { label: "E-Syllabus Access", available: true },
      { label: "Direct chat with Teacher and Coach", available: true },
      { label: "Up to 4 Lesson Reschedules per Month", available: true },
      { label: "Coaching and Planning Sessions Twice a Year", available: true },
      { label: "Progress Report Twice a Year", available: true },
      { label: "Up to 1 Lesson Cancellation per Month", available: true },
      { label: "5% Family Discounts", available: true },
      { label: "Top 5 Star Rated Teacher" },
      { label: "Video Recordings" },
    ],
    action: {
      url: "/trial",
      label: "Subscribe Now",
    },
  },
  {
    key: "exclusive",
    title: "Essentials",
    discountPercentage: "Smart Pack",
    price: "$9.00",
    priceType: "/hour",
    installmentType: "Core Feature Set",
    features: [
      { label: "Proficient Arabic (Native) Teacher", available: true},
      { label: " E-Certificate", available: true},
      { label: "E-Syllabus Access", available: true },
      { label: "Direct chat with Teacher and Coach", available: true },
      { label: "Up to 2 Lesson Reschedules per Month", available: true },
      { label: "Coaching and Planning Sessions" },
      { label: "Progress Report" },
      { label: "Lesson Cancellation" },
      { label: "Family Discounts" },
      { label: "Top 5 Star Rated Teacher" },
      { label: "Video Recordings" },
      
    ],
    action: {
      url: "/trial",
      label: "Subscribe Now",
    },
  },
  {
    key: "basic",
    title: "Basic",
    discountPercentage: "Regular Plan",
    price: "$8.00",
    priceType: "/hour",
    installmentType: "Entry Level Package",
    features: [
      { label: "Proficient Arabic (Native) Teacher", available: true},
      { label: " E-Certificate", available: true},
      { label: "E-Syllabus Access", available: true },
      { label: "Direct Chat with Teacher and Coach"},
      { label: "Lesson Reschedules" },
      { label: "Coaching and Planning Sessions" },
      { label: "Progress Report" },
      { label: "Lesson Cancellation" },
      { label: "Family Discount" },
      { label: "Top 5 Star Rated Teacher" },
      { label: "Video Recordings" },
    ],
    action: {
      url: "/trial",
      label: "Subscribe Now",
    },
  },
  

];

const PricingPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="pricing-page">
        <PageHeroSection
          title="Pricing"
          description="Flexible, affordable plans with family discounts, Quality Quranic education that fits your budget and supports your spiritual journey."
        />

        <section
          aria-describedby="pricing-section"
          className="py-10 sm:py-18 bg-neutral-100"
        >
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div
                aria-describedby="top-content"
                className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-y-6 mb-12"
              >
                <h3 className="text-4xl sm:text-5xl font-bold text-neutral-800 text-center leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
                  DISCOVER THE PERFECT PLAN FOR YOU
                </h3>
                <p className="text-xl sm:text-2xl font-normal text-neutral-800 text-center transition-all duration-500 ease-out hover:scale-105 transform">
                  Transparency You Can Trust - "No Hidden Fees"
                </p>
              </div>

              <div aria-describedby="plan-wrapper">
                <ul
                  aria-describedby="plan-lists"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-7 xl:gap-0"
                >
                  {PRICING_PLANS.map((plan) => (
                    <li
                      key={plan.key}
                      aria-describedby="plan-item"
                      className={cn(
                        "group bg-white rounded-md xl:rounded-none xl:first:rounded-l-2xl xl:first:rounded-r-none xl:last:rounded-r-2xl py-8 px-5 border border-neutral-100 shadow-sm flex flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 cursor-pointer",
                        plan.key === "necessary" && "bg-regal-blue-500"
                      )}
                    >
                      <div
                        aria-describedby="plan-title"
                        className="flex items-center gap-4 justify-between mb-6"
                      >
                        <h3
                          className={cn(
                            "text-2xl font-medium text-neutral-900 transition-all duration-300 ease-out group-hover:text-neutral-700",
                            plan.key === "necessary" && "text-white group-hover:text-blue-100"
                          )}
                        >
                          {plan.title}
                        </h3>
                        <span
                          aria-describedby="discount"
                          className={cn(
                            "py-1 px-2.5 rounded-full bg-sky-blue-500 text-center flex items-center justify-center text-xs font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:scale-110 transform",
                            plan.key === "necessary" && "bg-yellow-500 group-hover:bg-yellow-400"
                          )}
                        >
                          {plan.discountPercentage}
                        </span>
                      </div>

                      <div
                        aria-describedby="price"
                        className="flex items-start flex-col gap-y-1 mb-6 pb-6 border-b border-b-neutral-100"
                      >
                        <h2
                          className={cn(
                            "text-5xl font-medium text-neutral-900 transition-all duration-300 ease-out group-hover:text-neutral-700",
                            plan.key === "necessary" && "text-white group-hover:text-blue-100"
                          )}
                        >
                          {plan.price}{" "}
                          <span
                            className={cn(
                              "text-base font-normal text-neutral-600 -ml-2 transition-all duration-300 ease-out group-hover:text-neutral-500",
                              plan.key === "necessary" && "text-neutral-200 group-hover:text-blue-200"
                            )}
                          >
                            {plan.priceType}
                          </span>
                        </h2>
                        <span
                          aria-describedby="type"
                          className="text-base font-medium text-yellow-500 transition-all duration-300 ease-out group-hover:text-yellow-400"
                        >
                          {plan.installmentType}
                        </span>
                      </div>

                      <div aria-describedby="features" className="mb-6">
                        <ul
                          aria-describedby="features-lists"
                          className="w-full flex flex-col items-start gap-y-3"
                        >
                          {plan.features.map((feat, index) => (
                            <li
                              key={index}
                              aria-describedby="feature-item"
                              className="group/feature flex items-center gap-2.5 transition-all duration-300 ease-out hover:scale-105 transform"
                            >
                             {feat.available ? (
                                     <CircleCheck
                                       className={cn(
                                             "w-5 h-5 text-green-500 transition-all duration-300 ease-out group-hover/feature:scale-110 transform",
                                                plan.key === "necessary" && "text-white"
                                                         )}
                                                          />
                                                            ) : (
                                 <span className="text-red-500 text-lg font-bold leading-none transition-all duration-300 ease-out group-hover/feature:scale-110 transform">✖</span>
                                                                      )}

                              <span
                                className={cn(
                                  "text-base font-normal text-neutral-700 transition-all duration-300 ease-out group-hover:text-neutral-600",
                                  plan.key === "necessary" && "text-white group-hover:text-blue-100"
                                )}
                              >
                                {feat.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div aria-describedby="action" className="mt-auto">
                        <Button
                          asChild
                          className={cn(
                            "w-full text-base transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform",
                            plan.key === "necessary" &&
                              "bg-white hover:bg-white/90 text-neutral-900"
                          )}
                        >
                          <Link href={plan.action.url}>{plan.action.label}</Link>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Course Details T&C Text */}
            <div className="max-w-4xl mt-8">
              <div className="text-xs text-gray-500 text-left leading-relaxed pl-4">
                <p>*Rescheduled classes must be completed within next 30 days.</p>
                <p>**Rescheduling or cancellations must be informed to the teacher or admin at least 4 hours before the session start time.</p>
                <p>***Discounts are available for two siblings. Discounts do not apply to group sessions.</p>
              </div>
            </div>
          </div>
        </section>

        <FeedbackFromStudents />

        {/* Trial Class Section with working button */}
        <section
          aria-describedby="trial-class-section"
          className="py-10 sm:py-16 "
        >
          <div className="container">
            <div
              aria-describedby="content-wrapper"
              className="group bg-[#2EA7FE] p-8 rounded-4xl flex items-center justify-between gap-x-20 gap-y-10 overflow-hidden flex-col
                     md:flex-row
                    relative z-[1] before:absolute before:w-80 before:h-80 before:-z-[1] before:bg-[#53B7FF] before:-top-1/2 before:-left-16 before:rounded-full before:transition-all before:duration-700 before:ease-out group-hover:before:scale-125 group-hover:before:blur-[150px]
                    after:absolute after:w-80 after:h-80 after:-z-[1] after:top-full after:-translate-24 after:-right-36 after:bg-[#53B7FF] after:rounded-full after:transition-all after:duration-700 after:ease-out group-hover:after:scale-125 group-hover:after:blur-[150px]
                    transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer
                    "
            >
              <div
                aria-describedby="left-column"
                className="shrink-0 grow-0 basis-auto transition-transform duration-500 ease-out group-hover:scale-105 transform"
              >
                <div aria-describedby="image-wrapper" className="w-80 flex overflow-hidden rounded-2xl">
                  <Image
                    src={"/parent-teaching-child.png"}
                    width={921}
                    height={689}
                    alt="parent teaching their child"
                    className="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </div>

              <div aria-describedby="right-column" className="flex-1">
                <div
                  aria-describedby="content-wrapper"
                  className="flex flex-col gap-y-6 justify-center items-center"
                >
                  <h3 className="text-3xl leading-snug font-bold text-white text-center transition-all duration-300 ease-out group-hover:text-blue-100 group-hover:scale-105 transform">
                    Enjoy a{" "}
                    <span className="bg-yellow-500 py-1 px-2 rounded-lg transition-all duration-300 ease-out group-hover:bg-yellow-400 group-hover:scale-105 transform">
                      5%
                    </span>{" "}
                    discount when family members enroll together
                  </h3>

                  <Button 
                    asChild
                    className="transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg transform"
                  >
                    <Link href="/trial">Get Trial Class Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSectionPricing/>
      </div>
    </React.Fragment>
  );
};

export default PricingPage;
