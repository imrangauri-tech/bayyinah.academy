import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CirclePlay } from "lucide-react";
import { CourseContentDataTypes } from "@/types";

interface CourseContentBoxProps {
  data: CourseContentDataTypes;
}

const CourseContentBox: React.FC<CourseContentBoxProps> = ({ data }) => {
  const { lectures, title } = data;

  return (
    <React.Fragment>
      <div
        aria-describedby="course-content-box"
        className="p-6 sm:p-8 bg-white rounded-2xl border border-[#ECECEC]"
      >
        <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 pb-4 border-b border-neutral-200 mb-6">
          {title}
        </h3>

        <div aria-describedby="course-content-accordion" className="mb-10">
          <Accordion type="single" collapsible className="space-y-2">
            {lectures.map((lecture) => (
              <AccordionItem
                key={lecture.key}
                value={lecture.key}
                className="data-[state=open]:bg-neutral-100 px-2 sm:px-5 rounded-md border-0 relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[1px] before:bg-neutral-200 last:before:hidden"
              >
                <AccordionTrigger className="flex-row-reverse hover:no-underline [&>svg]:w-6 [&>svg]:h-6 py-5 border-b border-b-neutral-200 rounded-none last:border-b-0 data-[state=open]:border-b">
                  <div
                    aria-describedby="lecture-title"
                    className="flex items-center gap-3 sm:gap-5 justify-between flex-1"
                  >
                    <p className="text-base sm:text-xl font-medium text-neutral-800">
                      {lecture.title}
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="mt-4">
                  <div aria-describedby="lectures" className="w-full">
                    <ul
                      aria-describedby="lecture-lists"
                      className="w-full flex items-start flex-col gap-y-4"
                    >
                      {lecture.items.map((lecItem, index) => (
                        <li
                          key={index}
                          aria-describedby="lecture-item"
                          className="flex items-center gap-4 justify-between w-full cursor-pointer group/lecture-item"
                        >
                          <div
                            aria-describedby="left-column"
                            className="flex items-center gap-2"
                          >
                            <span
                              aria-describedby="icon"
                              className="shrink-0 grow-0 basis-auto flex"
                            >
                              {lecItem.type === "video" && (
                                <CirclePlay className="w-4 h-4 transition-colors ease-in-out duration-300 group-hover/lecture-item:text-indigo-500" />
                              )}
                            </span>

                            <h5 className="text-base font-normal text-neutral-600 transition-colors ease-in-out duration-300 group-hover/lecture-item:text-indigo-500">
                              {lecItem.label}
                            </h5>
                          </div>

                          <div
                            aria-describedby="right-column"
                            className="shrink-0 grow-0 basis-auto flex"
                          >
                            <span
                              aria-describedby="single-lecture-duration"
                              className="text-base font-normal text-neutral-600 transition-colors ease-in-out duration-300 group-hover/lecture-item:text-indigo-500"
                            >
                              {lecItem.duration}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseContentBox;
