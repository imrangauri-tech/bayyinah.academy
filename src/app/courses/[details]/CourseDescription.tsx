import React from "react";
import { CourseDescriptionTypes } from "@/types";


interface CourseDescriptionProps {
  data: CourseDescriptionTypes;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ data }) => {
  const { content, title } = data;

  return (
    <React.Fragment>
      <div
        aria-describedby="course-feature-box"
        className="p-6 sm:p-8 bg-white rounded-2xl border border-[#ECECEC]"
      >
        <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 pb-4 border-b border-neutral-200 mb-6">
          {title}
        </h3>

        <div aria-describedby="course-description" className="mb-6 sm:mb-10">
          <p className="text-base sm:text-lg font-normal text-neutral-800">{content}</p>
        </div>

      
      </div>
    </React.Fragment>
  );
};

export default CourseDescription;
