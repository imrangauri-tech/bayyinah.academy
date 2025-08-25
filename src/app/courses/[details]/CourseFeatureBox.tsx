import React from "react";
import { CourseFeaturesTypes } from "@/types";

interface CourseFeatureBoxProps {
  data: CourseFeaturesTypes[];
}

const CourseFeatureBox: React.FC<CourseFeatureBoxProps> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map((featItem) => (
        <div
          key={featItem.key}
          aria-describedby="course-feature-box"
          className="p-6 sm:p-8 bg-white rounded-2xl border border-[#ECECEC]"
        >
          <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 pb-4 border-b border-neutral-200 mb-6">
            {featItem.title}
          </h3>

          <ul
            aria-describedby="course-feature-lists"
            className="flex items-start flex-col gap-y-6 mb-10"
          >
            {featItem.features.map(({ icon: Icon, label }, index) => (
              <li
                key={index}
                aria-describedby="course-feature-item"
                className="flex items-center gap-2"
              >
                <span className="flex shrink-0 grow-0 basis-auto">
                  <Icon className="fill-indigo-500 text-white w-7 h-7" />
                </span>
                <p className="text-base sm:text-lg font-normal text-neutral-800">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
};

export default CourseFeatureBox;
