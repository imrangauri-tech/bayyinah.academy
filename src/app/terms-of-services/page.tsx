import PageHeroSection from "@/components/common/PageHeroSection";
import React from "react";

const CONTENT = [
  {
    textBlocks: [
      {
        type: "plain",
        value: `The website www.bayyinah.com (“website”) is provided by Al
                  Furqan Academy (“we”, “us” or “our”). We advise that the user
                  read the Terms and Conditions carefully as they govern your
                  use of the website whether as a guest or registered user,
                  explain the policies governing your use of this website, and
                  provide other information regarding your rights.`,
      },
    ],
  },
  {
    title: "Admission & Registration",
    textBlocks: [
      {
        type: "plain",
        value: `The academy’s selection is solely based on the information provided in the  application form. If the academy finds out that you have merely provided misleading information or overlooked important information, it  maintains the right to deny admission.`,
      },
    ],
  },
  {
    title: "Fee & Payments",
    textBlocks: [
      {
        type: "plain",
        value: `All fee payments made to the academy, be it the course fee or the application fee are non-refundable.
        The fee is also non-refundable if the student decides to drop out of the  course in the middle. This is exactly why we have created a monthly  payment structure so that people who change their minds just have to  forfeit one month’s price.`,
      },
      {
        type: "plain",
        value: `The academy has the authority to raise  the fee at any time during the course. A fee increase will, however, be  notified one month in advance.`,
      },
      {
        type: "plain",
        value: `The fees will only be raised if the Academy is unable to cover the ever-increasing costs of the study system.
        Students are required to pay the monthly fee before the 28th of each month.`,
      },
      {
        type: "plain",
        value: `A student can elect to leave the Academy at any time. However, the  management must be given prior notice at least one week before the start of the following month. if the student notifies after the start of a  given month, he is obliged to pay the fees for that month.`,
      },
      {
        type: "plain",
        value: `You are requested to know the policies and requirements before progressing with the payments.
            Our payment system does not allow us to reverse the transaction, so only  complete your payment if you are certain you will not back out.`,
      },
    ],
  },
  {
    title: "Communications",
    textBlocks: [
      {
        type: "plain",
        value: `Since we are an online Academy, we offer all our services through the  internet. We communicate with you through emails and WhatsApp.`,
      },
    ],
  },
  {
    title: "Cancellation or compensation of classes",
    textBlocks: [
      {
        type: "plain",
        value: `If due to any reason, the student is not able to attend a class, in NO  manner will this class be compensated. Unforeseen events may emerge  during the student’s course of study, and these should be treated with  constructive understanding and patience.
        However, if it’s a miss from our side, then we’ll compensate the class for you based on mutual agreement.`,
      },
      {
        type: "plain",
        value: `If due to any reason, the student is not able to attend a class, in NO  manner will this class be compensated. Unforeseen events may emerge  during the student’s course of study, and these should be treated with  constructive understanding and patience.
        However, if it’s a miss from our side, then we’ll compensate the class for you based on mutual agreement.`,
      },
      {
        type: "plain",
        value: `Technical limitations are a part of online learning. A student might be unable to attend a class due to technical difficulty (either on the student’s or  the teacher’s end). In such situations, send us an email or a WhatsApp  message and leave the class. If there was a technical problem on the  student’s end, the class would not be compensated. However, if the  problem was caused by the Teacher, we will compensate the class.`,
      },
    ],
  },
  {
    title: "Direct communication with the staff",
    textBlocks: [
      {
        type: "plain",
        value: `Apart from the Admin, students are not permitted to communicate directly with the Academy’s other staff members, exchange contact information such as email addresses, and phone numbers, or maintain direct personal contact through any means. The student may only communicate with the Academy  through the Admin.Your bond towards the Academy is an Amanah that should not be misused.`,
      },
    ],
  },
  {
    title: "Copyright",
    textBlocks: [
      {
        type: "plain",
        value: `You may be able to post content on our website; such as comments or  reviews. By doing so, you allow us a non-exclusive, royalty-free  ceaseless irrevocable, and completely sub-licensable right to utile,  procreate, modify, edit, publish, rephrase, produce secondary works  from, distribute, and display.`,
      },
    ],
  },
  {
    title: "Privacy",
    textBlocks: [
      {
        type: "plain",
        value: `The Academy values your confidentiality and is committed to protecting your personal data.
       Please see the Company’s Privacy Policy, which outlines how we collect, utilize, and share personal information.`,
      },
      {
        type: "plain",
        value: `The Academy’s Privacy Policy is therefore incorporated by reference into these Terms.If there is a disagreement between these Terms and the Privacy Policy,the Privacy Policy will take precedence. You agree to the Company’s Privacy Policy when you use the website.`,
      },
    ],
  },
  {
    title: "Third-party content",
    textBlocks: [
      {
        type: "plain",
        value: `While we do our best to keep an eye on it, Al Furqan does not endorse Third Party Content and has no obligation to control it.
        Personal views or ideas stated in such third-party content do not represent Al  Furqan Academy’s views and do not indicate a recommendation,  endorsement, or guarantee of quality or accuracy by us. The Academy  accepts no responsibility and assumes no liability for the content of  the website.`,
      },
      {
        type: "plain",
        value: `The academy will not be liable for any loss or damage caused by anyone’s reliance on information or other content placed on  the website or transmitted to users.`,
      },
    ],
  },
  {
    title: "Modifications to the term of use",
    textBlocks: [
      {
        type: "plain",
        value: `The Terms and Conditions of this website may change from time to time, and  we recommend that the users review the Terms and Conditions on a  frequent basis to ensure that they are up to date with any recent  changes. By continuing to use the site after these Terms and Conditions  have changed, you acknowledge that you have read, understood, and  amended the Terms and conditions and agree to be bound by them.`,
      },
      {
        type: "plain",
        value: `You may not engage in our sessions or access or use our website or services if you do not agree to these terms.`,
      },
    ],
  },
  {
    title: "Governing Law",
    textBlocks: [
      {
        type: "plain",
        value: `These terms of service shall be governed and construed in accordance with the laws of the UK.`,
      },
    ],
  },
  {
    title: "Entire Agreement",
    textBlocks: [
      {
        type: "plain",
        value: `These terms of service represent the whole agreement between you and us about your use of our website and services. Any additional terms, whether  written or oral, are excluded.`,
      },
    ],
  },
  {
    title: "Disputes",
    textBlocks: [
      {
        type: "plain",
        value: `Any differences that arise during your studies at this Academy are subject to the final decision of its Admin.`,
      },
    ],
  },
  {
    title: "Contact Us",
    textBlocks: [
      {
        type: "plain",
        value: `If you have any queries regarding these Terms of Use, please contact us at contact@bayyinah`,
      },
    ],
  },
];

const TermsOfServicesPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="terms-of-services-page">
        <PageHeroSection
          title="TERMS OF SERVICES"
          description="Arabic teacher arabic teacher arabic teacher arabic teacher"
        />

        <section
          aria-describedby="terms-of-services-content-section"
          className="py-10 sm:py-14"
        >
          <div className="container">
            <div aria-describedby="main-wrapper">
              <div aria-describedby="content-wrapper" className="space-y-5">
                {CONTENT.map((con, index) => (
                  <React.Fragment key={index}>
                    {con?.title && (
                      <h4
                        aria-describedby="content-title"
                        className="text-2xl font-medium text-neutral-800"
                      >
                        {con.title}
                      </h4>
                    )}

                    {con.textBlocks.map((block, index) => (
                      <p
                        key={index}
                        aria-describedby="text-block"
                        className="text-lg font-normal text-neutral-700"
                      >
                        {block.value}
                      </p>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default TermsOfServicesPage;
