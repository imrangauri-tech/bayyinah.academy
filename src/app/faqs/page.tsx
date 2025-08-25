import PageHeroSection from "@/components/common/PageHeroSection";
import React from "react";
import SearchForm from "./SearchForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqAccordion from "./FaqAccordion";
import QuestionForm from "./QuestionForm";

const FAQ_TAB_LISTS = [
  { label: "About the Academy", value: "about" },
  { label: "Courses & Teaching", value: "courses" },
  { label: "Scheduling & Access", value: "access" },
  { label: "Fees & Enrollment", value: "enrollment" },
  { label: "Teachers", value: "teachers" },
];

/** Fallback if a tab has no custom list (won't be used) */
const FAQ_DATA = [{ question: "What age group is this course designed for?", answer: "…" }];

type QA = { question: string; answer: string };

/* -------------------- BASE CONTENT (your existing lists) -------------------- */
/** About the Academy */
const ABOUT_BASE: QA[] = [
  { question: "What is Bayyinah Academy?", answer: "Bayyinah Academy is an online platform providing live Quran, Arabic, and Islamic Studies classes for students of all ages." },
  { question: "What makes your academy unique?", answer: "We offer personalised learning, flexible scheduling, and a values-based approach with experienced tutors." },
  { question: "Who operates the Academy?", answer: "Our team includes dedicated educators and administrators focused on Islamic education and student well-being." },
  { question: "Where are you located?", answer: "We are based in the UK with a remote office in Dubai, serving students worldwide." },
  { question: "Can I try a class before enrolling?", answer: "Yes, we offer a free 30-minute trial session to help you explore our teaching approach." },
  { question: "What is the ideal age to start classes?", answer: "We recommend starting Quran classes as early as 4 years old, depending on the child's readiness and attention span." },
  { question: "Are Bayyinah Academy classes secure?", answer: "Yes, Bayyinah Academy takes security seriously and follows several important protocols to protect students and their data." },
  { question: "How can I contact Bayyinah Academy?", answer: "Reach out via our website contact form, WhatsApp, or email at support@bayyinah.academy." },
  { question: "How quickly do you respond?", answer: "We aim to reply within 24 hours on working days." },
  { question: "Can I talk to a tutor before enrolling?", answer: "Yes, book a free trial to interact with a tutor." },
  { question: "Do you support international time zones?", answer: "Yes, our admin and teaching teams operate across multiple regions." },
  { question: "Can I leave feedback or a complaint?", answer: "Yes, we highly value your feedback and take all concerns seriously." },
  { question: "How do I get help in urgent cases?", answer: "Use WhatsApp or write 'URGENT' in your email subject for priority assistance." },
  { question: "Are your testimonials genuine?", answer: "Yes. All reviews are from real students and parents." },
  { question: "Can I send in my review?", answer: "Yes. Share your feedback via email or form." },
  { question: "Do you publish video testimonials?", answer: "Yes, with consent from the parent or student." },
  { question: "How do you collect feedback?", answer: "Via forms after classes, check-ins, or completion of a course." },
  { question: "Do testimonials reflect current staff?", answer: "Yes, we ensure they relate to active tutors." },
  { question: "Are all reviews published?", answer: "We publish selected reviews to help guide others." },
];

