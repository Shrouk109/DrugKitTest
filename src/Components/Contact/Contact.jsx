/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum length is 3")
        .max(50, "Maximum length is 50")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      subject: Yup.string()
        .min(3, "Minimum length is 3")
        .required("Subject is required"),
      message: Yup.string()
        .min(5, "Minimum length is 5")
        .required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSuccess(false);
      setError("");
      try {
        await axios.post(
          "https://drugkit.runasp.net/api/Contact/Contact",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setSuccess(true);
        toast.success("Your message has been sent successfully!");
        resetForm();
      } catch (err) {
        const apiError =
          err.response?.data ||
          "An error occurred while sending the message. Please try again.";
        setError(apiError);
        toast.error(apiError);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0c1467] via-[#1a237e] to-[#3f51b5] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Get In <span className="text-[#c33c54]">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Have questions about our services? We'd love to hear from you. Send
            us a message and we'll respond as soon as possible.
          </p>
         
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 bg-white py-16 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-xl">
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

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-2 text-xs text-red-700 bg-red-50 rounded px-2 py-2">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-2 text-xs text-red-700 bg-red-50 rounded px-2 py-2">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                {formik.touched.subject && formik.errors.subject && (
                  <div className="mt-2 text-xs text-red-700 bg-red-50 rounded px-2 py-2">
                    {formik.errors.subject}
                  </div>
                )}
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                {formik.touched.message && formik.errors.message && (
                  <div className="mt-2 text-xs text-red-700 bg-red-50 rounded px-2 py-2">
                    {formik.errors.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-[var(--primary-color)] to-[#3f51b5] text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {/* FAQ Section */}
      <section className=" bg-gray-50 py-16">
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
              <summary className="p-6 cursor-pointer font-semibold text-[var(--primary-color)] hover:bg-gray-100 transition-colors">
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
