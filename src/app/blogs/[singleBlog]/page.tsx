
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import PageHeroSection from "@/components/common/PageHeroSection";
import RelatedBlogCard from "@/components/common/RelatedBlogCard";
import { SubscribeNewsletter } from "@/components/homepage";
import { BLOGS, getBlogBySlug } from "@/data/blogs"; 

type Props = { params: Promise<{ singleBlog: string }> };

const sanitize = (s?: string) => (s ?? "").replace(/[\u200B-\u200D\uFEFF]/g, "");


export function generateStaticParams() {
  return BLOGS.map((b) => ({ singleBlog: b.slug }));
}

// SEO (safe against missing params)
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const slug = sanitize(resolvedParams.singleBlog);
  const blog = slug ? getBlogBySlug(slug) : undefined;
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.shortDescription,
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.shortDescription,
      images: [{ url: blog.featureImage.url }],
    },
  };
}

// Markdown renderer with support for bold text
function Body({ content }: { content: string }) {
  const blocks = content
    .trim()
    .split(/\n+/) // split on any newline(s) for reliable spacing
    .map((p) => p.trim())
    .filter(Boolean);

  const renderMarkdown = (text: string) => {
    // Handle bold text (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts: Array<string | React.ReactNode> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  return (
    <article className="max-w-none">
      {blocks.map((p, i) => {
        // Treat lines starting with "## " as headings
        if (/^##\s+/.test(p)) {
          return (
            <h3 key={i} className="mt-8 mb-3 text-2xl font-semibold leading-tight">
              {renderMarkdown(p.replace(/^##\s+/, ""))}
            </h3>
          );
        }
        // Default paragraph
        return (
          <p key={i} className="my-4 leading-relaxed text-left" dir="ltr">
            {renderMarkdown(p)}
          </p>
        );
      })}
    </article>
  );
}



export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = sanitize(resolvedParams.singleBlog);
  if (!slug) return notFound();

  const blog = getBlogBySlug(slug);
  if (!blog) return notFound();

  const humanDate = new Date(blog.publishAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const related = BLOGS.filter((b) => b.slug !== blog.slug)
    .slice(0, 3)
    .map((b) => ({
      featureImage: b.featureImage,
      publishAt: new Date(b.publishAt).toLocaleDateString(),
      title: b.title,
      shortDescription: b.shortDescription,
      action: { url: `/blogs/${b.slug}`, label: "Read More" },
    }));

  return (
    <>
      <div aria-describedby="blog-detail-page">
        <PageHeroSection title={blog.title} />

        <section className="py-10 sm:py-20 bg-white" aria-describedby="blog-detail-section">
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div aria-describedby="content-wrapper">
                <div className="flex flex-col items-center justify-center mb-11" aria-describedby="top-content">
                  <h6 className="text-lg sm:text-xl font-medium text-neutral-900 text-center mb-5">
                    {blog.shortDescription}
                  </h6>
                  <h2 className="text-4xl sm:text-5xl font-medium text-neutral-800 text-center mb-7">
                    {blog.title}
                  </h2>
                  <div className="bg-[#CFE9FA] border border-[#C1DDEF] rounded-full py-2.5 px-5 max-w-max">
                    <p className="text-sm font-medium text-neutral-800 text-center">Published: {humanDate}</p>
                  </div>
                </div>

                <div aria-describedby="blog-content">
                  <div className="flex items-center mb-9 sm:mb-15" aria-describedby="featured-image">
                    <Image
                      src={blog.featureImage.url}
                      width={blog.featureImage.width}
                      height={blog.featureImage.height}
                      alt={blog.featureImage.alt}
                      className="aspect-video w-full rounded-2xl object-cover"
                      priority
                    />
                  </div>

                  <Body content={blog.content} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-17 bg-white" aria-describedby="related-post-section">
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div className="flex items-center justify-center mb-12" aria-describedby="title">
                <h3 className="text-4xl sm:text-5xl font-bold text-neutral-800 text-center">Related Post</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-describedby="related-blog-card-wrapper">
                <RelatedBlogCard data={related} />
              </div>
            </div>
          </div>
        </section>

        <SubscribeNewsletter />
      </div>
    </>
  );
}
