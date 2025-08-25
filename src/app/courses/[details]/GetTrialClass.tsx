import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const GetTrialClass = () => {
  return (
    <React.Fragment>
      <section
        aria-describedby="subscribe-newsletter"
        className={cn(
          "bg-regal-blue-500 py-10 sm:py-16 relative overflow-hidden",
          "before:absolute before:z-[2] before:w-[450] before:h-[450] before:bg-[#0C4681] before:rounded-full before:top-full before:-right-40 before:-translate-y-20",
          "after:absolute after:z-[2] after:w-[450px] after:h-[450px] after:top-full after:-right-4 after:-translate-y-8 after:bg-[#0D4B89] after:rounded-full"
        )}
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="content-wrapper"
              className="flex items-center gap-10 relative z-[5] flex-col lg:flex-row"
            >
              <div
                aria-describedby="left-column"
                className="shrink-0 grow-0 basis-auto"
              >
                <div aria-describedby="image-wrapper" className="w-80">
                  <Image
                    src={"/trial-rocket.png"}
                    width={939}
                    height={834}
                    alt="trial class"
                    priority
                  />
                </div>
              </div>

              <div
                aria-describedby="right-column"
                className="flex items-center justify-center flex-col flex-1 gap-y-5 max-w-5xl mx-auto"
              >
                <h3 className="text-3xl sm:text-5xl font-bold text-white text-center leading-snug">
                  With our help, you can become your own guiding star.
                </h3>

                <p className="text-base sm:text-xl font-normal text-white text-center">
                  Let’s get started!
                </p>

                <div aria-describedby="action-btn" className="mt-5">
                  <Button asChild variant="secondary">
                    <Link href="/trial">Get Trial Class Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default GetTrialClass;
