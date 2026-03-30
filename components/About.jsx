import { useRef } from "react";

import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Underline from "@/components/Underline";

export default function About() {
  const image = useRef();
  const about = useRef();
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!image.current || !about.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: about.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.to(image.current, {
      objectPosition: `center calc(100%)`,
      ease: "none",
    });
  }, []);

  return (
    <section
      ref={about}
      className="container flex justify-center h-screen py-20 mx-auto bg-blue-50"
    >
      <div className="flex items-center justify-center w-3/6 p-12">
        <div className="flex flex-col items-center">
          <p className="px-3 py-1 mb-6 text-xs font-normal tracking-widest text-purple-500 bg-purple-100 border border-purple-400 rounded-full shadow-lg font-nunito">
            ABOUT
          </p>
          <h2 className="mb-6 text-4xl font-bold text-gray-700 font-merriweather">
            My name is
            <span className="relative inline-flex ml-4">
              Hieu
              <Underline
                id="line"
                className="absolute -bottom-3 left-0 right-0 scale-y-[200%] text-purple-400"
              />
            </span>
          </h2>
          <p className="text-lg font-normal leading-8 text-left text-gray-500 font-nunito">
            I'm from Vietnam 🇻🇳 and I'm a software engineer who loves learning and solving problems.
            My main expertise is web development, where I specialize in delivering end-to-end
            solutions, carefully crafting both exceptional user experiences and scalable backend
            systems.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-3/6 p-28">
        <div className="relative">
          <div className="overflow-hidden">
            <Image
              ref={image}
              src="/me.png"
              alt="Hieu"
              width={800}
              height={800}
              className="relative z-10 object-cover rounded-lg aspect-square"
            />
          </div>
          <div className="h-full w-full after:absolute after:left-12 after:top-12 after:block after:h-full after:w-full after:rounded-lg after:bg-indigo-300 after:content-['']"></div>
          <div className="h-full w-full after:absolute after:left-6 after:top-6 after:block after:h-full after:w-full after:rounded-lg after:bg-purple-400 after:content-['']"></div>
        </div>
      </div>
    </section>
  );
}
