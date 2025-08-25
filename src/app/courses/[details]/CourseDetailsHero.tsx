"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type HeroProps = {
  title: string;
  blurb: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const CourseDetailsHero: React.FC<HeroProps> = ({
  title,
  blurb,
  ctaHref = "/trial",
  ctaLabel = "Get Started",
}) => {
  return (
    <React.Fragment>
      <div aria-describedby="course-details-hero" className="max-w-3xl">
        <div aria-describedby="course-detail" className="mb-6 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-snug sm:leading-snug">
            {title}
          </h1>

          <p className="text-base sm:text-xl font-normal text-white mb-8">
            {blurb}
          </p>

          <Button variant="secondary" asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>

        <div
          aria-describedby="course-meta"
          className="flex items-center gap-3 flex-wrap"
        />
      </div>
    </React.Fragment>
  );
};

export default CourseDetailsHero;
