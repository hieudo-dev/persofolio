import Image from "next/image";
import Underline from "@/components/Underline";

export default function About() {
  return (
    <section className="flex h-screen bg-purple-50">
      <div className="flex gap-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-3/4 flex-col items-center">
            <p className="mb-6 rounded-full border border-purple-400 bg-purple-100 px-3 py-1 font-nunito text-sm font-normal tracking-widest text-purple-500 shadow-lg">
              ABOUT
            </p>
            <h2 className="mb-12 font-merriweather text-6xl font-bold text-gray-700">
              My name is
              <span className="relative ml-4 inline-flex">
                Hieu
                <Underline
                  id="line"
                  className="absolute -bottom-3 left-0 right-0 scale-y-[200%] text-purple-400"
                />
              </span>
            </h2>
            <p className="text-center font-nunito text-2xl font-normal leading-8 text-gray-500">
              I'm a software engineer from Vietnam, driven by a strong passion
              for learning and programming. My playground is web development,
              where I specialize in bridging the gap between frontend
              development and crafting exceptional user experiences.
            </p>
          </div>
        </div>
        <div className="flex w-1/2 justify-end">
          <Image
            src="/me.png"
            alt="Hieu"
            width={500}
            height={500}
            className="w-full object-cover object-[center_80%]"
          />
        </div>
      </div>
    </section>
  );
}
