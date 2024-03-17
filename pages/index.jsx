import React from "react";
import Image from "next/image";
import { Nunito, Merriweather_Sans, Maven_Pro } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Underline from "@/components/Underline";

const nunito = Nunito({ subsets: ["latin"], variable: "--nunito-font" });
const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--merriweather-font",
});
const mavenpro = Maven_Pro({ subsets: ["latin"], variable: "--mavenpro-font" });

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export default function Home() {
  const experience = [
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
  ];

  const a = new Date();

  const myTime = convertTZ(a, "Asia/Jakarta");

  return (
    <main
      className={`${nunito.variable} ${merriweather.variable} ${mavenpro.variable}`}
    >
      <section className="text-shadow relative flex h-screen min-h-screen flex-col items-center justify-center p-24 font-nunito">
        <Image fill src="/hero.jpg" className="absolute inset-0 -z-10" />
        <p className="text-center text-6xl font-semibold leading-[6rem] text-gray-100">
          Hi! 👋 I'm{" "}
          <span className="relative text-7xl font-extrabold text-white">
            Hieu
            <Underline className="absolute bottom-2 left-0 right-0 scale-y-[200%] text-blue-500" />
          </span>
          . <br />
          <span className="">Welcome to my corner of the internet!</span>
        </p>
      </section>
      <section className="flex h-screen bg-blue-50">
        <div className="flex gap-10">
          <div className="flex flex-1 flex-col items-center justify-center pl-48 pr-32">
            <p className="mb-6 rounded-full border border-purple-400 bg-purple-100 px-3 py-1 font-nunito text-sm font-normal tracking-widest text-purple-500 shadow-lg">
              ABOUT
            </p>
            <h2 className="mb-12 font-merriweather text-7xl font-bold text-gray-700">
              Who am I
            </h2>
            <p className="text-center font-nunito text-2xl font-normal leading-8 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            </p>
          </div>
          <div className="flex w-1/2 justify-end">
            <Image
              src="/me.png"
              alg="Hieu"
              width={500}
              height={500}
              className="w-full object-cover object-[center_80%]"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-400 to-purple-400">
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
                    <p className="mb-4 mt-32 inline-block rounded-3xl bg-purple-500 bg-opacity-50 px-3 font-mavenpro text-xl font-bold tracking-widest text-blue-100">
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
                    <p className="font-mavenpro text-2xl font-medium text-indigo-200">
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

      <section className="relative after:absolute after:inset-0 after:-z-10 after:bg-white after:bg-opacity-5 after:backdrop-blur-xl after:content-['']">
        <Image
          fill
          className="absolute inset-0 -z-20 object-cover object-top"
          src="/blog.jpg"
        />
        <div className="container mx-auto flex flex-col items-center justify-center py-32">
          <p className="mb-6 rounded-full border border-purple-200 bg-white bg-opacity-10 px-3 py-1 font-nunito tracking-widest text-purple-100 opacity-50 shadow-md">
            BLOG
          </p>

          <h2 className="mb-16 text-center font-merriweather text-6xl font-bold leading-snug text-blue-50">
            I like writing about technology <br /> and other things I like
          </h2>

          <button className="rounded-full bg-gradient-to-l from-blue-500 to-purple-500 px-8 py-3 font-nunito text-xl font-semibold text-gray-50">
            Read my articles
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </section>

      <section className="bg-blue-50 py-32">
        <div className="container mx-auto flex gap-16 rounded-[56px] bg-gray-50 p-28 shadow-lg">
          <div className="relative mx-16 flex flex-1 flex-col">
            <h2 className="relative z-10 mb-8 mt-12 font-merriweather text-[82px] font-black leading-none tracking-normal text-gray-500">
              Let's <br />
              <span className="text-blue-500">connect</span>
            </h2>
            <p className="mr-16 font-nunito text-2xl font-semibold text-gray-400">
              Open to collaboration or just want to chat? Feel free to reach out
              anytime.
            </p>
            <div className="relative mb-8 flex flex-1 items-end gap-8 text-gray-400">
              <FontAwesomeIcon
                icon={faGithub}
                size="3x"
                className="text-gray-700"
              />
              <FontAwesomeIcon
                icon={faFacebook}
                size="3x"
                className="text-blue-500"
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                size="3x"
                className="text-[#0077B5]"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                size="3x"
                className="text-[#08a0e9]"
              />
              <FontAwesomeIcon
                icon={faTwitch}
                size="3x"
                className="text-purple-600"
              />
            </div>
          </div>
          <div className="relative flex-1">
            <form className="relative z-10 ml-8 flex flex-col justify-start rounded-3xl bg-purple-50 p-8 shadow-purple">
              <label
                htmlFor="name"
                className="mb-2 font-nunito text-lg font-semibold tracking-wider text-gray-500"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mb-6 rounded-xl border-2 border-purple-200 bg-gray-50 p-2 text-xl text-gray-800"
              />
              <label
                htmlFor="email"
                className="mb-2 font-nunito text-lg font-semibold tracking-wider text-gray-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mb-6 rounded-xl border-2 border-purple-200 bg-gray-50 p-2 text-xl text-gray-800"
              />
              <label
                htmlFor="message"
                className="mb-2 font-nunito text-lg font-semibold tracking-wider text-gray-500"
              >
                What's on your mind?
              </label>
              <textarea
                id="email"
                type="text"
                rows="3"
                className="mb-12 rounded-xl border-2 border-purple-200 bg-gray-50 p-2 text-xl text-gray-800"
              />
              <button className="via rounded-3xl bg-gradient-to-l from-blue-500 to-purple-500 px-2 py-3 font-mavenpro text-xl font-semibold text-white">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="rounded-tl-4xl rounded-tr-4xl bg-blue-50 pb-10 pt-12 shadow-[0_0_40px_#00000033]">
        <div className="container mx-auto">
          <div className="mb-12 flex justify-center">
            <p className="inline bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-center font-mavenpro text-4xl font-semibold text-gray-800 text-transparent">
              Thanks for reading!
            </p>
          </div>
          <hr className="mb-4 h-1 w-full bg-indigo-100" />
          <div className="flex items-start justify-between">
            <p className="font-nunito text-xl font-semibold text-gray-500">
              © 2024 Handcrafted by Hieu
            </p>
            <p className="font-nunito font-bold text-gray-300">
              LOCAL TIME:
              <span className="ml-4 text-gray-500">
                {myTime.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                GMT+7
              </span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
