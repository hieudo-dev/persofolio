import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Wave from "@/components/Wave";
import { useRef } from "react";

export default function Hero() {
  const scrollIndicator = useRef();
  const hi = useRef();
  const welcome = useRef();

  useGSAP(() => {
    const hero = gsap
      .timeline()
      .fromTo(
        hi.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.75 }
      )
      .fromTo(
        welcome.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.75 },
        "+=0.5"
      )
      .fromTo(
        scrollIndicator.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      )
      .delay(0.5);
    hero.play();
  });

  return (
    <section className="text-shadow relative flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-purple-600 via-indigo-500 via-55% to-blue-600 to-95% p-24 font-merriweather">
      <p className="text-center text-6xl font-semibold leading-[6rem] text-white">
        <span
          ref={hi}
          className="ml-4 inline-flex items-center overflow-hidden opacity-0"
        >
          Hi there!
          <Wave className="mb-4 ml-4 w-20" />
        </span>
        <br />
        <span
          ref={welcome}
          className="text-whit inline-flex overflow-hidden text-center text-6xl font-semibold leading-[6rem] opacity-0"
        >
          Welcome to my corner of the internet
        </span>
      </p>
      <div
        ref={scrollIndicator}
        className="icon-scroll absolute bottom-10 w-6 opacity-0"
      ></div>
    </section>
  );
}
