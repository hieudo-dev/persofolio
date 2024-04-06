import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Blog() {
  return (
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
  );
}
