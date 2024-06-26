import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Experience() {
  const experience = [
    {
      company: "SwagUp",
      jobtitle: "Frontend Engineer",
      overline: "2020-2021",
      description: () => (
        <p>
          Built and maintained SwagUp's sales platform, delivering new
          digitalized experiences and improving legacy shipping processes.
          Collaborated with stakeholders and a dedicated development team to
          implement initiatives aimed at driving sales growth and enhancing user
          satisfaction. Spearheaded the adoption of unit testing protocols,
          which significantly increased testing coverage and reduced the number
          of regressions with each product release.
        </p>
      ),
      tags: ["ReactJS", "NextJS", "Redux", "RTL", "MaterialUI"],
    },
    {
      company: "OpenCommerce Group",
      jobtitle: "Frontend Engineer",
      overline: "2021-2023",
      description: () => (
        <p>
          Leveraged the state-of-the-art frontend technologies to build and
          maintain core components of an in-house frontend framework, impacting
          5 cross-functional teams and over 365,000 users. Closely collaborated
          with key stakeholders to maintain the company's internal design
          system. Succesfuly mentored junior members by providing constructive
          feedback and collaboration, driving their professional growth within
          the team.
        </p>
      ),
      tags: ["VueJS", "VueX", "Typescript", "HTML & SASS", "Vite"],
    },
    {
      company: "Akila3D",
      jobtitle: "Senior Frontend Engineer",
      overline: "2023-Present",
      description: () => (
        <p>
          Collaborated with teams members and stakeholders to develop data
          visualization and ESG reporting tools into the platform, facilitating
          analysis of energy consumption, carbon emissions, and other
          sustainability metrics. • Developed the new resdesign for the
          company’s website, implementing modern design elements, optimize page
          loading times, and ensure seamless cross-device compatibility,
          resulting in increased traffic and improved lead generation.
        </p>
      ),
      tags: ["VueJS", "ReactJS", "Typescript", "LESS", "AntDesign"],
    },
  ];

  const lineRef = useRef(null);
  const companyRefs = useRef(Array(experience.length).fill(null));
  const sectionRef = useRef(null);

  useEffect(() => {
    function updateElementHeight() {
      const element = lineRef.current;
      const top = element.getBoundingClientRect().top;
      const bottomOffset = window.innerHeight / 3;
      gsap.to(element, { height: window.innerHeight - bottomOffset - top });
    }
    window.addEventListener("scroll", updateElementHeight);
    return () => {
      window.removeEventListener("scroll", updateElementHeight);
    };
  });

  useGSAP(() => {
    companyRefs.current.map((company) => {
      const children = company.querySelectorAll(
        ".contents > *:nth-child(2n+1)"
      );
      gsap
        .timeline({
          scrollTrigger: {
            trigger: children[0],
            start: "top 70%",
            end: "center 50%",
            scrub: true,
          },
        })
        .fromTo(
          children,
          { filter: "blur(4px)", opacity: 0, y: 64 },
          { filter: "blur(0px)", opacity: 1, y: 0 }
        );
    });
  });

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-blue-500 to-indigo-400"
    >
      <div className="container mx-auto flex flex-col items-center py-32 text-center">
        <p className="mb-6 rounded-full border border-purple-200 bg-white bg-opacity-10 px-3 py-1 font-nunito tracking-widest text-purple-50 shadow-md">
          EXPERIENCE
        </p>
        <h2 className="mb-48 font-merriweather text-7xl font-bold text-purple-50">
          My journey
        </h2>
        <div className="container relative mx-auto grid grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)]">
          <hr
            ref={lineRef}
            className="absolute left-0 right-0 top-0 z-10 mx-auto h-[80vh] max-h-full w-1 border-none bg-gray-50"
          />
          {experience.map(
            ({ jobtitle, description, company, overline, tags }, i) => (
              <div
                key={company}
                className="contents"
                ref={(el) => (companyRefs.current[i] = el)}
              >
                <div>
                  <p className="mb-4 mt-32 inline-block rounded-3xl bg-purple-500 bg-opacity-70 px-3 font-mavenpro text-xl font-bold tracking-widest text-purple-50">
                    {overline}
                  </p>
                  <h3 className="mb-2 flex justify-center font-merriweather text-4xl text-purple-50">
                    <span className="relative flex items-center">
                      {company}
                    </span>
                  </h3>
                  <p className="font-mavenpro text-2xl font-medium text-blue-300">
                    {jobtitle}
                  </p>
                </div>

                <div className="relative flex flex-col items-center justify-start">
                  <div className="relative h-full overflow-hidden">
                    <hr className="relative z-10 h-full w-1 border-none bg-blue-300 bg-opacity-40" />
                  </div>
                  <div className="absolute top-48 z-10 aspect-square min-h-8 min-w-8 rounded-full bg-gray-50 text-xl font-extrabold text-blue-400 shadow-[0_0_24px_#f3e8ff]"></div>
                </div>

                <div className="mb-48 mt-20 rounded-3xl bg-white bg-opacity-15 px-6 pb-6 pt-6 text-left font-mavenpro text-xl text-blue-50 shadow-md">
                  {description()}
                  {tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <div className="rounded-xl bg-blue-500 px-3 py-1.5 text-lg text-blue-50">
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
