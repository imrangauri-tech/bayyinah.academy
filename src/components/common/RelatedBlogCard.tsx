import { BlogCardTypes } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RelatedBlogCardProps {
  data: BlogCardTypes[];
}

const RelatedBlogCard: React.FC<RelatedBlogCardProps> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map((card, index) => (
        <div
          key={index}
          aria-describedby="related-blog-card"
          className="group border border-[#E6E6E6] flex flex-col rounded-3xl transition-all duration-500 ease-out hover:border-regal-blue-500 hover:bg-regal-blue-100/5 hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.02] transform"
        >
          <div
            aria-describedby="card-header"
            className="flex items-center w-full overflow-hidden rounded-t-3xl"
          >
            <Link href={card.action.url} className="block cursor-pointer w-full">
              <Image
                src={card.featureImage.url}
                width={card.featureImage.width}
                height={card.featureImage.height}
                alt={card.featureImage.alt}
                className="aspect-square object-cover rounded-t-3xl transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </Link>
          </div>

          <div aria-describedby="card-body" className="p-6 w-full">
            <h4 className="text-xl font-medium text-neutral-800 line-clamp-2 mb-3 transition-colors duration-300 ease-out group-hover:text-neutral-900">
              {card.title}
            </h4>
            <p className="text-sm font-normal text-neutral-700 line-clamp-2 mb-4 transition-colors duration-300 ease-out group-hover:text-neutral-800">
              {card.shortDescription}
            </p>
            <Link
              href={card.action.url}
              className="flex items-center gap-x-2 text-lg font-medium text-yellow-500 transition-all ease-in-out duration-300 hover:text-yellow-600 group/read hover:scale-105 transform"
            >
              {card.action.label}
              <ArrowRight className="-translate-x-1 transition-transform ease-in-out duration-300 group-hover/read:translate-x-2" />
            </Link>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default RelatedBlogCard;
