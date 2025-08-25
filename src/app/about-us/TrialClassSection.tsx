import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const TrialClassSection = () => {
  return (
    <React.Fragment>
      <section aria-describedby="trial-class-section" className="py-10 sm:py-16 ">
        <div className="container">
          <div
            aria-describedby="content-wrapper"
            className="bg-[#2EA7FE] p-8  rounded-4xl flex items-center justify-between gap-x-20 gap-y-10 overflow-hidden flex-col
            sm:p-20 md:flex-row
            relative z-[1] before:absolute before:w-80 before:h-80 before:-z-[1] before:bg-[#53B7FF] before:-top-1/2 before:-left-16 before:rounded-full before:transition-all before:duration-700 before:ease-out hover:before:scale-110
            before:sm:block before:hidden
            after:absolute after:w-80 after:h-80 after:-z-[1] after:top-full after:-translate-24 after:-right-36 after:bg-[#53B7FF] after:rounded-full after:transition-all after:duration-700 after:ease-out hover:after:scale-110
            "
          >
            <div aria-describedby="left-column" className="flex-1">
              <div
                aria-describedby="column-content"
                className="flex items-start flex-col gap-y-5 max-w-3xl"
              >
                <h6 className="text-lg font-bold text-white max-w-max transition-all duration-300 ease-out hover:scale-105 transform">
                  Free Online Trail Class
                </h6>
                <h3 className="text-3xl sm:text-4xl font-bold text-white leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
                  Ready to dive in? Start your free Trail Class today.
                </h3>
              </div>
            </div>

            <div
              aria-describedby="right-column"
              className="shrink-0 grow-0 basis-auto"
            >
              <div>
                 <Button 
                   variant="ghost" 
                   asChild
                   className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                 >
                   <Link href="/trial">Click Here</Link>
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default TrialClassSection;
