import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
  return (
    <section className="py-48">
      <div className="container mx-auto flex rounded-[56px]">
        <div className="relative mx-8 flex w-1/2 flex-col">
          <h2 className="relative z-10 mb-8 mt-12 font-merriweather text-8xl font-black leading-none tracking-normal text-gray-500">
            Let's <br />
            <span className="text-blue-500">connect</span>
          </h2>
          <p className="mr-16 font-nunito text-2xl font-semibold text-gray-400">
            Open to collaboration or just want to chat? <br />
            Feel free to reach out anytime.
          </p>
          <div className="relative mb-8 flex flex-1 items-end gap-8 text-gray-400">
            <FontAwesomeIcon icon={faGithub} size="3x" className="text-gray-700" />
            <FontAwesomeIcon icon={faFacebook} size="3x" className="text-blue-500" />
            <FontAwesomeIcon icon={faLinkedin} size="3x" className="text-[#0077B5]" />
            <FontAwesomeIcon icon={faTwitter} size="3x" className="text-[#08a0e9]" />
            <FontAwesomeIcon icon={faTwitch} size="3x" className="text-purple-600" />
          </div>
        </div>
        <div className="relative flex w-1/2 justify-center">
          <form className="relative z-10 ml-8 flex w-full max-w-lg flex-col justify-start rounded-3xl bg-gray-50 p-8 shadow-2xl">
            <label
              htmlFor="name"
              className="mb-2 font-nunito text-lg font-semibold tracking-wider text-gray-500"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mb-6 rounded-xl border-2 border-purple-200 bg-purple-50 p-2 text-xl text-gray-800"
            />
            <label
              htmlFor="email"
              className="mb-2 font-nunito text-lg font-semibold tracking-wider text-gray-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mb-6 rounded-xl border-2 border-purple-200 bg-purple-50 p-2 text-xl text-gray-800"
            />
            <label
              htmlFor="message"
              className="mb-2 font-nunito text-lg font-semibold tracking-wider text-gray-500"
            >
              What's on your mind?
            </label>
            <textarea
              id="email"
              type="text"
              rows="3"
              className="mb-12 rounded-xl border-2 border-purple-200 bg-purple-50 p-2 text-xl text-gray-800"
            />
            <button className="via rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-3 font-mavenpro text-xl font-semibold text-white">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
