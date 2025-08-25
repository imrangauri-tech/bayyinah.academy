import PageHeroSection from "@/components/common/PageHeroSection";
import React from "react";

/*  



Contact us



*/

const CONTENT = [
  {
    textBlocks: [
      {
        type: "plain",
        value: `Al Furqan Academy takes privacy very seriously and is committed to  protecting the personal information of our students. Our privacy policy  explains the types of personal information we gather, how we use it, and the security measures we employ.`,
      },
    ],
  },
  {
    title: "Information we gather",
    textBlocks: [
      {
        type: "plain",
        value: `Our users provide us with numerous forms of Personal Information. We may use these personal details to personalize and improve our services, to  enable our users to create a user account and profile, to contact users, to meet your requests for specific products and services, to analyze  how users use the Website, and for other purposes specified in this  Privacy Policy. Some kind of Personal Data may be shared with third  parties.`,
      },
    ],
  },
  {
    title: "Information we collect",
    textBlocks: [
      {
        type: "plain",
        value: `All information you knowingly provide to us is collected and preserved  by us. We collect personal details from our students when they register  for our courses or contact us through our website. This information  includes name, address, email address, phone number, payment information (if applicable), or any other information necessary to provide our services.`,
      },
    ],
  },
  {
    title: "How we use it",
    textBlocks: [
      {
        type: "plain",
        value: `The information provided to us through the various forms on the site  enables us to help our users, provide them with useful information,  communicate with them, and at the same time help us improve the site’s  content in line with their needs.`,
      },
      {
        type: "plain",
        value: `We may also use personal  information to send promotional materials or updates about our courses.  However, you can unsubscribe from these emails at any time by following  the instructions in the email.`,
      },
    ],
  },
  {
    title: "Security measures",
    textBlocks: [
      {
        type: "plain",
        value: `We employ suitable measures to secure  our user’s personal information. This involves putting technical and  organizational safeguards in place to prevent unauthorized access, use,  or disclosure of personal information. `,
      },
      {
        type: "plain",
        value: `We also restrict access to personal data to authorized employees who need it to provide our services.
        However, we cannot guarantee complete security. Unapproved access or usage,  either software or hardware failure, and other issues can all jeopardize user information security at any time.`,
      },
    ],
  },
  {
    title: "Sharing of personal information",
    textBlocks: [
      {
        type: "plain",
        value: `We do not share your personal information with a third party unless required by Law or to deliver our services.`,
      },
      {
        type: "plain",
        value: `We may share your personal information with a reliable third-party service provider who helps us provide our services, such as payment processors  and website hosting companies.`,
      },
    ],
  },
  {
    title: "Your rights",
    textBlocks: [
      {
        type: "plain",
        value: `You have the right to see, modify, or erase any personal information we have on record about you. You may also object to the processing of your personal information or  request that we limit its usage. You can do so by contacting us via email.`,
      },
    ],
  },
  {
    title: "Cookies and Analytics",
    textBlocks: [
      {
        type: "plain",
        value: `We use cookies and similar tracking technologies to improve the user  experience on our website and to analyze website usage. When you  interact with our Website, we automatically receive and record data from your browser, including your IP address, “cookie” information, and the  page you requested, in our server logs.`,
      },
      {
        type: "plain",
        value: `When a person visits a  website, little text files termed cookies are saved on their device.  They allow us to remember user preferences and provide personalized  content.`,
      },
      {
        type: "plain",
        value: `You may be able to modify your browser’s choices to avoid or restrict your computer’s acceptance of cookies, but this may prevent you from using our website’s best features.`,
      },
      {
        type: "plain",
        value: `You may be able to modify your browser’s choices to avoid or restrict your computer’s acceptance of cookies, but this may prevent you from using our website’s best features.`,
      },
      {
        type: "plain",
        value: `When you click on adverts on our site, our advertising partners may also send cookies to your computer.
        ThisPrivacy Policy does not cover any advertisers’usage of cookies.`,
      },
    ],
  },
  {
    title: "Changes to the privacy policy",
    textBlocks: [
      {
        type: "plain",
        value: `The Academy retains the right to make amends to this policy at any  time. If we do so, we will inform you via email and by placing an  announcement on our website.`,
      },
      {
        type: "plain",
        value: `If you disagree with the revised policy, please contact us via email at contact@bayyinah.academy.
        If you continue to use our website or services after any changes to our  privacy policy are made, you will be considered to have agreed to those  changes.`,
      },
    ],
  },
  {
    title: "Children’s Privacy",
    textBlocks: [
      {
        type: "plain",
        value: `Our Academy does not knowingly collect  personal information from children under the age of 13. If we find that  we have obtained personal information from a child under the age of 13  without parental consent, we will take immediate steps to remove the  information.`,
      },
    ],
  },
  {
    title: "Third-Party Links",
    textBlocks: [
      {
        type: "plain",
        value: `Our website may include  links to third-party websites or services that we do not own or control. We are not responsible for the privacy practices of these third-party  websites and we urge the users to read their privacy policies before  sending any personal information to these websites.`,
      },
    ],
  },
  {
    title: "Contact Us",
    textBlocks: [
      {
        type: "plain",
        value: `If you have any questions or concerns about this privacy policy, you may contact us at contact@bayyinah.academy`,
      },
    ],
  },
];

const PrivacyPolicyPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="privacy-policy-page">
        <PageHeroSection title="PRIVACY POLICY" />

        <section
          aria-describedby="privacy-policy-content-section"
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

export default PrivacyPolicyPage;
