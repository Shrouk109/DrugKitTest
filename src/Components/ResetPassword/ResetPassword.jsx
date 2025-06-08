/*eslint-disable*/ 
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import styles from "./ResetPassword.module.css";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const email = location?.state?.email;
  const resetCode = location?.state?.resetCode;

  if (!email || !resetCode) {
    return <div className="text-red-600">Email or Reset Code is missing</div>;
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (e.g. !, @, #, $, etc.)"
      )
      .required("New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  async function handleResetPassword(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/reset-password",
        {
          email,
          resetCode,
          newPassword: values.newPassword,
        }
      );
    
      toast.success("Password reset successful!");

      
      setTimeout(() => {
        navigate("/login");
      }, 1500); 
    } catch (err) {
      toast.error(err.response?.data || "An error occurred!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-[#0c1467] text-center mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* New Password + Eye Icon */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-[#0c1467]"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
                value={formik.values.newPassword}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-sm text-red-600 mt-1">
                {formik.errors.newPassword}
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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
