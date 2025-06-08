/*eslint-disable*/
import { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import registerImage from "../../assets/Register/imageedit_2_7018275306 1.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { userContext } from "../../Context/userContext";
import google from "../../assets/google/google.png";
import { GoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  let { userData, setUserData } = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // handle Login
  async function handleLogin(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/login",
        values
      );
      // console.log(data.token);
      localStorage.setItem("userToken", data.token);
      setUserData(data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    
      
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response?.data);
        // setEmailError(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle Google login
  // async function handleGoogleLogin(googleToken) {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post(
  //       "https://drugkit.runasp.net/api/Authentication/verify-google-token",
  //       { accessToken: googleToken }
  //     );
  //     localStorage.setItem("userToken", data.token);
  //     setUserData(data.token);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     setEmailError("Google Login Failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function handleGoogleLoginSuccess(response) {
    try {
      const accessToken = response.credential;

      const { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/verify-google-token",
        { accessToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Login Successful ", data);
    } catch (error) {
      // console.error("Login Failed ", error.response?.data || error.message);
    }
  }

  // when click sign Up
  const handleSignUpClick = () => {
    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  // validation
  let validationSchema = Yup.object().shape({
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
  });

  // formik
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-xl shadow-md w-full max-w-4xl flex flex-col md:flex-row">
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

              {/* Forgot Password */}
              <div className="w-full text-right mb-2">
                <Link
                  to={"/forgot-password"}
                  className="text-[#0c1467] text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* sign in */}
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
                  className="w-full bg-[#0c1467] cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-[#101c7e] transition"
                >
                  Sign in
                </button>
              )}

              {/* <button className={styles.googleButton}>
                <div className={styles.iconWrapper}>
                  <img
                    src={google}
                    alt="Google Logo"
                    className={styles.googleIcon}
                  />
                </div>
                <span className={styles.buttonText}>Sign in with Google</span>
              </button> */}

              {/* google login */}
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.error("Google Login Failed ");
                }}
              />

              {/* links */}
              <p className="text-center text-sm mt-3">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-[#0c1467] font-semibold hover:underline cursor-pointer bg-transparent border-none"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* image */}
        <div className="w-full p-4 md:w-1/2 mb-8 md:mb-0 hidden md:block">
          <img
            src={registerImage}
            alt="login"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
