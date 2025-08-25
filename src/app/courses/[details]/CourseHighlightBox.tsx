import React from "react";
import { CourseHighlighDataTypes } from "@/types";

interface CourseHighlightBoxProps {
  data: CourseHighlighDataTypes[];
}

const CourseHighlightBox: React.FC<CourseHighlightBoxProps> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map(({icon: Icon, key, label, value}) => (
        <div
          key={key}
          aria-describedby="highlight-box"
          className="bg-white py-2.5 px-4 rounded-md border border-[#E2E2E2] flex items-center gap-3 min-w-48"
        >
          <span className="flex items-center shrink-0 grow-0 basis-auto">
            <Icon className="w-4.5 h-4.5 text-neutral-800" />
          </span>

          <div
            aria-describedby="right-column"
            className="flex items-start gap-1 flex-col"
          >
            <p className="text-sm font-normal text-neutral-700">{label}</p>
            <span className="text-sm font-bold text-neutral-900">{value}</span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default CourseHighlightBox;
