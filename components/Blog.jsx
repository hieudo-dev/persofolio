import Image from "next/image";
import Link from "next/link";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Blog() {
  return (
    <section className="relative after:absolute after:inset-0 after:-z-10 after:bg-white after:bg-opacity-5 after:backdrop-blur-md after:content-['']">
      <Image
        fill
        className="absolute inset-0 object-cover object-top -z-20"
        src="/blog.jpg"
        alt="blog"
      />
      <div className="container flex flex-col items-center justify-center py-32 mx-auto">
        <p className="px-3 py-1 mb-6 tracking-widest text-purple-200 bg-white border border-purple-300 rounded-full shadow-md bg-opacity-10 font-nunito">
          BLOG
        </p>

        <h2 className="mb-16 text-6xl font-bold leading-snug text-center font-merriweather text-blue-50">
          I like writing about
          <br /> technology and things I learn
        </h2>

        <Link
          href="/blog"
          className="px-8 py-3 text-xl font-semibold rounded-full bg-gradient-to-l from-blue-500 to-purple-500 font-nunito text-gray-50"
          disabled
        >
          Read my articles
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}
