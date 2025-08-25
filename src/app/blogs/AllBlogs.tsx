"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "@/components/common/BlogCard";
import { Button } from "@/components/ui/button";

const LATEST_BLOGS = [
  {
    featureImage: { url: "/blog-feature-1.png", width: 3996, height: 2838, alt: "blog feature image" },
    publishAt: "Oct 24, 2023",
    title: "Ramadan: A Month of Reflection and Renewal",
    shortDescription: "Ramadan, the ninth month of the Islamic",
    action: { url: "/blogs/Ramadan-Month-Reflection-and-Renewal", label: "Read More" },
    category: "islamic",
  },
  {
    featureImage: { url: "/blog-feature-2.png", width: 3996, height: 2838, alt: "blog feature image" },
    publishAt: "Nov 10, 2023",
    title: "Sha‘ban: A Month of Preparation and Spiritual",
    shortDescription: "Sha‘ban, the eighth month of the Islamic",
    action: { url: "/blogs/Shaban-Month-Preparation-and-Spiritual", label: "Read More" },
    category: "quran",
  },
  {
    featureImage: { url: "/blog-feature-3.png", width: 3996, height: 2838, alt: "blog feature image" },
    publishAt: "Jan 16, 2024",
    title: "Rajab: A Month of Divine Mercy and Awakening",
    shortDescription: "Rajab, the seventh month of the Islamic",
    action: { url: "/blogs/Rajab-Month-Divine-Mercy-and-Awakening", label: "Read More" },
    category: "arabic",
  },
  {
    featureImage: { url: "/blog-feature-4.png", width: 3996, height: 2838, alt: "blog feature image" },
    publishAt: "Mar 16, 2023",
    title: "Shawwal: A Month of Gratitude and Continuity",
    shortDescription: "Shawwal, the tenth month of the Islamic",
    action: { url: "/blogs/Shawwal-Month-Gratitude-and-Continuity", label: "Read More" },
    category: "general",
  },
];

const TAB_LISTS = [
  { label: "All", value: "all" },
  { label: "Arabic", value: "arabic" },
  { label: "Quran", value: "quran" },
  { label: "Islamic", value: "islamic" },
  { label: "General", value: "general" },
];

const AllBlogs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleViewAllClick = () => {
    setActiveTab("all");
  };

  return (
    <React.Fragment>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          {TAB_LISTS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div
            aria-describedby="blog-card-wrapper"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <BlogCard BlogCardData={LATEST_BLOGS} />
          </div>
          <div
            aria-describedby="view-all-btn"
            className="mt-16 flex items-center justify-center"
          >
            <Button onClick={handleViewAllClick}>
              View All Articles
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="arabic">
          <div
            aria-describedby="blog-card-wrapper"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <BlogCard BlogCardData={LATEST_BLOGS.filter(blog => blog.category === "arabic")} />
          </div>
          <div
            aria-describedby="view-all-btn"
            className="mt-16 flex items-center justify-center"
          >
            <Button onClick={handleViewAllClick}>
              View All Articles
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="quran">
          <div
            aria-describedby="blog-card-wrapper"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <BlogCard BlogCardData={LATEST_BLOGS.filter(blog => blog.category === "quran")} />
          </div>
          <div
            aria-describedby="view-all-btn"
            className="mt-16 flex items-center justify-center"
          >
            <Button onClick={handleViewAllClick}>
              View All Articles
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="islamic">
          <div
            aria-describedby="blog-card-wrapper"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <BlogCard BlogCardData={LATEST_BLOGS.filter(blog => blog.category === "islamic")} />
          </div>
          <div
            aria-describedby="view-all-btn"
            className="mt-16 flex items-center justify-center"
          >
            <Button onClick={handleViewAllClick}>
              View All Articles
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="general">
          <div
            aria-describedby="blog-card-wrapper"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <BlogCard BlogCardData={LATEST_BLOGS.filter(blog => blog.category === "general")} />
          </div>
          <div
            aria-describedby="view-all-btn"
            className="mt-16 flex items-center justify-center"
          >
            <Button onClick={handleViewAllClick}>
              View All Articles
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </React.Fragment>
  );
};

export default AllBlogs;
