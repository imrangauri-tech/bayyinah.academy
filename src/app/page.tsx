// SEO metadata for homepage
export const metadata = {
  title: "Learn Quran Online | Learn Arabic Quran Online & Join Online Quran Classes",
  description: "Bayyinah Academy helps you learn Quran online with expert teachers. Enroll to learn Arabic Quran online, improve Tajweed, and join interactive online Quran classes designed for kids and adults.",
};
import {
  FaqSection,
  FeedbackFromStudents,
  HomeArticles,
  HomeHero,
  InteractiveLearning,
  SubscribeNewsletter,
  WhatWeOffer,
  WhyChooseUs,
} from "@/components/homepage";
import React from "react";

const HomePage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="home-page">
        <HomeHero />
        <WhatWeOffer />
        <WhyChooseUs />
        <InteractiveLearning />
        <FeedbackFromStudents />
        <HomeArticles />
        <FaqSection />
        <SubscribeNewsletter />
      </div>
    </React.Fragment>
  );
};

export default HomePage;


