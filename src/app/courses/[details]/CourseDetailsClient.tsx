"use client";

import React from "react";
import {
  BadgeCheck,
  CalendarClock,
  ChartNoAxesCombined,
  Clock,
} from "lucide-react";
import { IoIosPeople } from "react-icons/io";
import { FaLaptop } from "react-icons/fa";

import {
  CourseContentDataTypes,
  CourseDescriptionTypes,
  CourseFeaturesTypes,
  CourseHighlighDataTypes,
} from "@/types";

import CourseFeatureBox from "./CourseFeatureBox";
import CourseDescription from "./CourseDescription";
import CourseContentBox from "./CourseContentBox";
import CoursePriceCard from "./CoursePriceCard";
import CourseIncludesBox from "./CourseIncludesBox";
import CourseHighlightBox from "./CourseHighlightBox";
import CourseDetailsHero from "./CourseDetailsHero";
import GetTrialClass from "./GetTrialClass";
import CoursesFaqSection from "@/components/courses/CoursesFaqSection";

type Props = { slug: string };

/* -------------------------------------------
   Normalization (accept legacy TitleCase & “speak”)
-------------------------------------------- */
const normalize = (s: string) => {
  const cleaned = decodeURIComponent(s)
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .toLowerCase();

  const aliases: Record<string, string> = {
    "arabic-language-read-write-speak-and-understand":
      "arabic-language-read-write-talk-and-understand",
    "mastery-in-quran-reading": "mastery-in-quran-reading",
    "quran-memorization": "quran-memorization",
    "islamic-studies-islamic-etiquettes-and-manners":
      "islamic-studies-islamic-etiquettes-and-manners",
    "arabic-language-for-school-students":
      "arabic-language-for-school-students",
  };

  const collapsed = cleaned.replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  return aliases[collapsed] ?? collapsed;
};

/* -------------------------------------------
   HERO copy per course (used by the top section)
-------------------------------------------- */
const HERO_BY_CANONICAL: Record<string, { title: string; blurb: string }> = {
  "mastery-in-quran-reading": {
    title: "Mastery in Quran Reading",
    blurb:
      "This course takes students from beginner to advanced Quranic reading, focusing on pronunciation, Tajweed, and fluency. By the end, you’ll read the Quran confidently, accurately, and beautifully.",
  },
  "quran-memorization": {
    title: "Quran Hifz (Memorization)",
    blurb:
      "This course helps you memorize the entire Quran or selected portions through structured techniques, Tajweed, and revision. Whether a beginner or advanced, it guides you step-by-step, emphasizing discipline, consistency, and spiritual connection.",
  },
  "arabic-language-read-write-talk-and-understand": {
    title: "Arabic Language — Read, Write, Talk, and Understand",
    blurb:
      "This course is designed for intermediate learners to advance their Arabic skills, focusing on reading fluency, writing, conversation, and comprehension. By the end, students will confidently read, write, speak, and understand Arabic in formal and informal settings.",
  },
  "islamic-studies-islamic-etiquettes-and-manners": {
    title: "Islamic Studies — Islamic Etiquettes and Manners",
    blurb:
      "This course teaches Islamic etiquette (Adab) and manners, covering personal conduct, social interactions, and spiritual behavior. Based on the Quran, Hadith, and the Prophet’s life, it helps students improve their character and strengthen their relationship with Allah and others.",
  },
  "arabic-language-for-school-students": {
    title: "Arabic Language for School Students",
    blurb:
      "This course helps Gulf school students improve Arabic skills, focusing on reading, writing, speaking, and listening for academic and daily life. It integrates Emirati culture, building a strong foundation in Modern Standard Arabic (MSA) for effective communication.",
  },
};

