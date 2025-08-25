"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Centralized course metadata (titles/subtitles/descriptions/images)
const COURSE_CARD_META: Record<
  string,
  {
    title: string;
    subTitle: string;
    shortDescription: string;
    image: { url: string; alt: string; width: number; height: number };
  }
> = {
  "mastery-in-quran-reading": {
    title: "Mastery in Quran Reading",
    subTitle: "Quran Tajweed",
    shortDescription:
      "From foundations to fluent Quran reading with Tajweed, rhythm, and confidence.",
    image: { url: "/quran-ayat.jpg", alt: "Quran Reading", width: 4096, height: 3046 },
  },
  "quran-memorization": {
    title: "Quran Hifz (Memorization)",
    subTitle: "Quran Hifz",
    shortDescription:
      "Structured Hifz plan with jadid, sabaq, manzil—built for retention and progress.",
    image: { url: "/course-image-1.jpg", alt: "Quran Hifz", width: 4096, height: 3046 },
  },
  "arabic-language-read-write-talk-and-understand": {
    title: "Arabic Language — Read, Write, Talk, and Understand",
    subTitle: "Arabic Language",
    shortDescription:
      "Practical MSA for reading, writing, speaking, and understanding native audio.",
    image: { url: "/arabic.jpeg", alt: "Arabic Language", width: 4096, height: 3046 },
  },
  "islamic-studies-islamic-etiquettes-and-manners": {
    title: "Islamic Studies — Islamic Etiquettes and Manners",
    subTitle: "Islamic Studies",
    shortDescription:
      "Adab in personal, family, social, and online life with weekly practice.",
    image: { url: "/islamic-studies.jpg", alt: "Islamic Studies", width: 4096, height: 3046 },
  },
  "arabic-language-for-school-students": {
    title: "Arabic Language for School Students",
    subTitle: "Academic Arabic",
    shortDescription:
      "Curriculum-aligned Arabic: comprehension, dictation, grammar, speaking, listening.",
    image: { url: "/arabicuae.jpeg", alt: "Academic Arabic", width: 4096, height: 3046 },
  },
};

// Normalize any legacy/cased slug to canonical lowercase
const normalize = (s: string) => {
  const cleaned = decodeURIComponent(s).replace(/[\u200B-\u200D\uFEFF]/g, "").toLowerCase();
  const collapsed = cleaned.replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  const aliases: Record<string, string> = {
    "arabic-language-read-write-speak-and-understand":
      "arabic-language-read-write-talk-and-understand",
  };
  return aliases[collapsed] ?? collapsed;
};

export default function CourseIncludesBox() {
  const pathname = usePathname(); // e.g. /courses/quran-memorization
  const slugInPath =
    pathname?.includes("/courses/")
      ? normalize(pathname.split("/courses/")[1] || "")
      : "";

  // Build list of "other" courses (exclude the one you're viewing)
  const items = React.useMemo(
    () =>
      Object.entries(COURSE_CARD_META)
        .filter(([slug]) => slug && slug !== slugInPath)
        .map(([slug, meta]) => ({
          slug,
          title: meta.title,
          subTitle: meta.subTitle,
          shortDescription: meta.shortDescription,
          image: meta.image,
          href: `/courses/${slug}`,
        })),
    [slugInPath]
  );

  // Simple autoplay carousel with pause-on-hover
  const [idx, setIdx] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const hoveringRef = React.useRef(false);

  const next = React.useCallback(
    () => setIdx((i) => (i + 1) % Math.max(items.length, 1)),
    [items.length]
  );
  const prev = React.useCallback(
    () => setIdx((i) => (i - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1)),
    [items.length]
  );

  React.useEffect(() => {
    if (!items.length || hoveringRef.current) return;
    timerRef.current = setTimeout(next, 4000); // 4s per slide
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idx, items.length, next]);

  if (!items.length) {
    // Fallback to an empty card if something odd happens
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Our Top Courses</h2>
        <p className="mt-2 text-sm text-gray-600">No other courses to show.</p>
      </div>
    );
  }

  const active = items[idx];

  return (
    <div
      className="group rounded-2xl border bg-white p-0 shadow-sm overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:shadow-gray-200/50"
      onMouseEnter={() => {
        hoveringRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        setIdx((i) => i); // trigger effect to restart timer
      }}
      aria-label="Our Top Courses"
    >
      <div className="flex items-center justify-between px-6 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 ease-out group-hover:text-gray-800">Our Best Courses</h2>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous"
            onClick={prev}
            className="h-8 w-8 rounded-full border text-sm hover:bg-gray-50 transition-all duration-200 ease-out hover:scale-105 hover:shadow-sm"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="h-8 w-8 rounded-full border text-sm hover:bg-gray-50 transition-all duration-200 ease-out hover:scale-105 hover:shadow-sm"
          >
            ›
          </button>
        </div>
      </div>

      {/* Slide */}
      <div className="p-6">
        <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden">
          <Image
            src={active.image.url}
            alt={active.image.alt}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            priority={false}
          />
        </div>

        <p className="mt-4 text-xs uppercase tracking-wide text-gray-500 transition-colors duration-300 ease-out group-hover:text-gray-600">{active.subTitle}</p>
        <h3 className="mt-1 text-base font-semibold text-gray-900 transition-colors duration-300 ease-out group-hover:text-gray-800">{active.title}</h3>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3 transition-colors duration-300 ease-out group-hover:text-gray-800">{active.shortDescription}</p>

        <Link
          href={active.href}
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#FAAF2F] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#e89b1e] transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
          aria-label={`Learn more about ${active.title}`}
        >
          Learn More
        </Link>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 pb-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-200 ease-out hover:scale-125 ${i === idx ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
