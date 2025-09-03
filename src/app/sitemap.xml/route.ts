import { NextResponse } from "next/server";

const urls = [
  { loc: "https://bayyinah.academy/", priority: "1.00" },
  { loc: "https://bayyinah.academy/courses", priority: "0.80" },
  { loc: "https://bayyinah.academy/pricing", priority: "0.80" },
  { loc: "https://bayyinah.academy/blogs", priority: "0.80" },
  { loc: "https://bayyinah.academy/about-us", priority: "0.80" },
  { loc: "https://bayyinah.academy/our-teachers", priority: "0.80" },
  { loc: "https://bayyinah.academy/career", priority: "0.80" },
  { loc: "https://bayyinah.academy/trial", priority: "0.80" },
  { loc: "https://bayyinah.academy/blogs/Ramadan-Month-Reflection-and-Renewal", priority: "0.80" },
  { loc: "https://bayyinah.academy/blogs/Shaban-Month-Preparation-and-Spiritual", priority: "0.80" },
  { loc: "https://bayyinah.academy/blogs/Rajab-Month-Divine-Mercy-and-Awakening", priority: "0.80" },
  { loc: "https://bayyinah.academy/blogs/Shawwal-Month-Gratitude-and-Continuity", priority: "0.80" },
  { loc: "https://bayyinah.academy/courses/Mastery-in-Quran-Reading", priority: "0.80" },
  { loc: "https://bayyinah.academy/courses/Quran-Memorization", priority: "0.80" },
  { loc: "https://bayyinah.academy/courses/Arabic-Language-Read-Write-Speak-and-Understand", priority: "0.80" },
  { loc: "https://bayyinah.academy/courses/Islamic-Studies-Islamic-Etiquettes-and-Manners", priority: "0.80" },
  { loc: "https://bayyinah.academy/testimonials", priority: "0.80" },
  { loc: "https://bayyinah.academy/faqs", priority: "0.80" },
  { loc: "https://bayyinah.academy/sitemap", priority: "0.80" },
  { loc: "https://bayyinah.academy/contact-us", priority: "0.80" },
  { loc: "https://bayyinah.academy/terms-of-services", priority: "0.80" },
  { loc: "https://bayyinah.academy/privacy-policy", priority: "0.80" },
  { loc: "https://bayyinah.academy/courses/Arabic-Language-for-School-Students", priority: "0.64" },
  { loc: "https://bayyinah.academy/student-form", priority: "0.64" },
  { loc: "https://bayyinah.academy/teacher-form", priority: "0.64" },
  { loc: "https://bayyinah.academy/all-teachers", priority: "0.64" },
  { loc: "https://bayyinah.academy/courses/quran-memorization", priority: "0.64" },
  { loc: "https://bayyinah.academy/courses/mastery-in-quran-reading", priority: "0.64" },
];

const lastmod = "2025-09-03T06:40:16+00:00";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
