import { useState } from "react";
import axios from "axios";

export default function BarCodeScanner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [barcodeData, setBarcodeData] = useState(null);
  const [drugDetails, setDrugDetails] = useState(null);
  // Remove unused imagePreview and navigate

  // Handle image upload and decode barcode via API
  const handleImageUpload = async (e) => {
    setBarcodeData(null);
    setDrugDetails(null);
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    // Remove all setImagePreview and navigate usage
    try {
      // 1. Send image to BarCodeScan API with Authorization header
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const scanRes = await axios.post(
        "https://drugkit.runasp.net/api/Drug/BarCodeScan",
        formData,
        { headers }
      );
      const barcode = scanRes.data?.barCode || scanRes.data?.barcode || scanRes.data;
      console.log("Barcode:", barcode);
      if (!barcode) {
        setError("No barcode detected in the image.");
        setLoading(false);
        return;
      }
      setBarcodeData(barcode);
      setDrugDetails(scanRes.data); // Display whatever the API returns
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Failed to extract barcode or fetch drug details."
      );
      setBarcodeData(null);
      setDrugDetails(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f7faff] to-[#e3eaff] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6 border border-[#e3eaff] relative overflow-hidden">
        <h1 className="text-3xl font-bold text-[#0a2e68] mb-2 animate-slide-down">
          BarCode Scanner
        </h1>
        <p className="text-gray-500 text-center text-base mb-2 animate-fade-in delay-100">
          Upload a barcode image to extract and display its details instantly.
        </p>
        <label
          htmlFor="barcode-upload"
          className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-[#0a2e68] rounded-xl p-6 hover:bg-[#f7faff] transition-all animate-pop-in"
        >
          <svg
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#0a2e68"
            className="mb-2 animate-bounce-fast"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
          <span className="text-[#0a2e68] font-medium animate-fade-in delay-200">
            Click to upload barcode image
          </span>
          <input
            id="barcode-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        {loading && (
          <div className="text-[#0a2e68] font-medium flex items-center gap-2 animate-pulse">
            <svg
              className="animate-spin"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#0a2e68"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="#0a2e68"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Processing...
          </div>
        )}
        {barcodeData && (
          <div className="w-full bg-[#f7faff] rounded-xl p-4 border border-[#e3eaff] text-center animate-fade-in delay-200">
            <h2 className="font-bold text-[#0a2e68] mb-2">Barcode</h2>
            <div className="text-gray-700 break-words">{barcodeData}</div>
          </div>
        )}
        {drugDetails && (
          <div className="w-full bg-[#f7faff] rounded-xl p-4 border border-[#e3eaff] text-center animate-fade-in delay-300">
            <h2 className="font-bold text-[#0a2e68] mb-2">Drug Details</h2>
            <pre className="text-gray-700 text-left whitespace-pre-wrap break-words text-xs md:text-sm">
              {JSON.stringify(drugDetails, null, 2)}
            </pre>
          </div>
        )}
        {error && (
          <div className="text-red-600 font-medium animate-pop-in">{error}</div>
        )}
      </div>
      {/* Animations CSS */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s both; }
        .animate-slide-down { animation: slideDown 0.7s both; }
        .animate-pop-in { animation: popIn 0.5s both; }
        .animate-bounce-slow { animation: bounceSlow 2.5s infinite alternate; }
        .animate-bounce-fast { animation: bounceFast 1s infinite alternate; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-30px);} to { opacity: 1; transform: none; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8);} to { opacity: 1; transform: scale(1);} }
        @keyframes bounceSlow { 0% { transform: translateY(0); } 100% { transform: translateY(20px); } }
        @keyframes bounceFast { 0% { transform: translateY(0); } 100% { transform: translateY(8px); } }
      `}</style>
    </div>
  );
}