/* -------------------------------------------
   1) Per-course DESCRIPTION (canonical lowercase keys)
-------------------------------------------- */
const DESCRIPTION_BY_CANONICAL: Record<string, string> = {
  "mastery-in-quran-reading":
    "This course is designed to take students from a beginner level to an advanced level in Quranic reading. It focuses on mastering the fundamentals of Quranic Arabic, including proper pronunciation, Tajweed rules, and fluency in recitation. Whether you’re a complete beginner or someone looking to refine your skills, this course provides a structured approach to help you achieve mastery in Quran reading. By the end of the course, you’ll be able to read the Quran with confidence, accuracy, and beauty.",
  "quran-memorization":
    "This course is designed for individuals who aspire to memorize the entire Quran or selected portions of it. It provides a structured and systematic approach to Hifz (memorization), focusing on effective techniques, proper Tajweed, and consistent revision. Whether you’re a beginner or already have some portions memorized, this course will guide you step-by-step to achieve your Hifz goals. The course emphasizes discipline, consistency, and spiritual connection with the Quran.",
  "arabic-language-read-write-talk-and-understand":
    "This course is tailored for intermediate learners who already have a basic understanding of Arabic and want to take their skills to the next level. It focuses on improving reading fluency, writing complex sentences, engaging in meaningful conversations, and understanding Arabic texts and audio. The course also covers advanced grammar rules and vocabulary to help learners communicate effectively in both formal and informal settings. By the end of the course, students will be able to read, write, speak, and understand Arabic with confidence.",
  "islamic-studies-islamic-etiquettes-and-manners":
    "This course focuses on the Islamic principles of etiquette (Adab) and manners, which are essential for leading a life in accordance with Islamic teachings. It covers a wide range of topics, including personal conduct, social interactions, and spiritual behavior. Students will learn how to apply these teachings in their daily lives to improve their character and strengthen their relationship with Allah and others. The course is based on the Quran, Hadith, and the exemplary life of the Prophet Muhammad (peace be upon him).",
  "arabic-language-for-school-students":
    "This course is designed to help school students in the Gulf improve their Arabic language skills, aligning with their academic needs and cultural context. It covers essential language skills such as reading, writing, speaking, and listening, with a focus on practical usage in both academic and daily life. The course also incorporates elements of Emirati culture and traditions to help students connect with their heritage. By the end of the course, students will have a strong foundation in Modern Standard Arabic (MSA) and the ability to communicate effectively in Arabic.",
};

/* -------------------------------------------
   2) Per-course FEATURES (override per slug, fallback to BASE)
-------------------------------------------- */
const FEATURES_BASE: CourseFeaturesTypes[] = [
  {
    key: "what-you-learn",
    title: "What You'll Learn",
    features: [
      { icon: BadgeCheck, label: "Correct pronunciation (Makharij) and Tajweed basics." },
      { icon: BadgeCheck, label: "Fluent, confident recitation and error correction." },
    ],
  },
  {
    key: "requirements",
    title: "Requirements",
    features: [
      { icon: BadgeCheck, label: "Basic understanding of Arabic (for intermediate levels) or no prior knowledge (for beginners)." },
      { icon: BadgeCheck, label: "A notebook and pen for practice (or a digital device for online courses)." },
      { icon: BadgeCheck, label: "A device with internet access (if the course is online).." },
      { icon: BadgeCheck, label: "Commitment to regular practice and participation." }, 
       { icon: BadgeCheck, label: "Willingness to learn and engage with the language." }, 
    ],
  },
  {
    key: "who-this-for",
    title: "Who This Course is For",
    features: [
      { icon: BadgeCheck, label: "Muslims who want to improve their character and manners." },
      { icon: BadgeCheck, label: "New Muslims (reverts) learning about Islamic etiquette." },
      { icon: BadgeCheck, label: "Parents who want to teach their children Islamic manners." },
      { icon: BadgeCheck, label: "Anyone interested in understanding the moral and ethical teachings of Islam." },
      { icon: BadgeCheck, label: "Individuals seeking to strengthen their relationship with Allah through good conduct." },
    ],
  },
];

