import PageHeroSection from "@/components/common/PageHeroSection";
import { cn } from "@/lib/utils";
import { MailOpen, Map, PhoneCall } from "lucide-react";
import React from "react";
import ContactForm from "./ContactForm";
import { SubscribeNewsletter } from "@/components/homepage";
import ContactFaqSection from "@/components/contact/ContactFaqSection";

const CONTACT_LISTS = [
  {
    key: "email",
    icon: MailOpen,
    label: "Email",
    value: "support@bayyinahschool.com",
  },
  { key: "phone", icon: PhoneCall, label: "Phone", value: "+44 77 0018 3406" },
  {
    key: "location",
    icon: Map,
    label: "Visit Us",
    value: "85 Great Portland Street, First Floor, England, W1W 7LT, London, United Kingdom",
  },
];

const ContactUsPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="contact-us-page">
        <PageHeroSection
          title="Contact Us"
          description={`Let's Chat! Reach out to us using the contact details below. We're excited to hear form you.`}
        />

        <section
          aria-describedby="contact-form-section"
          className="py-10 sm:py-20 bg-white"
        >
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div
                aria-describedby="content-wrapper"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div aria-describedby="left-column" className="flex">
                  <div
                    aria-describedby="content"
                    className="group p-4 sm:p-8 w-full rounded-4xl border border-neutral-100 flex flex-col gap-y-7 sm:gap-y-14 items-start transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer"
                  >
                    <h3 className="text-3xl sm:text-4xl font-medium text-neutral-800 transition-all duration-300 ease-out group-hover:text-neutral-900">
                      Contact Us
                    </h3>

                    <ul
                      aria-describedby="contact-lists"
                      className="flex flex-col items-start gap-y-6"
                    >
                      {CONTACT_LISTS.map((contact) => (
                        <li
                          key={contact.key}
                          aria-describedby="item"
                          className="group/item flex items-center gap-3 transition-all duration-300 ease-out hover:scale-105 transform"
                        >
                          <span
                            aria-describedby="icon"
                            className={cn(
                              "p-3.5 rounded-full flex items-center justify-center shrink-0 grow-0 basis-auto transition-all duration-300 ease-out group-hover/item:scale-110 transform",
                              contact.key === "email" &&
                                "bg-[#DAF0FF] text-[#50B3FA] group-hover/item:bg-[#C5E8FF] group-hover/item:text-[#3A9EE8]",
                              contact.key === "phone" &&
                                "bg-[#EEF4FF] text-[#467CE9] group-hover/item:bg-[#E0EAFF] group-hover/item:text-[#3A6CD8]",
                              contact.key === "location" &&
                                "bg-[#FDF5E7] text-[#F6AE2D] group-hover/item:bg-[#F8E8C7] group-hover/item:text-[#E89A1D]"
                            )}
                          >
                            <contact.icon className="sm:w-8 w-5 sm:h-8 h-5 transition-transform duration-300 ease-out group-hover/item:scale-110" />
                          </span>

                          <div className="flex flex-col gap-y-1 items-start flex-1">
                            <h5 className="text-base font-medium text-neutral-800 transition-all duration-300 ease-out group-hover/item:text-neutral-900">
                              {contact.label}
                            </h5>
                            <p className="text-sm sm:text-base font-normal text-neutral-700 transition-all duration-300 ease-out group-hover/item:text-neutral-800">
                              {contact.value}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div aria-describedby="right-column" className="flex">
                  <div
                    aria-describedby="contact-form-wrapper"
                    className="group bg-regal-blue-500 sm:p-8 p-5 rounded-4xl w-full transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-200/50 cursor-pointer"
                  >
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SubscribeNewsletter />
        <ContactFaqSection />
      </div>
    </React.Fragment>
  );
};

export default ContactUsPage;
