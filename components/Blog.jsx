import Image from "next/image";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Blog() {
  return (
    <section className="relative after:absolute after:inset-0 after:-z-10 after:bg-white after:bg-opacity-5 after:backdrop-blur-xl after:content-['']">
      <Image fill className="absolute inset-0 object-cover object-top -z-20" src="/blog.jpg" />
      <div className="container flex flex-col items-center justify-center py-32 mx-auto">
        <p className="px-3 py-1 mb-6 text-xs tracking-widest text-purple-200 bg-white border border-purple-300 rounded-full shadow-md bg-opacity-10 font-nunito">
          BLOG
        </p>

        <h2 className="mb-10 text-4xl font-bold leading-snug text-center font-merriweather text-blue-50">
          I like writing about
          <br /> technology and things I learn
        </h2>

        <button className="px-6 py-2 text-base font-semibold rounded-full bg-gradient-to-l from-blue-500 to-purple-500 font-nunito text-gray-50">
          Read my articles
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
    </section>
  );
}