const FEATURES_BY_CANONICAL: Partial<Record<string, CourseFeaturesTypes[]>> = {
  "mastery-in-quran-reading": [
    {
      key: "what-you-learn",
      title: "What You'll Learn",
      features: [
        { icon: BadgeCheck, label: "The correct pronunciation of Arabic letters (Makharij)." },
        { icon: BadgeCheck, label: "Rules of Tajweed (proper recitation of the Quran)." },
        { icon: BadgeCheck, label: "How to read the Quran fluently with proper rhythm and tone." },
        { icon: BadgeCheck, label: "Understanding the basics of Arabic phonetics." },
        { icon: BadgeCheck, label: "Transition from basic reading to advanced Quranic recitation." },
        { icon: BadgeCheck, label: "Memorization of selected Quranic verses (optional, depending on the course)." },
        { icon: BadgeCheck, label: "Developing confidence in reading the Quran independently." },

      ],
    },
    FEATURES_BASE[1],
    FEATURES_BASE[2],
  ],
  "quran-memorization": [
    {
      key: "what-you-learn",
      title: "What You'll Learn",
      features: [
        { icon: BadgeCheck, label: "Techniques for effective Quran memorization." },
        { icon: BadgeCheck, label: "How to retain and revise memorized portions (Sabaq and Sabqi)." },
        { icon: BadgeCheck, label: "Proper pronunciation and Tajweed while memorizing." },
        { icon: BadgeCheck, label: "Strategies to overcome challenges in memorization." },
        { icon: BadgeCheck, label: "Understanding the meaning and context of selected verses (optional, depending on the course)." },
        { icon: BadgeCheck, label: "Developing a lifelong connection with the Quran through memorization." },
      ],
    },
    {
      key: "requirements",
      title: "Requirements",
      features: [
        { icon: BadgeCheck, label: "Basic ability to read the Quran (if not, a beginner Quran reading course may be required first)." },
        { icon: BadgeCheck, label: "A copy of the Quran (Mushaf) for memorization." },
        { icon: BadgeCheck, label: "A device with internet access (if the course is online)." },
        { icon: BadgeCheck, label: "Commitment to daily memorization and revision." },
        { icon: BadgeCheck, label: "A quiet and dedicated space for memorization." },
        { icon: BadgeCheck, label: "Willingness to follow a structured schedule." },
      ],
    },
    {
      key: "who-this-for",
      title: "Who This Course is For",
      features: [
        { icon: BadgeCheck, label: "Individuals who want to memorize the entire Quran (Hafiz/Hafiza)." },
        { icon: BadgeCheck, label: "Those who want to memorize selected Surahs or portions of the Quran." },
         { icon: BadgeCheck, label: "Parents who want their children to start Hifz at a young age." },
          { icon: BadgeCheck, label: "Reverts to Islam who wish to connect deeply with the Quran." },
           { icon: BadgeCheck, label: "Anyone seeking spiritual growth through Quran memorization." },
      ],
    },
  ],
  "arabic-language-read-write-talk-and-understand": [
    {
      key: "what-you-learn",
      title: "What You'll Learn",
      features: [
        { icon: BadgeCheck, label: "Improve your reading fluency in Arabic." },
        { icon: BadgeCheck, label: "Enhance your writing skills for complex sentences and paragraphs." },
        { icon: BadgeCheck, label: "Develop conversational skills for real-life situations." },
         { icon: BadgeCheck, label: "Expand your vocabulary for advanced topics." },
          { icon: BadgeCheck, label: "Understand Arabic grammar in depth." },
           { icon: BadgeCheck, label: "Improve listening comprehension through dialogues and audio." },
           { icon: BadgeCheck, label: "Gain confidence in understanding Arabic texts and conversations." },
      ],
    },
    FEATURES_BASE[1],
    {
      key: "who-this-for",
      title: "Who This Course is For",
      features: [
        { icon: BadgeCheck, label: "Intermediate learners who already know some Arabic." },
        { icon: BadgeCheck, label: "Individuals who want to improve their Arabic for religious, academic, or professional purposes." },
         { icon: BadgeCheck, label: "Expats or travelers who want to communicate effectively in Arabic-speaking countries." },
          { icon: BadgeCheck, label: "Students who want to advance their understanding of Arabic grammar and vocabulary." },
           { icon: BadgeCheck, label: "Anyone looking to gain fluency in reading, writing, and speaking Arabic." },
      ],
    },
  ],
  "islamic-studies-islamic-etiquettes-and-manners": [
    {
      key: "what-you-learn",
      title: "What You'll Learn",
      features: [
        { icon: BadgeCheck, label: "The importance of good manners in Islam." },
        { icon: BadgeCheck, label: "Islamic etiquette for daily life (eating, drinking, dressing, etc.)." },
        { icon: BadgeCheck, label: "Manners of speech and communication." },
            { icon: BadgeCheck, label: "Respect and kindness towards parents, family, and neighbors." },
                { icon: BadgeCheck, label: "Etiquettes of visiting, traveling, and social interactions." },
                    { icon: BadgeCheck, label: "Islamic teachings on humility, patience, and gratitude." },
                        { icon: BadgeCheck, label: "How to implement Islamic manners in modern life." },
      ],
    },
    FEATURES_BASE[1],
    FEATURES_BASE[2],
  ],
  "arabic-language-for-school-students": [
    {
      key: "what-you-learn",
      title: "What You'll Learn",
      features: [
        { icon: BadgeCheck, label: "The Arabic alphabet and proper pronunciation." },
        { icon: BadgeCheck, label: "Basic and intermediate Arabic grammar." },
        { icon: BadgeCheck, label: "Vocabulary for everyday use and academic purposes."},
         { icon: BadgeCheck, label: "Reading and writing skills for school-level Arabic." },
          { icon: BadgeCheck, label: "Conversational Arabic for real-life situations." },
           { icon: BadgeCheck, label: "Listening and comprehension skills." },
           { icon: BadgeCheck, label: "Understanding Arab culture and traditions through the Arabic language." },
      ],
    },
    FEATURES_BASE[1],
    {
      key: "who-this-for",
      title: "Who This Course is For",
      features: [
        { icon: BadgeCheck, label: "School students in the Gulf want to improve their Arabic language skills." },
        { icon: BadgeCheck, label: "Students preparing for Arabic exams or academic assessments." },
          { icon: BadgeCheck, label: "Non-native Arabic speakers studying in Gulf schools." },
            { icon: BadgeCheck, label: "Parents who want to support their children’s Arabic language learning." },
              { icon: BadgeCheck, label: "Anyone interested in learning Arabic within the Arab cultural context." },
      ],
    },
  ],
};

