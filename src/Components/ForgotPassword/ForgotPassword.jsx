/* eslint-disable */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendResetLink,
  });

  async function sendResetLink(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/forget-password",
        values
      );

      toast.success(data); //  Toast success message

      setTimeout(() => {
        navigate("/check-reset-code", { state: { email: values.email } });
      }, 1500);
    } catch (err) {
      toast.error("Email not found"); //  Toast error message
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Toaster position="top-center" reverseOrder={false} /> {/* Hot toast UI */}

      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-[#0c1467] text-center mb-6">
          Forgot Password?
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#0c1467]"
            >
              Enter your email to reset password
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.email && formik.errors.email && (
            <div
              className="p-3 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0c1467] text-white py-2 rounded-lg font-semibold hover:bg-[#101c7e] transition"
          >
            {loading ? (
              <FaSpinner className={`${styles.spin} mx-auto`} size={24} />
            ) : (
              "Send Reset code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
