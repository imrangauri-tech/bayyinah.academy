'use client';

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const JoiningGuide = () => {
  return (
    <React.Fragment>
      <section
        aria-describedby="joining-guide-section"
        className="py-16 bg-white"
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="content-wrapper"
              className={cn('group bg-[#E1F0F4] border relative border-[#E0E6E8] rounded-2xl p-4 flex items-center flex-col gap-x-10 gap-y-12 z-[1] overflow-hidden cursor-pointer',
                // md
                'md:flex-row md:px-14 md:py-11',
                // bottom right shape
                'before:absolute before:-z-[1] before:w-52 before:h-52 before:bg-[#9FD8FA] before:top-full before:right-0 before:-translate-y-20 before:rounded-full before:blur-[100px]',
                // top left shape
                'after:absolute after:-z-[1] after:w-52 after:h-52 after:bg-[rgba(249,213,147,0.60)] after:top-0 after:left-0 after:-translate-y-20 after:rounded-full after:blur-[50px]',
              )}
              style={{
                transition: 'all 700ms ease-out',
                transform: 'translateZ(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(0) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                const before = e.currentTarget.querySelector('::before') as HTMLElement;
                const after = e.currentTarget.querySelector('::after') as HTMLElement;
                if (before) before.style.transform = 'scale(1.25)';
                if (after) after.style.transform = 'scale(1.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                const before = e.currentTarget.querySelector('::before') as HTMLElement;
                const after = e.currentTarget.querySelector('::after') as HTMLElement;
                if (before) before.style.transform = 'scale(1)';
                if (after) after.style.transform = 'scale(1)';
              }}
            >
              <div
                aria-describedby="left-column"
                className="shrink-0 grow-0 basis-auto"
                style={{
                  transition: 'transform 500ms ease-out',
                  transform: 'translateZ(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                }}
              >
                <div
                  aria-describedby="image-wrapper"
                  className="w-full md:w-2xs flex items-center overflow-hidden rounded-2xl"
                >
                  <Image
                    src={"/hijab-little-girl.png"}
                    width={1344}
                    height={768}
                    alt="hijab little girl"
                    className="aspect-video md:aspect-square object-cover rounded-2xl"
                    style={{
                      transition: 'transform 700ms ease-out',
                      transform: 'translateZ(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                    }}
                  />
                </div>
              </div>

              <div aria-describedby="right-column" className="flex-1">
                <div aria-describedby="content" className="flex items-start flex-col">
                  <h3 
                    className="text-3xl leading-snug font-bold text-neutral-800 mb-4"
                    style={{
                      transition: 'all 500ms ease-out',
                      transform: 'translateZ(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1.05)';
                      e.currentTarget.style.color = '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                      e.currentTarget.style.color = '#374151';
                    }}
                  >
                    NOT SURE WHERE TO START?
                  </h3>
                  <p 
                    className="text-base sm:text-xl font-normal text-neutral-700 mb-8"
                    style={{
                      transition: 'all 500ms ease-out',
                      transform: 'translateZ(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1.05)';
                      e.currentTarget.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                      e.currentTarget.style.color = '#6B7280';
                    }}
                  >
                    Want to know Special Offers & Updates of new courses?
                  </p>

                  <Button 
                    asChild 
                    className="text-base sm:text-xl"
                    style={{
                      transition: 'all 300ms ease-out',
                      transform: 'translateZ(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Link href={'/trial'}>Join Now</Link>
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

export default JoiningGuide;
