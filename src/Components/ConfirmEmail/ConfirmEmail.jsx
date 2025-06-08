/* eslint-disable */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ConfirmEmail.module.css";
import { FaSpinner } from "react-icons/fa";

export default function ConfirmEmail() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [timer, setTimer] = useState(30);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const password = location.state?.password;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-600">No Email Found</h2>
          <p className="text-gray-600 mt-2">
            Please register first before confirming your email.
          </p>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://drugkit.runasp.net/api/Authentication/verify-registration-code",
        {
          email,
          verificationCode: code,
          password,
        }
      );
      console.log(data);
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage("");
    setError("");

    try {
      let {data}=await axios.post(
        "https://drugkit.runasp.net/api/Authentication/resend-verification-code",
        { email }
      );
      console.log(data)
      setResendMessage(data);
      setTimer(30);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#0c1467] mb-4">
          Confirm Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          Please enter the 6-digit code we sent to{" "}
          <span className="font-medium">{email}</span>
        </p>

        {error && (
          <div className="text-red-600 text-sm mb-4 bg-red-100 py-2 px-3 rounded">
            {error}
          </div>
        )}

        {resendMessage && (
          <div className="text-green-600 text-sm mb-4 bg-green-100 py-2 px-3 rounded">
            {resendMessage}
          </div>
        )}

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter confirmation code"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c1467] mb-4"
        />

        <button
          onClick={handleConfirm}
          disabled={loading || code.length < 6}
          className="w-full bg-[#0c1467] text-white py-2 rounded-lg font-semibold hover:bg-[#101c7e] transition disabled:opacity-50"
        >
          {loading ? (
            <FaSpinner className={`${styles.spin} mx-auto`} size={24} />
          ) : (
            "Verify"
          )}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          Didn’t receive a code?{" "}
          <button
            onClick={handleResend}
            disabled={timer > 0 || resendLoading}
            className="text-[#0c1467] font-medium hover:underline disabled:opacity-50"
          >
            {resendLoading
              ? "Sending..."
              : `Resend ${timer > 0 ? `in ${timer}s` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
