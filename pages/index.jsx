import Image from "next/image";
import { Nunito, Merriweather_Sans, Maven_Pro } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], variable: "--nunito-font" });
const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--merriweather-font",
});
const mavenpro = Maven_Pro({ subsets: ["latin"], variable: "--mavenpro-font" });

export default function Home() {
  return (
    <main
      className={`${nunito.variable} ${merriweather.variable} ${mavenpro.variable}`}
    >
      <section
        className={`flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-500 to-purple-500 p-24 font-nunito`}
      >
        <p className="text-center text-6xl font-semibold leading-[6rem] text-gray-200">
          Hi! 👋 I'm{" "}
          <span className={`text-7xl font-extrabold text-gray-50`}>Hieu</span>
          . <br />
          <span className="">Welcome to my corner of the internet!</span>
        </p>
      </section>
      <section className="flex h-screen bg-purple-100">
        <div className="flex gap-10">
          <div className="flex flex-1 flex-col items-center justify-center pl-14">
            <p className="mb-4 rounded-full border border-purple-400 px-3 py-1 font-nunito text-xs font-normal text-purple-400">
              ABOUT
            </p>
            <h2 className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 bg-clip-text font-merriweather text-7xl font-semibold text-purple-900 text-transparent">
              Who am I
            </h2>
            <p className="font-nunito text-2xl text-blue-950">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="flex w-1/2 justify-end">
            <Image
              src="/final.webp"
              alg="Hieu"
              width={500}
              height={500}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
