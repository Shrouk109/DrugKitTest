/*eslint-disable*/
import React from "react";

export default function Contact() {
  return (
    <>
      <h1 className="text-4xl sm:text-3xl pt-8 pb-4 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[40%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[60%] bg-clip-text text-transparent">
        Contact Us
      </h1>

      <p className="text-center font-bold text-md sm:text-sm mb-14 px-4 leading-relaxed text-[var(--primary-color)]">
        Get in touch with us for any inquiries or support. We’re here to help!
      </p>

      {/* contact Section */}
      <section className="bg-[var(--secondary-color)] py-20 mt-16 px-4 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Got questions? Fill out the form, and we'll <br /> get back to you soon!
          </p>
        </div>

        {/* form */}
        <div className="container mx-auto px-6 md:px-12">
          <form className="max-w-xl mx-auto w-full">
            <div className="mb-5">
              {/* <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label> */}
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                placeholder="Shrouk Ahmed"
              />
            </div>

            <div className="mb-5">
              {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label> */}
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                placeholder="name@example.com"
              />
            </div>

            <div className="mb-5">
              {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                Message
              </label> */}
              <textarea
                id="message"
                rows={5}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                placeholder="Your message..."
              />
            </div>

            <button
              className="block mx-auto shadow-md mt-6 bg-[var(--primary-color)] text-[var(--third-color)] duration-700 cursor-pointer font-semibold px-6 py-2 rounded-lg 
        hover:bg-[#1A237E] hover:shadow-[0_0_12px_rgba(26,35,126,0.5)] hover:scale-[1.01] transition-all ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