/** Courses & Teaching */
const COURSES_BASE: QA[] = [
  { question: "Are your instructors qualified?", answer: "Yes. All instructors undergo a selection process and are trained in both subject and teaching methodology." },
  { question: "What subjects do you offer?", answer: "Courses include Quran Reading, Tajweed, Hifz, Arabic, and Islamic Studies." },
  { question: "Are these classes based on age or level?", answer: "Yes. Courses are designed for different age groups and skill levels." },
  { question: "Can I take more than one course at a time?", answer: "Yes, you can customise your plan to include multiple subjects." },
  { question: "How long are the courses?", answer: "Courses are structured monthly but continue based on your chosen schedule." },
  { question: "Can I start anytime?", answer: "Yes, enrollment is open year-round." },
  { question: "Are different languages used?", answer: "Yes, we offer instruction in multiple languages to accommodate diverse student needs." },
  { question: "What application do I need for classes?", answer: "You'll need Microsoft Teams or Zoom for live classes." },
  { question: "What does the Quran course cover?", answer: "It includes reading, Tajweed, Makharij and basic understanding." },
  { question: "What skills are taught in Arabic classes?", answer: "Reading, writing, grammar, and conversation." },
  { question: "What is taught in Islamic Studies?", answer: "Subjects include Aqeedah, Seerah and Akhlaaq." },
  { question: "Is the curriculum authentic?", answer: "Yes. All lessons are based on reliable Islamic sources." },
  { question: "Will I get reports on student progress?", answer: "Yes. Feedback and progress reports are shared regularly based on the course enrolled." },
  { question: "Are certificates given?", answer: "Yes, certificates are awarded upon course completion as per the enrolled program." },
  { question: "How long and frequent are the classes?", answer: "Class duration and frequency depend on your selected plan and schedule preferences." },
  { question: "What topics are covered in your blog?", answer: "Our blog features Islamic knowledge and essential teachings to help families grow in faith and understanding." },
  { question: "How often is new content posted?", answer: "We update the blog regularly with relevant, engaging content." },
  { question: "Who writes your blog posts?", answer: "Our content is written by our educators and guest contributors with expertise in Islamic and educational fields." },
  { question: "Can I share your blog articles?", answer: "Yes, you are welcome to share our blog articles with proper attribution." },
  { question: "Can I suggest a topic?", answer: "Yes. Submit your ideas via our contact page." },
  { question: "Is the blog suitable for families?", answer: "Yes, all posts follow a family-friendly and Islamic tone." },
];

/** Scheduling & Access */
const ACCESS_BASE: QA[] = [
  { question: "What happens after I book a trial?", answer: "You receive a confirmation, and our admin team schedules the class." },
  { question: "Is the trial really free?", answer: "Yes. No payment or commitment is required." },
  { question: "Can I choose the trial timing?", answer: "Yes. We offer flexible scheduling." },
  { question: "Do I need to prepare anything?", answer: "Just a quiet space, a laptop or computer, stable internet, and headphones with a mic if needed." },
  { question: "What if I want to continue after the trial?", answer: "You can enroll in any of our courses after the trial. Our team will guide you through the enrollment process." },
  { question: "Can I give feedback after my trial?", answer: "Yes. We welcome feedback to improve our service." },
  { question: "What equipment do I need to teach?", answer: "A laptop or computer with stable internet and headphones with a mic; mobile phones are not allowed." },
  { question: "How do I access or manage online class tools?", answer: "You will receive step-by-step guidance after registration. We'll help you install and use Microsoft Teams and other tools like Zoom. Our support team is always available to assist you." },
];

/** Fees & Enrollment */
const ENROLLMENT_BASE: QA[] = [
  { question: "What are the tuition fees?", answer: "Fees depend on class type, subject, and how often you take lessons — with competitive monthly and hourly options available." },
  { question: "Are there any hidden charges?", answer: "No. All charges are included in your selected plan." },
  { question: "Do you offer any discounts?", answer: "Yes. We offer family discounts (5% off) when two or more siblings join the same course." },
  { question: "Is monthly payment available?", answer: "Yes. All plans are billed every four weeks on the 28th of each month in advance." },
  { question: "Can I change my package later?", answer: "Yes. Upgrades or adjustments are possible with admin support." },
  { question: "Do you offer refunds?", answer: "Refunds depend on our Terms & Conditions. Contact support for more details." },
  { question: "Is online payment safe?", answer: "Yes, all payments are processed through secure and trusted payment gateways." },
];

