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
    <section className="py-16 md:py-48">
      <div className="container mx-auto flex flex-col rounded-[56px] md:flex-row">
        <div className="relative mx-8 flex w-full flex-col md:mx-8 md:w-1/2">
          <h2 className="relative z-10 mb-4 font-merriweather text-5xl font-black leading-none tracking-normal text-gray-500 md:mt-12">
            Let&apos;s <br />
            <span className="text-blue-500">connect</span>
          </h2>
          <p className="mr-16 font-nunito text-lg font-semibold text-gray-400">
            Open to collaboration or just want to chat? <br />
            Feel free to reach out anytime.
          </p>
          <div className="relative my-8 flex items-end gap-8 text-gray-400">
            <FontAwesomeIcon icon={faGithub} size="3x" className="text-gray-700" />
            <FontAwesomeIcon icon={faFacebook} size="3x" className="text-blue-500" />
            <FontAwesomeIcon icon={faLinkedin} size="3x" className="text-[#0077B5]" />
            <FontAwesomeIcon icon={faTwitter} size="3x" className="text-[#08a0e9]" />
            <FontAwesomeIcon icon={faTwitch} size="3x" className="text-purple-600" />
          </div>
        </div>
        <div className="relative flex w-full justify-center md:w-1/2">
          <form className="relative z-10 flex w-full flex-col justify-start rounded-3xl bg-gray-50 p-8 shadow-2xl md:ml-0 md:max-w-lg">
            <label
              htmlFor="name"
              className="mb-2 font-nunito text-base font-semibold tracking-wider text-gray-500"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mb-6 rounded-xl border-2 border-blue-200 bg-white p-2 text-lg text-gray-800"
            />
            <label
              htmlFor="email"
              className="mb-2 font-nunito text-base font-semibold tracking-wider text-gray-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mb-6 rounded-xl border-2 border-blue-200 bg-white p-2 text-lg text-gray-800"
            />
            <label
              htmlFor="message"
              className="mb-2 font-nunito text-base font-semibold tracking-wider text-gray-500"
            >
              What&apos;s on your mind?
            </label>
            <textarea
              id="email"
              type="text"
              rows="3"
              className="mb-12 rounded-xl border-2 border-blue-200 bg-white p-2 text-lg text-gray-800"
            />
            <button className="via rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-3 font-mavenpro text-lg font-semibold text-white">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
