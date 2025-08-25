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