const TEACHERS_BASE: QA[] = [
  { question: "How are your teachers hired?", answer: "Through a multi-step selection process involving demo sessions and background checks." },
  { question: "Are teachers trained for child instruction?", answer: "Yes. Many specialise in early childhood and teen learning." },
  { question: "Can I select a preferred tutor?", answer: "Yes. We try to match you accordingly and allow future changes." },
  { question: "Where are your teachers located?", answer: "They are from various countries including UK, Egypt, India, and Gulf countries." },
  { question: "Can I choose a male or female tutor?", answer: "Yes. We respect student preferences wherever possible." },
  { question: "Do teachers speak multiple languages?", answer: "Our teachers support English and Arabic. More languages may be added soon." },
  { question: "How good is the teacher's English?", answer: "Our teachers are well-trained and can communicate clearly in English, especially with children and non-Arabic-speaking students." },
  { question: "How do I apply to teach with Bayyinah Academy?", answer: "Apply using our Teacher Application Form. Shortlisted candidates will be contacted for a demo." },
  { question: "What are the teaching expectations?", answer: "Punctuality, commitment, Islamic etiquette, and professionalism are essential." },
  { question: "What equipment do I need to teach?", answer: "A laptop or computer with stable internet and headphones with a mic; mobile phones are not allowed." },
  { question: "What conduct is expected during class?", answer: "Teachers must remain professional, respectful, and focused during every session." },
  { question: "Can I reschedule or cancel a class?", answer: "Yes, but with at least 24 hours' notice to the Admin Team." },
  { question: "How is teaching quality monitored?", answer: "Through feedback, class recordings, and parent communication." },
  { question: "Can I request more students or adjust teaching load?", answer: "Yes, teachers can request more students or adjust their teaching hours based on availability. Please contact the admin team to discuss your preferences and scheduling options." },
  { question: "What should I do in case of a salary issue or delay?", answer: "If you face any salary issue or delay, please contact the Admin or Accounts team immediately. We are committed to resolving payment matters promptly and fairly." },
  { question: "Can I take a vacation or adjust my schedule?", answer: "Yes, you can request a vacation or schedule change in advance. Please inform the admin at least 7 days before to help us manage class arrangements smoothly." },
];

/* -------------------- FINAL MERGES PER TAB -------------------- */
const ABOUT_ALL = ABOUT_BASE;
const COURSES_ALL = COURSES_BASE;
const ACCESS_ALL = ACCESS_BASE;
const ENROLLMENT_ALL = ENROLLMENT_BASE;
const TEACHERS_ALL = TEACHERS_BASE;

/** Use this mapping in the UI, unchanged */
const FAQ_DATA_BY_TAB: Record<string, QA[]> = {
  about: ABOUT_ALL,
  courses: COURSES_ALL,
  access: ACCESS_ALL,
  enrollment: ENROLLMENT_ALL,
  teachers: TEACHERS_ALL,
};

const FaqPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="faq-page">
        <PageHeroSection
          title="FAQ"
          description="Find quick answers to common questions about enrollment, courses, and support, everything you need to start your Qurani and Arabic journey with ease!"
        />

        <section aria-describedby="faq-section" className="bg-neutral-100 py-10 sm:py-18">
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div
                aria-describedby="top-content"
                className="flex items-center justify-center flex-col gap-y-6 mb-12"
              >
                <h3 className="text-4xl sm:text-5xl font-bold text-neutral-800 text-center transition-all duration-500 ease-out hover:scale-105 transform">
                  Got Questions?
                </h3>
                <p className="text-lg sm:text-xl font-medium text-neutral-700 text-center transition-all duration-500 ease-out hover:scale-105 hover:text-neutral-800 transform">
                  We've Got Answers
                </p>

                <div aria-describedby="search-form-wrapper">
                  <SearchForm />
                </div>
              </div>

              <div aria-describedby="faq-tab">
                <Tabs defaultValue={FAQ_TAB_LISTS[0].value}>
                  <TabsList className="mx-auto">
                    {FAQ_TAB_LISTS.map((tab) => (
                      <TabsTrigger 
                        key={tab.value} 
                        value={tab.value} 
                        className="bg-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {FAQ_TAB_LISTS.map((tab) => (
                    <TabsContent value={tab.value} key={tab.value}>
                      <FaqAccordion faqData={FAQ_DATA_BY_TAB[tab.value] ?? FAQ_DATA} />
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <section aria-describedby="other-question-section" className="py-10 sm:py-18 bg-white">
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div
                aria-describedby="content-wrapper"
                className="group py-9 px-6 bg-regal-blue-500 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-200/50 cursor-pointer"
              >
                <div aria-describedby="title" className="mb-10 sm:mb-12">
                  <h3 className="text-4xl sm:text-5xl text-white font-bold text-center transition-all duration-500 ease-out hover:scale-105 transform">
                    Any other Question?
                  </h3>
                </div>

                <div
                  aria-describedby="question-form-wrapper"
                  className="max-w-217 w-full mx-auto flex flex-col justify-center items-center"
                >
                  <QuestionForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default FaqPage;
