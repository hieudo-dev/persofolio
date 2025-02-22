import Link from "next/link";

import { faGithub, faLinkedin, faThreads } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
  return (
    <section className="py-16 md:py-48">
      <div className="container mx-auto flex flex-col md:flex-row rounded-[56px]">
        <div className="relative flex flex-col w-full md:mx-8 md:w-1/2">
          <h2 className="relative z-10 mt-12 mb-8 font-black leading-none tracking-normal text-gray-500 font-merriweather text-8xl">
            Let&apos;s <br />
            <span className="text-blue-500">connect</span>
          </h2>
          <p className="mr-16 text-2xl font-semibold text-gray-400 font-nunito">
            Open to collaboration or just want to chat? <br />
            Feel free to reach out anytime.
          </p>
          <div className="relative flex items-end gap-8 my-8 text-gray-400">
            <Link href="https://www.linkedin.com/in/hieu-do-ngoc-922a0b191/">
              <FontAwesomeIcon icon={faLinkedin} size="3x" className="text-[#0077B5]" />
            </Link>
            <Link href="https://github.com/hieudo-dev/">
              <FontAwesomeIcon icon={faGithub} size="3x" className="text-gray-700" />
            </Link>
            <Link href="https://www.threads.net/@hieudn98">
              <FontAwesomeIcon icon={faThreads} size="3x" className="text-black" />
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center w-full md:w-1/2">
          <form className="relative z-10 flex flex-col justify-start w-full p-8 shadow-2xl md:ml-8 md:max-w-lg rounded-3xl bg-gray-50">
            <label
              htmlFor="name"
              className="mb-2 text-lg font-semibold tracking-wider text-gray-500 font-nunito"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="p-2 mb-6 text-xl text-gray-800 border-2 border-blue-200 rounded-xl"
            />
            <label
              htmlFor="email"
              className="mb-2 text-lg font-semibold tracking-wider text-gray-500 font-nunito"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="p-2 mb-6 text-xl text-gray-800 border-2 border-blue-200 rounded-xl"
            />
            <label
              htmlFor="message"
              className="mb-2 text-lg font-semibold tracking-wider text-gray-500 font-nunito"
            >
              What&apos;s on your mind?
            </label>
            <textarea
              id="email"
              type="text"
              rows="3"
              className="p-2 mb-12 text-xl text-gray-800 border-2 border-blue-200 rounded-xl"
            />
            <button className="px-2 py-3 text-xl font-semibold text-white via rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 font-mavenpro">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
