/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useDrugDetails } from "../../hooks/useDrugDetails";

export default function DrugDetails() {
  const location = useLocation();
  const categoryName = location?.state?.categoryName;
  let { encodedDrugName } = useParams();

  // Decode the drug name from URL params before using it
  const drugName = decodeURIComponent(encodedDrugName);
  const [imageError, setImageError] = useState(false);

  // Use React Query for drug details
  const {
    data: drugDetails,
    isLoading: loading,
    error,
  } = useDrugDetails(drugName, true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [drugName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-[#AA4870] via-[#C53A54] to-[#5B71C1] pt-20 pb-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {drugName}
            </h1>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-white/90 font-medium">
                Home / {categoryName || "Medication"} /{" "}
                {drugName.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-16 px-4 pb-16">
        {loading ? (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-20">
              <Loading />
            </div>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Failed to load drug details
              </h3>
              <p className="text-gray-600 mb-8">
                Something went wrong while fetching the medication information.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#AA4870] to-[#C53A54] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : !drugDetails ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.044-5.709-2.573M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Drug not found
              </h3>
              <p className="text-gray-600 mb-8">
                We couldn't find information for "{drugName}"
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-[#5B71C1] to-[#AA4870] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Main Drug Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#AA4870]/10 to-[#5B71C1]/10"></div>
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={`https://drugkit.runasp.net/${drugDetails.imageUrl}`}
                      alt={drugDetails.name}
                      className="relative w-full h-full object-cover"
                      onError={() => setImageError(true)}
                      style={{
                        display: imageError ? "none" : "block",
                      }}
                    />
                    {imageError && (
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-16 h-16 text-gray-400 mx-auto mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-500 font-medium">
                            Drug image not available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <div className="inline-flex items-center bg-gradient-to-r from-[#AA4870] to-[#C53A54] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {categoryName || "General"}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {drugDetails.name}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {drugDetails.description}
                    </p>
                  </div>

                  {/* Price Card */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                          Price
                        </p>
                        <p className="text-3xl font-bold text-green-700">
                          {drugDetails.price} EGP
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Effects Section */}
            {drugDetails.sideEffects && (
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center bg-red-100 p-4 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Side Effects
                  </h3>
                  <p className="text-gray-600">
                    Important information about potential side effects
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                  {Array.isArray(drugDetails.sideEffects) ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {drugDetails.sideEffects.map((effect, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-red-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">
                            {effect}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <div className="bg-red-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700 font-medium">
                        {drugDetails.sideEffects}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
