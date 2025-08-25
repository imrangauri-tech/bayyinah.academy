import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link"; //button 

const ActionSection = () => {
  return (
    <React.Fragment>
      <section
        aria-describedby="subscribe-newsletter"
        className={cn(
          "bg-regal-blue-500 py-10 sm:py-16 relative overflow-hidden",
          // big shape
          "before:absolute before:z-[2] before:w-[450] before:h-[450] before:bg-[#0C4681] before:rounded-full before:top-full before:-right-40 before:-translate-y-20",
          // small shape
          "after:absolute after:z-[2] after:w-[450px] after:h-[450px] after:top-full after:-right-4 after:-translate-y-8 after:bg-[#0D4B89] after:rounded-full"
        )}
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="content-wrapper"
              className="flex items-center justify-center flex-col gap-y-5 max-w-5xl mx-auto relative z-[5]"
            >
              <h3 className="text-3xl sm:text-5xl font-bold text-white text-center leading-snug transition-all duration-500 ease-out hover:scale-105 transform">
                Enhance your Quranic knowledge & recitation with expert
                guidance.
              </h3>

              <p className="text-base sm:text-xl font-normal text-white text-center transition-all duration-500 ease-out hover:scale-105 hover:text-blue-50 transform">
                Let's get started!
              </p>

              <div aria-describedby="action-btn" className="mt-5">
                <Button 
                  variant="secondary" 
                  asChild
                  className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                >
                  <Link href="/trial">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ActionSection;
