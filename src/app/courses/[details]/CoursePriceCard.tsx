import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursePriceCard = () => {
  return (
    <React.Fragment>
      <div
        aria-describedby="price-card"
        className="group sm:py-9 py-6 sm:px-6 px-3 rounded-2xl bg-white border border-[#ECECEC] transition-all duration-500 ease-out hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300"
      >
        <div
          aria-describedby="course-actions"
          className="flex flex-col items-center w-full gap-y-3 mb-3"
        >
         <Button 
           variant="secondary" 
           asChild
           className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
         >
              <Link href="/trial">Join Us</Link>
         </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CoursePriceCard;
