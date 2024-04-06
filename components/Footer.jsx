import Image from "next/image";
import Underline from "./Underline";

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export default function Footer() {
  const myTime = convertTZ(new Date(), "Asia/Jakarta");
  return (
    <footer className="rounded-tl-4xl rounded-tr-4xl bg-gray-50 pb-10 pt-12 shadow-[0_0_20px_#00000022]">
      <div className="container mx-auto">
        <div className="mb-12 flex justify-center">
          <p className="inline bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-center font-mavenpro text-4xl font-semibold text-gray-800 text-transparent">
            Thanks for reading!
          </p>
        </div>
        <hr className="mb-4 h-1 w-full bg-indigo-100" />
        <div className="flex items-start justify-between">
          <p className="font-nunito text-xl font-semibold text-gray-500">
            © 2024 Handcrafted by Hieu
          </p>
          <p className="font-nunito font-bold text-gray-300">
            LOCAL TIME:
            <span className="ml-4 text-gray-500">
              {myTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
              GMT+7
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
