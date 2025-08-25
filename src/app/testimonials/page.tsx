import PageHeroSection from "@/components/common/PageHeroSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Link from "next/link"; 
import TestimonialsFaqSection from "@/components/testimonials/TestimonialsFaqSection";

const testimonials = [
  {
    text: "My son has been studying with Bayyinah and his love for Arabic and the Qur’an has grown so much, Alhamdulillah!",
    name: "Javed Maqsood",
    image: "/muslim-guardian.png",
    role: "Parent of Student",
  },
  {
    text: "This academy has been a blessing, my daughter looks forward to every class and is learning so much",
    name: "Aejaz Sayed",
    image: "/muslim-guardian.png",
    role: "Parent of Student",
  },
  {
    text: "Both of my kids are enrolled at Bayyinah and we’re amazed by the progress they’ve made, Alhamdulillah",
    name: "Ibrahim Sheikh",
    image: "/muslim-guardian.png",
    role: "Parent of Student",
  },
  {
    text: "My daughter’s confidence in reading the Qur’an has improved greatly.",
    name: "Farhat Jahan",
    image: "/review-author.png",
    role: "Parent of Student",
  },
  {
    text: "TBayyinah Academy has made Islamic learning easy and enjoyable for my son—highly recommended!",
    name: "Abeda Begum",
    image: "/review-author.png",
    role: "Parent of Student",
  },
];

const TestimonialsPages = () => {
  return (
    <React.Fragment>
      <div aria-label="testimonials-page">
        <PageHeroSection
          title="Testimonials"
          description="Feedback from our Students. Find the right course for you."
        />

        <section aria-label="reviews-section" className="py-10 sm:py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-20">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group p-5 border border-[#E6E6E6] rounded-2xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                  aria-label="review-card"
                >
                  <span className="border border-[#E7EAE9] flex items-center justify-center p-4 rounded-full max-w-max text-[#C0D0E1] text-2xl mb-4 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-[#A8C0D8] transform">
                    <FaQuoteLeft />
                  </span>

                  <p className="text-lg font-normal text-neutral-700 mb-5 transition-all duration-300 ease-out group-hover:text-neutral-800">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-16 flex max-w-max shrink-0 grow-0 basis-auto overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 transform">
                      <Image
                        src={testimonial.image}
                        width={171}
                        height={154}
                        alt={`Photo of ${testimonial.name}`}
                        priority
                        className="aspect-square object-cover object-top rounded-full bg-[#CFE3F8] transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-y-1 items-start">
                      <h5 className="text-base font-bold text-neutral-900 transition-all duration-300 ease-out group-hover:text-neutral-800">
                        {testimonial.name}
                      </h5>
                      <p className="text-sm font-normal text-neutral-600 transition-all duration-300 ease-out group-hover:text-neutral-700">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-label="book-trial-section"
          className={cn(
            "bg-regal-blue-500 py-10 sm:py-16 relative overflow-hidden",
            "before:absolute before:z-[2] before:w-[450px] before:h-[450px] before:bg-[#0C4681] before:rounded-full before:top-full before:-right-40 before:-translate-y-20 before:transition-all before:duration-700 before:ease-out hover:before:scale-110",
            "after:absolute after:z-[2] after:w-[450px] after:h-[450px] after:top-full after:-right-4 after:-translate-y-8 after:bg-[#0D4B89] after:rounded-full after:transition-all after:duration-700 after:ease-out hover:after:scale-110"
          )}
        >
          <div className="relative z-10 container text-white text-center">
            <h2 className="text-3xl font-semibold mb-4 transition-all duration-500 ease-out hover:scale-105 transform">Ready to start your journey?</h2>
            <p className="mb-6 transition-all duration-500 ease-out hover:scale-105 hover:text-blue-50 transform">Book a free trial class and experience the difference.</p>
            <Link href="/trial" passHref>
              <Button
                variant="secondary"
                className="bg-white text-regal-blue-500 hover:bg-gray-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
              >
                Book a Free Trial
              </Button>
            </Link>
          </div>
        </section>

        <TestimonialsFaqSection />
      </div>
    </React.Fragment>
  );
};

export default TestimonialsPages;
