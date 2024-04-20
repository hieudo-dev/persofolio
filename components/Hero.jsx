import Wave from "@/components/Wave";

export default function Hero() {
  return (
    <section className="text-shadow relative flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-purple-600 via-indigo-500 via-55% to-blue-600 to-95% p-24 font-merriweather">
      <p className="text-center text-6xl font-semibold leading-[6rem] text-white">
        <span id="hi" className="ml-4 inline-flex items-center overflow-hidden">
          Hi there!
          <Wave className="mb-4 ml-4 w-20" />
        </span>
        <br />
        <span
          id="welcome"
          className="inline-flex overflow-hidden text-center text-6xl font-semibold leading-[6rem] text-white"
        >
          Welcome to my corner of the internet
        </span>
      </p>
      <div
        id="scroll-indicator"
        className="icon-scroll absolute bottom-10 w-6"
      ></div>
    </section>
  );
}
