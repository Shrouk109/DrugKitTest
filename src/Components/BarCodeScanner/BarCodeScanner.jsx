/*eslint-disable*/
import React, { useEffect, useState } from "react";
import style from "./BarCodeScanner.module.css";
// Barcode decoding
import jsQR from "jsqr";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function BarCodeScanner() {
  const [imagePreview, setImagePreview] = useState(null);
  const [barcodeData, setBarcodeData] = useState(null);
  const [drugDetails, setDrugDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle image upload and decode barcode via API
  const handleImageUpload = async (e) => {
    // 1. Reset previous state
    setBarcodeData(null);
    setDrugDetails(null);
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setImagePreview(URL.createObjectURL(file));
    try {
      // 2. إرسال الصورة إلى API لاستخراج الباركود
      const formData = new FormData();
      formData.append("file", file);
      // جلب التوكن من اللوكال ستورج
      const userToken = localStorage.getItem("userToken");
      const scanRes = await axios.post(
        "https://drugkit.runasp.net/api/Drug/BarCodeScan",
        formData,
        {
          headers: {
            Authorization: userToken ? `Bearer ${userToken}` : undefined,
          },
        }
      );
      // 3. استخراج الباركود من الاستجابة
      const barcode =
        scanRes.data?.barCode || scanRes.data?.barcode || scanRes.data;
      console.log("Barcode:", barcode);
      if (!barcode) {
        setError("No barcode detected in the image.");
        setLoading(false);
        return;
      }
      setBarcodeData(barcode);
      // تم حذف جلب تفاصيل الدواء بناءً على الباركود
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Failed to extract barcode."
      );
      setBarcodeData(null);
      setDrugDetails(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f7faff] to-[#e3eaff] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6 border border-[#e3eaff] relative overflow-hidden">
        {/* Animated barcode icon */}
        {/* <div className="absolute -top-8 right-8 animate-bounce-slow z-0 opacity-10 pointer-events-none">
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#0a2e68"
          >
            <rect x="3" y="5" width="2" height="14" rx="1" fill="#0a2e68" />
            <rect x="7" y="5" width="2" height="14" rx="1" fill="#c33c54" />
            <rect x="11" y="5" width="2" height="14" rx="1" fill="#0a2e68" />
            <rect x="15" y="5" width="2" height="14" rx="1" fill="#c33c54" />
            <rect x="19" y="5" width="2" height="14" rx="1" fill="#0a2e68" />
          </svg>
        </div> */}
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
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Barcode Preview"
            className="w-40 h-40 object-contain rounded-lg border border-[#e3eaff] animate-pop-in"
          />
        )}
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
          <div className="w-full flex flex-col items-center">
            <h2 className="font-bold text-[#0a2e68] mb-2">Barcode</h2>
            {typeof barcodeData === "object" ? (
              <pre className="text-gray-700 break-words">
                {JSON.stringify(barcodeData, null, 2)}
              </pre>
            ) : (
              <div className="text-gray-700 break-words">{barcodeData}</div>
            )}
          </div>
        )}
        {drugDetails && (
          <div className="w-full flex justify-center animate-fade-in delay-300">
            <Card className="w-full max-w-sm overflow-hidden">
              <div className="w-full bg-gradient-to-r from-[#e3eaff] to-[#f7faff] flex justify-center items-center p-4">
                {drugDetails.imageUrl ? (
                  <img
                    src={drugDetails.imageUrl}
                    alt={drugDetails.name}
                    className="w-24 h-24 object-contain rounded-lg border border-[#e3eaff] bg-white shadow"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-[#f7faff] rounded-lg border border-[#e3eaff] text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <CardHeader className="items-center">
                <CardTitle className="mb-1 text-center">
                  {drugDetails.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-2">
                <div className="text-gray-600 text-sm mb-2 text-center min-h-[32px]">
                  {drugDetails.description}
                </div>
                <div className="flex flex-col gap-1 w-full text-sm">
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#0a2e68]">
                      Company:
                    </span>{" "}
                    <span>{drugDetails.company}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#0a2e68]">
                      Barcode:
                    </span>{" "}
                    <span>{drugDetails.barcode}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#0a2e68]">Price:</span>{" "}
                    <span>{drugDetails.price} EGP</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#0a2e68]">
                      Dosage Form:
                    </span>{" "}
                    <span>{drugDetails.dosage_form}</span>
                  </div>
                  {drugDetails.sideEffects && (
                    <div className="flex flex-col w-full">
                      <span className="font-semibold text-[#0a2e68]">
                        Side Effects:
                      </span>
                      <span className="text-gray-700">
                        {drugDetails.sideEffects}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
