import { useRef } from "react";

import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const miniApps = [
  {
    name: "Portfolio Allocator",
    description: "Monthly deployment calculator with dip & gain tracking for VND portfolios.",
    href: "/allocator",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    accentColor: "text-[#d4b87a]",
    bgColor: "bg-[#d4b87a]/10",
    borderColor: "border-[#d4b87a]/20",
    hoverBorderColor: "hover:border-[#d4b87a]/50",
  },
];

export default function MiniApps() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
      }
    );
  });

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-transparent to-blue-50/50 px-8 py-10 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">Mini-apps</h2>
          <p className="text-sm text-gray-500">Tools I built to solve real problems</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {miniApps.map((app, index) => (
            <Link
              key={app.href}
              href={app.href}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative ${app.bgColor} ${app.borderColor} ${app.hoverBorderColor} border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className={`${app.accentColor} mb-4`}>{app.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                {app.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">{app.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-400 transition-colors group-hover:text-gray-600">
                <span>Open tool</span>
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
