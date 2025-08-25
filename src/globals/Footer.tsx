"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { Mail, MapPin, PhoneCall } from "lucide-react";

// Subscribe Form Schema
const formSchema = z.object({
  email: z.string().email(),
});

export const FooterSubscribeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email.trim()
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setSubmitted(true);
        form.reset();
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-x-2 h-14">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="bg-white text-black h-12 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg transform"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#FAAF2F] hover:bg-[#e89b1e] text-black px-6 h-12 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </div>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      
      {submitted && (
        <p className="text-green-600 text-sm mt-2">✅ Thanks for subscribing to our newsletter!</p>
      )}
      
      {error && (
        <p className="text-red-600 text-sm mt-2">❌ {error}</p>
      )}
    </Form>
  );
};

export const SocialLists = () => {
  const SOCIAL_LISTS = [
    { key: "facebook", icon: FaFacebookF, url: "https://www.facebook.com/LearnWithBayyinah" },
    { key: "linkedin", icon: FaLinkedinIn, url: "https://www.linkedin.com/company/bayyinahacademy" },
    { key: "instagram", icon: FaInstagram, url: "https://www.instagram.com/learnwithbayyinah" },
    { key: "youtube", icon: FaYoutube, url: "https://www.youtube.com/@LearnWithBayyinah" },
    { key: "pinterest", icon: FaPinterest, url: "https://uk.pinterest.com/LearnwithBayyinah" },
  ];

  return (
    <ul className="flex items-center gap-x-3 gap-y-4">
      {SOCIAL_LISTS.map(({ icon: Icon, key, url }) => (
        <li className="flex w-max" key={key}>
          <Link
            href={url}
            aria-label={key}
            className="text-sm text-white bg-regal-blue-500 p-2 rounded-full flex items-center justify-center w-max transition-all ease-in-out duration-300 hover:bg-regal-blue-600 hover:scale-110 hover:shadow-lg group/social-link transform"
          >
            <Icon className="transition-transform ease-in-out duration-200 group-hover/social-link:scale-125" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const FooterNavigation = () => {
  const FOOTER_NAV_ITEMS = [
    {
      key: "Courses",
      lists: [
        { label: "Quran Tajweed", url: "/courses/Mastery-in-Quran-Reading" },
        { label: "Quran Hifz", url: "/courses/Quran-Memorization" },
        { label: "Arabic Language", url: "/courses/Arabic-Language-Read-Write-Speak-and-Understand" },
        { label: "Islamic Studies", url: "/courses/Islamic-Studies-Islamic-Etiquettes-and-Manners" },
      ],
    },
    {
      key: "Explore",
      lists: [
        { label: "About us", url: "/about-us" },
        { label: "Blog", url: "/blogs" },
        { label: "Teachers", url: "/our-teachers" },
        { label: "Testimonials", url: "/testimonials" },
        { label: "FAQ", url: "/faqs" },
        { label: "Career", url: "/career" },
        { label: "Sitemap", url: "/sitemap" },
        { label: "Contact us", url: "/contact-us" },
      ],
    },
  ];

  return (
    <React.Fragment>
      {FOOTER_NAV_ITEMS.map((nav) => (
        <ul className="flex flex-col gap-y-4" key={nav.key}>
          <h4 className="text-xl font-bold text-neutral-800 uppercase">{nav.key}</h4>
          {nav.lists.map((list, index) => (
            <li key={index}>
              <Link
                href={list.url}
                className="text-lg font-normal text-neutral-800 transition-all ease-in-out duration-300 hover:text-sky-blue-500 hover:scale-105 transform"
              >
                {list.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </React.Fragment>
  );
};

export const ContactLists = () => {
  const CONTACT_LISTS = [
    {
      key: "email",
      label: "support@bayyinah.academy",
      url: "mailto:support@bayyinah.academy",
      icon: Mail,
    },
    {
      key: "phone",
      label: "+44 77 0018 3406",
      url: "tel:+447700183406",
      icon: PhoneCall,
    },
    {
      key: "location",
      label: "85 Great Portland Street, First Floor, England, W1W 7LT, London, United Kingdom",
      url: "https://maps.app.goo.gl/pg94BVUuYVQPzqYv9",
      icon: MapPin,
    },
  ];

  return (
    <div>
      <h4 className="text-xl mb-4 font-bold text-neutral-800 uppercase">Get In Touch</h4>
      <ul className="flex flex-col gap-y-4">
        {CONTACT_LISTS.map((contact) => (
          <li className="flex" key={contact.key}>
            <Link
              href={contact.url}
              target={contact.key === "location" ? "_blank" : "_self"}
              className="flex items-start gap-x-2 group/contact-item transition-all duration-300 ease-out hover:scale-105 transform"
            >
              <span className="bg-white p-2 border border-[#F3F3F3] shadow-sm rounded-full transition-all duration-300 ease-out group-hover/contact-item:border-sky-blue-500 group-hover/contact-item:scale-110 transform">
                <contact.icon className="w-4 h-4 text-regal-blue-500" />
              </span>
              <p className="text-lg text-neutral-800 transition-colors duration-300 ease-out group-hover/contact-item:text-sky-blue-500">
                {contact.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <React.Fragment>
      <footer aria-describedby="main-footer">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-x-16 gap-y-10 py-12">
            <div>
              <div className="w-48 mb-12">
                <Link href="/" className="block cursor-pointer">
                  <Image
                    src={"/Bayyinah Logo.webp"}
                    width={520}
                    height={162}
                    alt="Bayyinah logo"
                    priority
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>

              <div className="mb-8">
                <FooterSubscribeForm />
              </div>

              <div className="mb-12">
                <SocialLists />
              </div>

              {/* ✅ WhatsApp Button above App Download */}
              <div className="mb-8 w-full">
                <Link
                  href="https://api.whatsapp.com/send?phone=447700183406&text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20courses"
                  target="_blank"
                  className="flex items-center gap-x-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-medium text-base w-max shadow-md hover:bg-[#1DA851] transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                >
                  <ImWhatsapp className="text-xl transition-transform duration-300 ease-out group-hover:scale-110" />
                  Chat with us on WhatsApp
                </Link>
              </div>

              <div className="flex flex-col gap-y-3">
                <h4 className="text-xl font-medium text-neutral-800">Download our App</h4>
              <div className="w-[300px] flex transition-transform duration-300 ease-out hover:scale-105 transform">
                 <a
                    href="#"
                     onClick={(e) => e.preventDefault()}
                      className="pointer-events-none cursor-not-allowed"
                        >
                      <Image
                       src="/app-store.png"
                       width={903}
                       height={198}
                      alt="Bayyinah Mobile app"
                       />
                     </a>
                    </div>

              </div>
            </div>

            <div className="flex flex-wrap xl:flex-nowrap gap-x-20 gap-y-10">
              <FooterNavigation />
              <ContactLists />
            </div>
          </div>
        </div>

        <div className="bg-[#EDEFF2] h-20 flex items-center justify-center w-full">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="text-sm sm:text-base font-medium text-neutral-800">
                © Bayyinah Academy Ltd.
              </p>
              <ul className="flex items-center">
                <li className="flex pr-2 border-r border-r-neutral-400 last:pr-0">
                  <Link
                    href={"/terms-of-services"}
                    className="text-xs sm:text-base font-medium text-neutral-600 hover:text-regal-blue-600"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li className="flex pl-2">
                  <Link
                    href={"/privacy-policy"}
                    className="text-xs sm:text-base font-medium text-neutral-600 hover:text-regal-blue-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* ✅ Floating WhatsApp Button */}
      <Link
        href="https://api.whatsapp.com/send?phone=447700183406&text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20courses"
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
      >
        <ImWhatsapp className="text-2xl" />
      </Link>
    </React.Fragment>
  );
};

export default Footer;
