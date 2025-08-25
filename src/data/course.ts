// src/data/courses.ts
export type Course = {
  slug: string; 
  title: string;
  subTitle?: string;
  shortDescription: string;
  featureImage: { url: string; width: number; height: number; alt: string };
  content: string; 
  enrollUrl?: string;
};

export const COURSES: Course[] = [
  {
    slug: "Mastery-in-Quran-Reading",
    title: "Mastery in Quran Reading",
    subTitle: "Quran Tajweed",
    shortDescription:
      "This Tajweed-focused course guides students from beginner to advanced Quran reading with clear pronunciation, fluency, and confidence.",
    featureImage: {
      url: "/quran-ayat.jpg",
      width: 4096,
      height: 3046,
      alt: "Quran reading with Tajweed",
    },
    enrollUrl: "/trial",
    content: `
## What you'll learn
- Foundational makharij (articulation points) and sifaat (letter attributes)
- Rules of noon/meeem sakinah, qalqalah, madd, waqf
- Fluency drills with measured pacing and accuracy

## Course format
Short, guided recitations + instructor feedback each session, with weekly targets and practice sheets.

## Who is this for?
Beginners to intermediate readers who want confident, correct recitation.
`.trim(),
  },
  {
    slug: "Quran-Memorization",
    title: "Quran Hifz (Memorization)",
    subTitle: "Quran Hifz",
    shortDescription:
      "Memorize the Qur’an (full or selected portions) with structured techniques, tajweed support, and a sustainable revision plan.",
    featureImage: {
      url: "/course-image-1.jpg",
      width: 4096,
      height: 3046,
      alt: "Quran memorization session",
    },
    enrollUrl: "/trial",
    content: `
## Approach
- Bite-sized daily targets with spaced repetition
- Strong focus on tajweed while memorizing
- Personal tracking sheet and weekly assessments

## Outcomes
A sustainable memorization rhythm, stronger retention, and confident revision cycles.
`.trim(),
  },
  {
    slug: "Arabic-Language-Read-Write-Speak-and-Understand",
    title: "Arabic Language — Read, Write, Speak, and Understand",
    subTitle: "Arabic Language",
    shortDescription:
      "Intermediate Arabic to improve reading, writing, speaking, and comprehension across formal and daily-use contexts.",
    featureImage: {
      url: "/arabic.jpeg",
      width: 4096,
      height: 3046,
      alt: "Arabic language learning",
    },
    enrollUrl: "/trial",
    content: `
## Skills covered
Reading fluency, functional vocabulary, grammar patterns, guided conversation, and short-form writing.

## Projects
Dialogues, mini-presentations, and practical writing (messages, notes, short stories).
`.trim(),
  },
  {
    slug: "Islamic-Studies-Islamic-Etiquettes-and-Manners",
    title: "Islamic Studies — Islamic Etiquettes and Manners",
    subTitle: "Islamic Studies",
    shortDescription:
      "Build character and deepen faith through personal, social, and spiritual manners (Adab) rooted in Qur’an and Sunnah.",
    featureImage: {
      url: "/islamic-studies.jpg",
      width: 4096,
      height: 3046,
      alt: "Islamic studies and adab",
    },
    enrollUrl: "/trial",
    content: `
## Topics
- Personal adab: cleanliness, gratitude, truthfulness
- Social adab: family, guests, neighbors
- Spiritual adab: salah, dhikr, sincerity

## Method
Case studies, reflections, and practical weekly challenges.
`.trim(),
  },
  {
    slug: "Arabic-Language-for-School-Students",
    title: "Arabic Language for School Students",
    subTitle: "Academic Arabic",
    shortDescription:
      "Academic Arabic aligned with Gulf school standards — strengthens reading, writing, speaking, and listening with cultural context.",
    featureImage: {
      url: "/arabicuae.jpeg",
      width: 4096,
      height: 3046,
      alt: "Academic Arabic for students",
    },
    enrollUrl: "/trial",
    content: `
## Alignment
Curriculum-aligned exercises, reading comprehension, and vocabulary by theme.

## Assessment
Regular quizzes, term projects, and speaking drills to build confidence.
`.trim(),
  },
];

export const getCourseBySlug = (slug: string) =>
  COURSES.find((c) => c.slug === slug);
