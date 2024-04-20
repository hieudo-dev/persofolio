import React from "react";
import Image from "next/image";

export default function Experience() {
  const experience = [
    {
      company: "OpenCommerce Group",
      companyLogo: "/ocg.png",
      jobtitle: "Frontend Engineer",
      overline: "2021-2023",
      description: () => (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do
          <br />
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
        </p>
      ),
    },
    {
      company: "SwagUp",
      companyLogo: "/swagup.png",
      jobtitle: "Frontend Engineer",
      overline: "2020-2021",
      description: () => (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do
          <br />
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
        </p>
      ),
    },
  ];
  return (
    <section className="bg-gradient-to-b from-blue-500 to-indigo-400">
      <div className="container mx-auto flex flex-col items-center py-32 text-center">
        <p className="mb-6 rounded-full border border-purple-200 bg-white bg-opacity-10 px-3 py-1 font-nunito tracking-widest text-purple-50 shadow-md">
          EXPERIENCE
        </p>
        <h2 className="mb-48 font-merriweather text-7xl font-bold text-purple-50">
          My journey
        </h2>
        <div className="container mx-auto grid grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)]">
          {experience.map(
            (
              { jobtitle, description, company, companyLogo, overline },
              index
            ) => (
              <React.Fragment key={company}>
                <div>
                  <p className="mb-4 mt-32 inline-block rounded-3xl bg-purple-500 bg-opacity-70 px-3 font-mavenpro text-xl font-bold tracking-widest text-purple-50">
                    {overline}
                  </p>
                  <h3 className="mb-2 flex justify-center font-merriweather text-4xl text-purple-50">
                    <span className="relative flex items-center">
                      <Image
                        src={companyLogo}
                        alt={company}
                        width={48}
                        height={48}
                        className="absolute right-full mr-4 inline-flex w-auto rounded-xl p-1"
                      />
                      {company}
                    </span>
                  </h3>
                  <p className="font-mavenpro text-2xl font-medium text-blue-300">
                    {jobtitle}
                  </p>
                </div>

                <div className="relative flex flex-col items-center justify-start">
                  <div className="relative h-full">
                    <hr className="relative z-10 h-full w-1 border-none bg-blue-300 bg-opacity-40" />
                    {index === 0 && (
                      <hr className="absolute top-0 z-10 h-64 w-1 border-none bg-gray-50" />
                    )}
                  </div>
                  <div className="absolute top-40 z-10 aspect-square min-h-8 min-w-8 rounded-full bg-gray-50 text-xl font-extrabold text-blue-400 shadow-[0_0_24px_#f3e8ff]"></div>
                </div>

                <div className="mb-48 mt-32 rounded-3xl bg-white bg-opacity-15 px-6 py-10 font-mavenpro text-xl text-blue-50 shadow-md">
                  {description()}
                </div>
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </section>
  );
}
