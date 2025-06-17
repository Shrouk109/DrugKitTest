/*eslint-disable*/
import React, { useEffect, useState } from "react";
import style from "./BarCodeScanner.module.css";
// Barcode decoding
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
      setDrugDetails(scanRes.data[0]);
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
        {/* {barcodeData && (
          <div className="w-full flex flex-col items-center animate-fade-in delay-200">
            <div className="w-full max-w-sm bg-gradient-to-br from-[#f7faff] to-[#e3eaff] rounded-2xl shadow-xl border border-[#e3eaff] p-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 mb-2">
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#0a2e68"
                >
                  <rect
                    x="3"
                    y="6"
                    width="2"
                    height="12"
                    rx="1"
                    fill="#0a2e68"
                  />
                  <rect
                    x="7"
                    y="4"
                    width="2"
                    height="16"
                    rx="1"
                    fill="#0a2e68"
                  />
                  <rect
                    x="11"
                    y="6"
                    width="2"
                    height="12"
                    rx="1"
                    fill="#0a2e68"
                  />
                  <rect
                    x="15"
                    y="4"
                    width="2"
                    height="16"
                    rx="1"
                    fill="#0a2e68"
                  />
                  <rect
                    x="19"
                    y="6"
                    width="2"
                    height="12"
                    rx="1"
                    fill="#0a2e68"
                  />
                </svg>
                <h2 className="font-bold text-[#0a2e68] text-xl">
                  Barcode Data
                </h2>
              </div>
              <div className="w-full bg-white rounded-lg px-4 py-2 border border-[#e3eaff] text-center text-gray-800 text-base font-mono shadow-sm">
                {typeof barcodeData === "object" ? (
                  <pre className="break-words whitespace-pre-wrap text-sm">
                    {JSON.stringify(barcodeData, null, 2)}
                  </pre>
                ) : (
                  <span className="break-words text-lg">{barcodeData}</span>
                )}
              </div>
            </div>
          </div>
        )} */}
        {drugDetails && (
          <div className="w-full flex justify-center animate-fade-in delay-300">
            <Card className="w-full max-w-sm overflow-hidden shadow-2xl rounded-2xl border border-[#e3eaff] bg-gradient-to-br from-[#f7faff] to-[#e3eaff]">
              <div className="w-full flex flex-col items-center p-6 pb-2">
                <div className="relative mb-2">
                  {drugDetails.imageUrl ? (
                    <img
                      src={`https://drugkit.runasp.net/Images/DrugImages/${encodeURIComponent(
                        drugDetails.imageUrl.split("/").at(-1)
                      )}`}
                      alt={drugDetails.name}
                      className="w-24 h-24 object-contain rounded-xl border border-[#e3eaff] bg-white shadow"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-[#f7faff] rounded-xl border border-[#e3eaff] text-gray-400 text-xs">
                      <svg
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#b0b8d1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 3v5.25M21 12a9 9 0 1 1-6.49-8.649"
                        />
                        <circle cx="12" cy="9" r="2" strokeWidth="2" />
                        <path d="M12 14v5l3-3m-6 0l3 3" strokeWidth="2" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-[#0a2e68] text-lg mb-1 text-center w-full truncate">
                  {drugDetails.name || (
                    <span className="italic text-gray-400">No name</span>
                  )}
                </h3>
                <p className="text-gray-600 text-xs text-center mb-2 min-h-[32px]">
                  {drugDetails.description || (
                    <span className="italic text-gray-400">
                      No description available.
                    </span>
                  )}
                </p>
              </div>
              <CardContent className="flex flex-col gap-3 px-6 pb-6">
                <div className="flex items-center justify-between w-full text-sm py-1 border-b border-[#e3eaff] last:border-b-0">
                  <span className="font-semibold text-[#0a2e68] flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#0a2e68"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Company:
                  </span>
                  <span>
                    {drugDetails.company || (
                      <span className="italic text-gray-400">No company</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full text-sm py-1 border-b border-[#e3eaff] last:border-b-0">
                  <span className="font-semibold text-[#0a2e68] flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#0a2e68"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10M7 17h7"
                      />
                      <rect x="3" y="9" width="2" height="8" fill="#0a2e68" />
                      <rect x="6" y="7" width="2" height="10" fill="#0a2e68" />
                      <rect x="10" y="9" width="2" height="8" fill="#0a2e68" />
                      <rect x="14" y="7" width="2" height="10" fill="#0a2e68" />
                      <rect x="18" y="9" width="2" height="8" fill="#0a2e68" />
                    </svg>
                    Barcode:
                  </span>
                  <span>
                    {drugDetails.barcode || (
                      <span className="italic text-gray-400">No barcode</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full text-sm py-1 border-b border-[#e3eaff] last:border-b-0">
                  <span className="font-semibold text-[#0a2e68] flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#0a2e68"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    Price:
                  </span>
                  <span>
                    {drugDetails.price ? (
                      `${drugDetails.price} EGP`
                    ) : (
                      <span className="italic text-gray-400">No price</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full text-sm py-1 border-b border-[#e3eaff] last:border-b-0">
                  <span className="font-semibold text-[#0a2e68] flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#0a2e68"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 3v5.25M21 12a9 9 0 1 1-6.49-8.649"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        strokeWidth="2"
                        fill="#0a2e68"
                      />
                      <circle
                        cx="8"
                        cy="18"
                        r="2"
                        strokeWidth="2"
                        fill="#0a2e68"
                      />
                      <circle
                        cx="16"
                        cy="18"
                        r="2"
                        strokeWidth="2"
                        fill="#0a2e68"
                      />
                    </svg>
                    Dosage Form:
                  </span>
                  <span>
                    {drugDetails.dosage_form || (
                      <span className="italic text-gray-400">No form</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col w-full text-sm pt-2">
                  <span className="font-semibold text-[#0a2e68] mb-1 flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#0a2e68"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    Side Effects:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(drugDetails.sideEffects) &&
                    drugDetails.sideEffects.length > 0 ? (
                      drugDetails.sideEffects.map((effect, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-[#e3eaff] rounded px-2 py-0.5 text-[#0a2e68] text-xs shadow-sm"
                        >
                          {effect}
                        </span>
                      ))
                    ) : (
                      <span className="italic text-gray-400">
                        No known side effects.
                      </span>
                    )}
                  </div>
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
