"use client";

import React from "react";

import dynamic from "next/dynamic";

const Tree = dynamic(() => import("react-organizational-chart").then(mod => mod.Tree), { ssr: false });
const TreeNode = dynamic(() => import("react-organizational-chart").then(mod => mod.TreeNode), { ssr: false });

const PageTree = () => {
  return (
    <React.Fragment>
      <Tree
        label={<Pill variant="title">Page&nbsp;List</Pill>}
        lineColor="#ccc"
        lineWidth="2px"
        lineBorderRadius="0"
      >
        <TreeNode label={<Pill>Home</Pill>} />
        <TreeNode label={<Pill>About</Pill>} />

        <TreeNode label={<Pill>Course</Pill>}>
          <TreeNode label={<Pill variant="child">Tajweed</Pill>} />
          <TreeNode label={<Pill variant="child">Quran</Pill>} />
          <TreeNode label={<Pill variant="child">Quran</Pill>} />
        </TreeNode>

        <TreeNode label={<Pill>Resources</Pill>}>
          {["Testimonial", "Blog", "Teacher", "Contact Us", "FAQ"].map((t) => (
            <TreeNode key={t} label={<Pill variant="child">{t}</Pill>} />
          ))}
        </TreeNode>

        <TreeNode label={<Pill>Career</Pill>} />
      </Tree>
    </React.Fragment>
  );
};

export default PageTree;

/* simple re-usable pill */
interface PillTypes {
  children: React.ReactNode;
  variant?: string;
}
const Pill: React.FC<PillTypes> = ({ children, variant = "parent" }) => (
  <div
    className={
      variant === "title"
        ? "bg-regal-blue-500 py-2.5 px-11 rounded-md text-white max-w-max mx-auto"
        : variant === "child"
        ? "bg-[#4ab1ff] text-white"
        : "bg-[#f5a623]" + " inline-block px-6 py-1.5 font-semibold rounded-md"
    }
  >
    {children}
  </div>
);
