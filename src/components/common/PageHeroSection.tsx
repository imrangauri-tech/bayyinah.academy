import React from "react";

interface PageHeroSectionProps {
  title: string;
  description?: string;
}

const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  title,
  description,
}) => {
  return (
    <React.Fragment>
      <section
        aria-describedby="page-hero-section"
        className="py-10 sm:py-24 bg-regal-blue-500 relative z-[1] overflow-hidden
          before:absolute before:-z-[1] before:w-80 before:h-80 before:rounded-full before:bg-regal-blue-400 before:blur-[150px] before:-bottom-1/2 before:-left-24 before:transition-all before:duration-700 before:ease-out hover:before:scale-110 hover:before:blur-[200px]
          after:absolute after:-z-[1] after:w-80 after:h-80 after:rounded-full after:bg-regal-blue-400 after:blur-[150px] after:-top-1/2 after:-right-24 after:transition-all after:duration-700 after:ease-out hover:after:scale-110 hover:after:blur-[200px]
          "
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="content-wrapper"
              className="mx-auto max-w-4xl flex flex-col gap-y-8 items-center justify-center"
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-center text-white transition-all duration-500 ease-out hover:scale-105 transform">
                {title}
              </h1>

              {description && (
                <p className="text-base sm:text-xl font-normal text-white text-center transition-all duration-500 ease-out hover:scale-105 transform">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PageHeroSection;
