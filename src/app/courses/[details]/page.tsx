import { notFound } from "next/navigation";
import CourseDetailsClient from "./CourseDetailsClient";

type Props = { params: Promise<{ details: string }> };

type CanonicalSlug =
  | "mastery-in-quran-reading"
  | "quran-memorization"
  | "arabic-language-read-write-talk-and-understand"
  | "islamic-studies-islamic-etiquettes-and-manners"
  | "arabic-language-for-school-students";

function isCanonicalSlug(value: string): value is CanonicalSlug {
  return (
    value === "mastery-in-quran-reading" ||
    value === "quran-memorization" ||
    value === "arabic-language-read-write-talk-and-understand" ||
    value === "islamic-studies-islamic-etiquettes-and-manners" ||
    value === "arabic-language-for-school-students"
  );
}

// Remove zero-width chars, decode, lowercase
const sanitize = (s: string) =>
  (typeof s === "string" ? decodeURIComponent(s).replace(/[\u200B-\u200D\uFEFF]/g, "") : "");

// Canonical, lowercase slugs we support today
const CANONICAL_SLUGS: readonly CanonicalSlug[] = [
  "mastery-in-quran-reading",
  "quran-memorization",
  "arabic-language-read-write-talk-and-understand", // canonical uses "talk"
  "islamic-studies-islamic-etiquettes-and-manners",
  "arabic-language-for-school-students",
] as const;

// Legacy slugs you previously shipped (TitleCase + the old Speak variant)
const LEGACY_SLUGS = [
  "Mastery-in-Quran-Reading",
  "Quran-Memorization",
  "Arabic-Language-Read-Write-Speak-and-Understand", // legacy "Speak"
  "Islamic-Studies-Islamic-Etiquettes-and-Manners",
  "Arabic-Language-for-School-Students",
] as const;

// Map any old/incorrect slug (in lowercase) to its canonical lowercase
const LEGACY_ALIASES: Record<string, CanonicalSlug> = {
  // support older “speak” links
  "arabic-language-read-write-speak-and-understand":
    "arabic-language-read-write-talk-and-understand",
  // also accept TitleCase variants by normalizing them to lowercase
  "mastery-in-quran-reading": "mastery-in-quran-reading",
  "quran-memorization": "quran-memorization",
  "islamic-studies-islamic-etiquettes-and-manners":
    "islamic-studies-islamic-etiquettes-and-manners",
  "arabic-language-for-school-students": "arabic-language-for-school-students",
};

// Titles keyed by the canonical lowercase slug
const TITLE_BY_CANONICAL: Record<CanonicalSlug, string> = {
  "mastery-in-quran-reading": "Mastery in Quran Reading",
  "quran-memorization": "Quran Hifz (Memorization)",
  "arabic-language-read-write-talk-and-understand":
    "Arabic Language — Read, Write, Talk, and Understand",
  "islamic-studies-islamic-etiquettes-and-manners":
    "Islamic Studies — Islamic Etiquettes and Manners",
  "arabic-language-for-school-students": "Arabic Language for School Students",
};

function normalizeToCanonical(input: string): string {
  const lower = sanitize(input).toLowerCase();
  if (lower in LEGACY_ALIASES) return LEGACY_ALIASES[lower];
  if (isCanonicalSlug(lower)) return lower;
  const collapsed = lower.replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  return LEGACY_ALIASES[collapsed] ?? (isCanonicalSlug(collapsed) ? collapsed : "");
}

export function generateStaticParams() {
  const canonical = CANONICAL_SLUGS.map((details) => ({ details }));
  const legacy = LEGACY_SLUGS.map((details) => ({ details }));
  const seen = new Set<string>();
  return [...canonical, ...legacy].filter((p) => {
    const k = JSON.stringify(p);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export async function generateMetadata({ params }: Props) {
  const { details } = await params;
  const canonical = normalizeToCanonical(details);
  if (canonical === "quran-memorization") {
    return {
      title: "Memorize Quran Online | Expert Hifz Teachers – Bayyinah Academy",
      description:
        "Start your Quran memorization journey with Bayyinah Academy. Learn to memorize the Quran online with certified Hifz teachers, step-by-step guidance, and flexible online classes for kids & adults",
    };
  }
  if (canonical === "mastery-in-quran-reading") {
    return {
      title: "Tajweed Classes Online | Learn Tajweed Online, Quran Memorization & Quran Reading Classes",
      description:
        "Join Bayyinah Academy for expert-led Tajweed classes online. Learn Tajweed online with certified teachers, enroll in Quran memorization classes, and improve recitation with Quran reading classes online for all ages",
    };
  }
  if (canonical === "arabic-language-read-write-talk-and-understand") {
    return {
      title: "Quranic Arabic Lessons Online | Arabic Course Online & Arabic Classes for Kids",
      description:
        "Learn Quranic Arabic lessons online with Bayyinah Academy. Enroll in our Arabic course online to master grammar, vocabulary & Quran understanding. Special online Arabic classes for kids with expert teachers",
    };
  }
  if (canonical === "islamic-studies-islamic-etiquettes-and-manners") {
    return {
      title: "Islamic Studies Online Courses | Islamic Online Classes, Quran Studies & Islamic Online Courses",
      description:
        "Bayyinah Academy offers Islamic studies online courses for all ages. Join interactive Islamic online classes, explore Quran studies online, and gain deep knowledge through structured Islamic online courses with expert teachers",
    };
  }
  const title = (isCanonicalSlug(canonical) && TITLE_BY_CANONICAL[canonical]) || "Course Details";
  return { title };
}

export default async function Page({ params }: Props) {
  const { details } = await params;
  const canonical = normalizeToCanonical(details);
  if (!isCanonicalSlug(canonical)) {
    notFound();
  }
  return <CourseDetailsClient slug={canonical} />;
}
