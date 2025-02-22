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
    <footer className="bg-blue-50 pb-4 pt-10 shadow-[inset_0_8px_8px_#00000033]">
      <div className="container mx-auto">
        <div className="flex justify-center mb-8">
          <p className="inline text-4xl font-semibold text-center text-blue-500 ">
            Thanks for reading!
          </p>
        </div>
        <hr className="w-full h-1 mb-4 bg-indigo-100" />
        <div className="flex flex-col items-center justify-between gap-2 md:gap-0 md:flex-row">
          <p className="text-xl font-semibold text-gray-500 font-nunito">
            © 2024 Handcrafted by Hieu
          </p>
          <p className="font-bold text-gray-300 font-nunito">
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
