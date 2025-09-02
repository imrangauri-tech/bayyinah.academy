"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopCourseItem = {
  slug: string;
  title: string;
  subTitle: string;
  shortDescription: string;
  image: { url: string; alt: string; width: number; height: number };
  href: string;
};

export default function TopCoursesBox({ items, intervalMs = 4000 }: { items: TopCourseItem[]; intervalMs?: number }) {
  const [idx, setIdx] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isHoverRef = React.useRef(false);

  const go = React.useCallback((next: number) => setIdx(() => (next + items.length) % items.length), [items.length]);
  const next = React.useCallback(() => go(idx + 1), [go, idx]);

  // autoplay
  React.useEffect(() => {
    if (isHoverRef.current) return;
    timerRef.current = setTimeout(next, intervalMs);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx, intervalMs, next]);

  if (!items?.length) return null;
  const active = items[idx];

  return (
    <div
      className="group rounded-2xl border bg-white p-0 shadow-sm overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:shadow-gray-200/50"
      onMouseEnter={() => { isHoverRef.current = true; if (timerRef.current) clearTimeout(timerRef.current); }}
      onMouseLeave={() => { isHoverRef.current = false; setIdx((i) => i); }} // restart effect
      aria-label="Our Top Courses"
    >
      <div className="flex items-center justify-between px-6 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 ease-out group-hover:text-gray-800">Our Best Courses</h2>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous"
            onClick={() => go(idx - 1)}
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
          href={active.href
            .replace('/courses/mastery-in-quran-reading', '/courses/Mastery-in-Quran-Reading')
            .replace('/courses/quran-memorization', '/courses/Quran-Memorization')
            .replace('/courses/arabic-language-read-write-talk-and-understand', '/courses/Arabic-Language-Read-Write-Speak-and-Understand')
            .replace('/courses/islamic-studies-islamic-etiquettes-and-manners', '/courses/Islamic-Studies-Islamic-Etiquettes-and-Manners')
            .replace('/courses/arabic-language-for-school-students', '/courses/Arabic-Language-for-School-Students')
          }
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#FAAF2F] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#e89b1e] transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
          aria-label={`Learn more about ${active.title}`}
        >
          Learn More
        </Link>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 pb-5">
        {items.map((_item, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-200 ease-out hover:scale-125 ${i === idx ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
