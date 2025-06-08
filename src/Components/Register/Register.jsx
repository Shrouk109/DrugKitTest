/*eslint-disable*/
import { useContext, useState } from "react";
import styles from "./register.module.css";
import { Eye, EyeOff, Link } from "lucide-react";
import registerImage from "../../assets/Register/imageedit_2_7018275306 1.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { userContext } from "../../Context/userContext";

export default function Register() {
  // let {userData , setUserData} = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // handle register
  async function handleRegister(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/register",
        values
      );
      // setUserData(data.token);
      navigate("/confirm-email", { state: { email: values.email , password: values.password, } });

      if (data.errors && data.errors.name) {
        setNameError(data.errors.name);
      }
    } catch (error) {
      if (error.response?.data) {
        // console.log(error.response?.data);
        setEmailError(error.response?.data);
      }
      
    } finally {
      setLoading(false);
    }
  }

  // when click sign in 
  const handleSignInClick = () => {
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  // validation
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum length is 3")
      .max(50, "Maximum length is 50")
      .required("Name is required")
      .test(
        "is-three-words",
        "Name must contain at least three words",
        (value) => {
          return value && value.trim().split(/\s+/).length >= 3;
        }
      ),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (e.g. !, @, #, $, etc.)"
      )
      .required("Password is required"),

    phoneNumber: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "Enter a valid Egyptian number (11 digits, starts with 010, 011, 012, or 015)"
      )
      .required("Phone is required"),
  });

  // formik
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-4xl flex flex-col md:flex-row">
        {/* image */}
        <div className="w-full p-4 md:w-1/2 mb-8 md:mb-0 hidden md:block">
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* form */}
        <div className="w-full md:w-1/2 px-6 py-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#0c1467] text-center mb-6">
              Create an Account
            </h2>

            {emailError && (
              <div
                className="p-3 mb-2 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {emailError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#0c1467]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
                />
              </div>

              {formik.touched.name && formik.errors.name && (
                <div
                  className="p-3 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  {formik.errors.name}
                </div>
              )}

              {nameError && (
                <div
                  className="p-3 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  {nameError}
                </div>
              )}

              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0c1467]"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                <div
                  className="p-3 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              )}

              {/* phone */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-[#0c1467]"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
                />
              </div>

              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div
                  className="p-3 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  {formik.errors.phoneNumber}
                </div>
              )}

              {/* password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#0c1467]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0c1467] focus:border-[#0c1467] outline-none"
                  />

                  {/* show & hide password */}
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#0c1467]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </span>
                </div>
              </div>

              {formik.touched.password && formik.errors.password && (
                <div
                  className="p-3 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              )}

              {/* sign up */}
              {loading ? (
                <button
                  type="submit"
                  className="w-full bg-[#0c1467] text-white py-2 rounded-lg font-semibold hover:bg-[#101c7e] transition"
                >
                  <FaSpinner className={`${styles.spin} mx-auto`} size={24} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#0c1467] text-white py-2 rounded-lg font-semibold hover:bg-[#101c7e] transition"
                >
                  Sign up
                </button>
              )}

              {/* links */}
              <p className="text-center text-sm mt-3">
                Already have an account?{" "}
                <button
                type="button"
                  onClick={handleSignInClick}
                  className="text-[#0c1467] font-semibold hover:underline cursor-pointer bg-transparent border-none"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
