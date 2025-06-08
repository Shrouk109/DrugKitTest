/* eslint-disable */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import styles from "./CheckResetCode.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function CheckResetCode() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d+$/, "Code must be numbers only"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleCheckCode,
  });

  async function handleCheckCode(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/check-reset-code",
        { email, resetCode: values.resetCode }
      );

      toast.success("Code verified successfully!");
      setTimeout(() => {
        navigate("/resetpassword", {
          state: { email, resetCode: values.resetCode },
        });
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid code";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-[#0c1467] text-center mb-6">
          Enter Reset Code
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resetCode" className="block text-sm font-medium text-[#0c1467]">
              Reset Code
            </label>
            <input
              id="resetCode"
              name="resetCode"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
              placeholder="Enter the code sent to your email"
              value={formik.values.resetCode}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <div className="text-sm text-red-600 mt-1">
                {formik.errors.resetCode}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0c1467] text-white py-2 rounded-lg font-semibold hover:bg-[#101c7e] transition"
          >
            {loading ? (
              <FaSpinner className={`${styles.spin} mx-auto`} size={24} />
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