/* -------------------------------------------
   3) Per-course CURRICULUM (content) & HIGHLIGHTS
-------------------------------------------- */
const CONTENT_BY_CANONICAL: Partial<Record<string, CourseContentDataTypes>> = {
  "mastery-in-quran-reading": {
    title: "Course Content",
    key: "curriculum",
    lectures: [
      {
        key: "intro",
        title: "Introduction to Quranic Arabic",
        items: [
          { label: "Arabic alphabet and letter recognition.", type: "video", duration: "" },
          { label: "Pronunciation of letters (Makharij).", type: "video", duration: "" },
          { label: "Short and long vowels (Harakat).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Basic",
        title: "Basic Quran Reading",
        items: [
          { label: "Joining letters to form words.", type: "video", duration: "" },
          { label: "Reading simple Quranic verses.", type: "video", duration: "" },
          { label: "Introduction to basic Tajweed rules.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Intermediate",
        title: "Intermediate Quran Reading",
        items: [
          { label: "Rules of Noon Sakinah and Tanween.", type: "video", duration: "" },
          { label: "Rules of Meem Sakinah.", type: "video", duration: "" },
          { label: "Rules of Madd (elongation).", type: "video", duration: "" },
          { label: "Reading longer verses with fluency.", type: "video", duration: "" }, 
        ],
        meta: undefined,
      },
      {
        key: "Advanced",
        title: "Advanced Quran Reading",
        items: [
          { label: "Advanced Tajweed rules.", type: "video", duration: "" },
          { label: "Rhythm and tone in recitation (Tarteel).", type: "video", duration: "" },
          { label: "Practice with complex Quranic verses.", type: "video", duration: "" },
          { label: "Tips for improving speed and accuracy.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Practice",
        title: "Practice and Application",
        items: [
          { label: "Recitation of selected Surahs (chapters) from the Quran.", type: "video", duration: "" },
          { label: "Feedback and correction from instructors.", type: "video", duration: "" },
          { label: "Memorization of short Surahs (optional).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Final",
        title: "Final Assessment",
        items: [
          { label: "Evaluation of recitation skills.", type: "video", duration: "" },
          { label: "Certification of completion (if applicable).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
    ],
  },
  "quran-memorization": {
    title: "Course Content",
    key: "curriculum",
    lectures: [
      {
        key: "plan",
        title: "Introduction to Quran Memorization",
        items: [
          { label: "Importance and virtues of Hifz.", type: "video", duration: "" },
          { label: "Setting realistic goals and expectations.", type: "video", duration: "" },
           { label: "Understanding the memorization process.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Memorization",
        title: "Memorization Techniques",
        items: [
          { label: "Breaking down verses into manageable portions.", type: "video", duration: "" },
          { label: "Repetition and auditory learning methods", type: "video", duration: "" },
          { label: "Visualization and association techniques.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Daily",
        title: "Daily Memorization Routine",
        items: [
          { label: "Memorizing new verses (Sabaq).", type: "video", duration: "" },
          { label: "Revising recently memorized portions (Sabqi).", type: "video", duration: "" },
          { label: "Long-term revision of older memorization (Manzil).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Tajweed",
        title: "Tajweed and Pronunciation",
        items: [
          { label: "Applying Tajweed rules while memorizing.", type: "video", duration: "" },
          { label: "Correcting common mistakes in pronunciation.", type: "video", duration: "" },
          { label: "Reciting memorized portions with proper rhythm and tone.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Revision",
        title: "Revision and Retention",
        items: [
          { label: "Strategies to retain memorized verses.", type: "video", duration: "" },
          { label: "Dealing with forgetfulness and challenges.", type: "video", duration: "" },
          { label: "Using revision charts and tracking progress.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Understanding",
        title: "Understanding the Quran (Optional)",
        items: [
          { label: "Learning the meaning and context of memorized verses.", type: "video", duration: "" },
          { label: "Connecting with the message of the Quran.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Final",
        title: "Final Assessment and Certification",
        items: [
          { label: "Evaluation of memorized portions.", type: "video", duration: "" },
          { label: "Certification of completion (if applicable).", type: "video", duration: "" },
        ],
        meta: undefined,
      },

    ],
  },
  "arabic-language-read-write-talk-and-understand": {
    title: "Course Content",
    key: "curriculum",
    lectures: [
      {
        key: "msa",
        title: "Reading Skills",
        items: [
          { label: "Reading intermediate-level texts (news articles, short stories, etc.).", type: "video", duration: "" },
          { label: "Understanding context and main ideas.", type: "video", duration: "" },
            { label: "Practicing reading fluency and speed.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Writing",
        title: "Writing Skills",
        items: [
          { label: "Writing complex sentences and paragraphs.", type: "video", duration: "" },
          { label: "Using conjunctions, prepositions, and advanced grammar.", type: "video", duration: "" },
           { label: "Writing essays, emails, and formal letters in Arabic.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Speaking",
        title: "Speaking Skills",
        items: [
          { label: "Engaging in real-life conversations (role-plays and dialogues).", type: "video", duration: "" },
          { label: "Practicing pronunciation and intonation.", type: "video", duration: "" },
           { label: "Discussing various topics (culture, travel, work, etc.).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Listening",
        title: "Listening Comprehension",
        items: [
          { label: "Listening to Arabic audio (dialogues, podcasts, news).", type: "video", duration: "" },
          { label: "Understanding different accents and dialects.", type: "video", duration: "" },
           { label: "Practicing comprehension through exercises.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Advanced",
        title: "Advanced Grammar",
        items: [
          { label: "Verb conjugations and patterns.", type: "video", duration: "" },
          { label: "Cases (I’rab) and sentence structure.", type: "video", duration: "" },
           { label: "Advanced noun and pronoun usage.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Vocabulary",
        title: "Vocabulary Expansion",
        items: [
          { label: "Learning advanced vocabulary for specific topics (politics, science, literature, etc.).", type: "video", duration: "" },
          { label: "Synonyms, antonyms, and word families.", type: "video", duration: "" },
           { label: "Idioms and expressions used in daily conversations.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Cultural",
        title: "Cultural Context",
        items: [
          { label: "Understanding cultural nuances in Arabic communication.", type: "video", duration: "" },
          { label: "Differences between Modern Standard Arabic (MSA) and dialects.", type: "video", duration: "" },
           { label: "Exploring Arabic literature and media.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Final",
        title: "Final Assessment",
        items: [
          { label: "Evaluation of reading, writing, speaking, and listening skills.", type: "video", duration: "" },
          { label: "oCertification of completion (if applicable).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
    ],
  },
  "islamic-studies-islamic-etiquettes-and-manners": {
    title: "Course Content",
    key: "curriculum",
    lectures: [
      {
        key: "adab",
        title: "Introduction to Islamic Etiquettes (Adab)",
        items: [
          { label: "The importance of good manners in Islam.", type: "video", duration: "" },
          { label: "The role of Adab in building a strong Muslim community.", type: "video", duration: "" },
           { label: "Examples of good manners from the life of the Prophet Muhammad (peace be upon him).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "practice",
        title: "Personal Etiquettes",
        items: [
          { label: "Cleanliness and hygiene (Taharah).", type: "video", duration: "" },
          { label: "Dressing modestly and according to Islamic guidelines.", type: "video", duration: "" },
           { label: "Etiquettes of eating and drinking.", type: "video", duration: "" },
            { label: "Sleeping and waking up according to Sunnah.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Social",
        title: "Social Etiquettes",
        items: [
          { label: "Respecting parents and elders.", type: "video", duration: "" },
          { label: "Kindness to neighbors and guests.", type: "video", duration: "" },
           { label: "Manners of visiting and hosting.", type: "video", duration: "" },
            { label: "Etiquettes of social gatherings.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Communication",
        title: "Communication Etiquettes",
        items: [
          { label: "Speaking truthfully and avoiding gossip.", type: "video", duration: "" },
          { label: "Using kind and respectful words.", type: "video", duration: "" },
           { label: "Listening attentively and avoiding interruptions.", type: "video", duration: "" },
            { label: "Etiquettes of giving and receiving advice.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Spiritual",
        title: "Spiritual Etiquettes",
        items: [
          { label: "Humility and avoiding arrogance.", type: "video", duration: "" },
          { label: "Patience and gratitude in all situations.", type: "video", duration: "" },
           { label: "Forgiveness and controlling anger.", type: "video", duration: "" },
            { label: "Maintaining good intentions (Niyyah) in all actions.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Etiquettes",
        title: "Etiquettes of Traveling",
        items: [
          { label: "Duas and Sunnah practices for traveling.", type: "video", duration: "" },
          { label: "Respecting local customs and cultures.", type: "video", duration: "" },
           { label: "Helping others and being mindful of safety.", type: "video", duration: "" },
           
        ],
        meta: undefined,
      },
        {
        key: "Implementing",
        title: "Implementing Islamic Manners in Modern Life",
        items: [
          { label: "Balancing Islamic teachings with contemporary challenges.", type: "video", duration: "" },
          { label: "Teaching Adab to children and family members.", type: "video", duration: "" },
           { label: "Being a role model for good manners in society.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
        {
        key: "Final",
        title: "Final Assessment",
        items: [
          { label: "Evaluation of understanding and application of Islamic etiquettes.", type: "video", duration: "" },
          { label: "Certification of completion (if applicable).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      
    ],
  },
  "arabic-language-for-school-students": {
    title: "Course Content",
    key: "curriculum",
    lectures: [
      {
        key: "school",
        title: "Introduction to Arabic",
        items: [
          { label: "The Arabic alphabet and pronunciation (Makharij).", type: "video", duration: "" },
          { label: "Short and long vowels (Harakat).", type: "video", duration: "" },
           { label: "Basic greetings and phrases.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
      {
        key: "Basic",
        title: "Basic Arabic Grammar",
        items: [
          { label: "Nouns, pronouns, and their types.", type: "video", duration: "" },
          { label: "Introduction to verbs and tenses.", type: "video", duration: "" },
           { label: "Sentence structure (Subject-Verb-Object).", type: "video", duration: "" },
            { label: "Gender and number in Arabic.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
       {
        key: "Vocabulary",
        title: "Vocabulary Building",
        items: [
          { label: "Everyday vocabulary (family, school, food, travel, etc.).", type: "video", duration: "" },
          { label: "Academic vocabulary for school subjects.", type: "video", duration: "" },
           { label: "Common phrases for conversations.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
       {
        key: "Reading",
        title: "Reading and Writing",
        items: [
          { label: "Forming words and sentences.", type: "video", duration: "" },
          { label: "Reading simple texts and stories.", type: "video", duration: "" },
           { label: "Writing practice (letters, words, and sentences).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
       {
        key: "Listening",
        title: "Listening and Speaking",
        items: [
          { label: "Listening to Arabic dialogues and audio.", type: "video", duration: "" },
          { label: "Practicing speaking through role-plays.", type: "video", duration: "" },
           { label: "Understanding Emirati accents and dialects.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
       {
        key: "Cultural",
        title: "Cultural Context",
        items: [
          { label: "Introduction to Arab culture and traditions.", type: "video", duration: "" },
          { label: "Differences between Modern Standard Arabic (MSA) and Emirati dialect.", type: "video", duration: "" },
           { label: "Exploring Emirati literature and media.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
       {
        key: "Academic",
        title: "Academic Arabic",
        items: [
          { label: "Reading and understanding school textbooks.", type: "video", duration: "" },
          { label: "Writing essays and reports in Arabic.", type: "video", duration: "" },
           { label: "Preparing for Arabic exams and assessments.", type: "video", duration: "" },
        ],
        meta: undefined,
      },
       {
        key: "Final",
        title: "Final Assessment",
        items: [
          { label: "Evaluation of reading, writing, speaking, and listening skills.", type: "video", duration: "" },
          { label: "Certification of completion (if applicable).", type: "video", duration: "" },
        ],
        meta: undefined,
      },
    ],
  },
};

const HIGHLIGHTS_BASE: CourseHighlighDataTypes[] = [
  { key: "level", label: "Level", icon: ChartNoAxesCombined, value: "Beginner" },
  { key: "lecture-total-duration", label: "Class Duration", icon: Clock, value: "30-60 min" },
  { key: "course-duration", label: "Course Duration", icon: CalendarClock, value: "4-6 Months" },
  { key: "mode", label: "Mode", icon: FaLaptop, value: "Online" },
  { key: "age-group", label: "Age Group", icon: IoIosPeople, value: "Kids and Adults" },
];

const HIGHLIGHTS_BY_CANONICAL: Partial<Record<string, CourseHighlighDataTypes[]>> = {
  "quran-memorization": [
    { key: "level", label: "Level", icon: ChartNoAxesCombined, value: "Beginner–Advanced" },
    { key: "lecture-total-duration", label: "Class Duration", icon: Clock, value: "30–60 min" },
    { key: "course-duration", label: "Course Duration", icon: CalendarClock, value: "Flexible / Goal-based" },
    { key: "mode", label: "Mode", icon: FaLaptop, value: "Online" },
    { key: "age-group", label: "Age Group", icon: IoIosPeople, value: "Kids and Adults" },
  ],
  "arabic-language-read-write-talk-and-understand": [
    { key: "level", label: "Level", icon: ChartNoAxesCombined, value: "Intermediate" },
    { key: "lecture-total-duration", label: "Class Duration", icon: Clock, value: "45–60 min" },
    { key: "course-duration", label: "Course Duration", icon: CalendarClock, value: "3–6 Months" },
    { key: "mode", label: "Mode", icon: FaLaptop, value: "Online" },
    { key: "age-group", label: "Age Group", icon: IoIosPeople, value: "Teens & Adults" },
  ],
  "arabic-language-for-school-students": [
    { key: "level", label: "Level", icon: ChartNoAxesCombined, value: "School Grades" },
    { key: "lecture-total-duration", label: "Class Duration", icon: Clock, value: "30–45 min" },
    { key: "course-duration", label: "Course Duration", icon: CalendarClock, value: "Term-based" },
    { key: "mode", label: "Mode", icon: FaLaptop, value: "Online" },
    { key: "age-group", label: "Age Group", icon: IoIosPeople, value: "Students" },
  ],
};

/* -------------------------------------------
   4) Component
-------------------------------------------- */
export default function CourseDetailsClient({ slug }: Props) {
  const key = normalize(slug);

  // 1) Description
  const description =
    DESCRIPTION_BY_CANONICAL[key] ?? DESCRIPTION_BY_CANONICAL["mastery-in-quran-reading"];

  const COURSE_DESCRIPTION_DATA: CourseDescriptionTypes = {
    title: "Description",
    content: description,
  };

  // 2) Features
  const COURSE_FEATURES =
    FEATURES_BY_CANONICAL[key] ?? FEATURES_BASE;

  // 3) Content (Curriculum)
  const COURSE_CONTENT_DATA: CourseContentDataTypes =
    CONTENT_BY_CANONICAL[key] ??
    {
      title: "Course Content",
      key: "curriculum",
      lectures: [
        {
          key: "default-1",
          title: "Getting Started",
          items: [
            { label: "Introduction", type: "video", duration: "" },
            { label: "Course Overview", type: "video", duration: "" },
          ],
          meta: undefined,
        },
      ],
    };

  // 4) Highlights
  const COURSE_HIGHLIGHT_DATA: CourseHighlighDataTypes[] =
    HIGHLIGHTS_BY_CANONICAL[key] ?? HIGHLIGHTS_BASE;

  // ✅ Pick hero copy and pass into the hero component
  const hero = HERO_BY_CANONICAL[key] ?? HERO_BY_CANONICAL["mastery-in-quran-reading"];

  return (
    <React.Fragment>
      <div aria-describedby="course-details-page">
        <section className="py-12 sm:py-20 bg-regal-blue-500">
          <div className="container">
            <CourseDetailsHero
              title={hero.title}
              blurb={hero.blurb}
              ctaHref="/trial"
              ctaLabel="Get Started"
            />
          </div>
        </section>

        <section className="py-20 bg-neutral-100">
          <div className="container">
            <div className="max-w-max flex items-center flex-wrap gap-3 -mt-26 mb-16">
              <CourseHighlightBox data={COURSE_HIGHLIGHT_DATA} />
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-8 w-full">
              {/* Left Column */}
              <div className="flex-1 w-full space-y-8">
                <CourseDescription data={COURSE_DESCRIPTION_DATA} />
                <CourseFeatureBox data={COURSE_FEATURES} />
                <CourseContentBox data={COURSE_CONTENT_DATA} />
              </div>

              {/* Right Column */}
              <div className="shrink-0 sm:w-105 w-full lg:sticky top-3 max-h-screen overflow-y-auto">
                <div className="space-y-8">
                  <CoursePriceCard />
                  <CourseIncludesBox />
                </div>
              </div>
            </div>
          </div>
        </section>

        <GetTrialClass />
        <CoursesFaqSection />
      </div>
    </React.Fragment>
  );
}
