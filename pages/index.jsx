import React, { useEffect } from "react";
import { Nunito, Merriweather_Sans, Maven_Pro } from "next/font/google";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

const nunito = Nunito({ subsets: ["latin"], variable: "--nunito-font" });
const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--merriweather-font",
});
const mavenpro = Maven_Pro({ subsets: ["latin"], variable: "--mavenpro-font" });

export default function Home() {
  useEffect(() => {
    (async () => {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive();
    })();
  }, []);

  return (
    <main
      className={`${nunito.variable} ${merriweather.variable} ${mavenpro.variable}`}
    >
      <Hero />
      <About />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
