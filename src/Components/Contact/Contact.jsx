/*eslint-disable*/
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0c1467] via-[#1a237e] to-[#3f51b5] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Get In <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Have questions about our services? We'd love to hear from you. Send
            us a message and we'll respond as soon as possible.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-[var(--subtitle)] leading-relaxed">
                We're here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-[var(--primary-color)] to-[#3f51b5] rounded-xl p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">
                      Office Address
                    </h3>
                    <p className="text-[var(--subtitle)]">
                      123 Healthcare Street
                      <br />
                      Medical District, Cairo
                      <br />
                      Egypt, 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-[var(--primary-color)] to-[#3f51b5] rounded-xl p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">
                      Phone Number
                    </h3>
                    <p className="text-[var(--subtitle)]">
                      +20 123 456 7890
                      <br />
                      +20 987 654 3210
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Fri 9AM-6PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-[var(--primary-color)] to-[#3f51b5] rounded-xl p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">
                      Email Address
                    </h3>
                    <p className="text-[var(--subtitle)]">
                      info@drugkit.com
                      <br />
                      support@drugkit.com
                    </p>
                    <p className="text-sm text-gray-500 mt-1">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.482-1.995.699 0 1.037.524 1.037 1.155 0 .703-.449 1.753-.68 2.72-.194.821.411 1.492 1.219 1.492 1.463 0 2.586-1.544 2.586-3.774 0-1.97-1.417-3.348-3.441-3.348-2.344 0-3.717 1.759-3.717 3.578 0 .708.273 1.466.614 1.878.067.082.077.154.057.238-.062.26-.199.837-.226.954-.035.146-.114.177-.263.107-1.025-.479-1.666-1.982-1.666-3.186 0-2.597 1.886-4.978 5.436-4.978 2.854 0 5.077 2.033 5.077 4.754 0 2.837-1.789 5.116-4.273 5.116-.834 0-1.622-.434-1.89-1.016l-.513 1.952c-.185.72-.685 1.621-1.019 2.171A11.991 11.991 0 0012.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-4">
                Send us a Message
              </h2>
              <p className="text-[var(--subtitle)]">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--primary-color)] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-sm peer-focus:top-1 peer-focus:text-[var(--primary-color)] peer-valid:text-sm peer-valid:top-1"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--primary-color)] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-sm peer-focus:top-1 peer-focus:text-[var(--primary-color)] peer-valid:text-sm peer-valid:top-1"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--primary-color)] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-sm peer-focus:top-1 peer-focus:text-[var(--primary-color)] peer-valid:text-sm peer-valid:top-1"
                >
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--primary-color)] focus:outline-none transition-colors bg-gray-50 focus:bg-white resize-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-sm peer-focus:top-1 peer-focus:text-[var(--primary-color)] peer-valid:text-sm peer-valid:top-1"
                >
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[#3f51b5] text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                By submitting this form, you agree to our{" "}
                <a
                  href="#"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-[var(--secondary-color)] py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[var(--subtitle)] max-w-2xl mx-auto">
              Find quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <details className="bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="p-6 cursor-pointer font-semibold text-[var(--primary-color)] hover:bg-gray-50 transition-colors">
                How quickly do you respond to messages?
              </summary>
              <div className="px-6 pb-6 text-[var(--subtitle)]">
                We typically respond to all inquiries within 24 hours during
                business days. For urgent matters, please call our phone number
                directly.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="p-6 cursor-pointer font-semibold text-[var(--primary-color)] hover:bg-gray-50 transition-colors">
                What are your business hours?
              </summary>
              <div className="px-6 pb-6 text-[var(--subtitle)]">
                Our office is open Monday through Friday, 9:00 AM to 6:00 PM
                (GMT+2). However, our support team is available 24/7 for urgent
                inquiries.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="p-6 cursor-pointer font-semibold text-[var(--primary-color)] hover:bg-gray-50 transition-colors">
                Can I schedule a consultation?
              </summary>
              <div className="px-6 pb-6 text-[var(--subtitle)]">
                Yes! You can request a consultation through this contact form or
                call us directly. We'll work with you to find a convenient time
                for both parties.
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
