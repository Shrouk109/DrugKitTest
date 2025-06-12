/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAlternatives } from "../../hooks/useAlternatives";

export default function Alternatives() {
  const { drugName } = useParams();
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState({});

  // Use React Query for fetching alternatives
  const {
    data: alternatives = [],
    isLoading: loading,
    error,
  } = useAlternatives(drugName, true);

  const handleViewDetails = (alternativeName) => {
    const encodedName = encodeURIComponent(alternativeName);
    navigate(`/drugdetails/${encodedName}`, {
      state: { categoryName: "Alternatives" }, // Provide context that this came from alternatives
    });
  };

  const handleImageError = (altId) => {
    setImageErrors((prev) => ({
      ...prev,
      [altId]: true,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl pt-16 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[30%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[80%] bg-clip-text text-transparent">
        Alternatives for {decodeURIComponent(drugName)}
      </h1>

      <section className="py-20 ">
        {error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-xl mb-4">
              {error.message === "Token not found"
                ? "Please log in to view alternatives"
                : "Failed to fetch alternatives"}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg animate-pulse"
              >
                <div className="aspect-[4/3] w-full bg-gray-300 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : alternatives.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 text-xl mb-4">
              No alternatives found for "{decodeURIComponent(drugName)}"
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {alternatives.map((alt) => (
              <div
                key={alt.id}
                className="group relative bg-white shadow-lg rounded-2xl hover:cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                onClick={() => handleViewDetails(alt.name)}
              >
                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-10 bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {alt.price} EGP
                </div>

                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={`https://drugkit.runasp.net/${alt.imageUrl}`}
                    alt={alt.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(alt.id)}
                    style={{
                      display: imageErrors[alt.id] ? "none" : "block",
                    }}
                  />
                  {imageErrors[alt.id] && (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-8 h-8 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                          No Image Available
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[var(--primary-color)] transition-colors duration-300 truncate leading-tight">
                      {alt.name}
                    </h3>
                  </div>
                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-500 font-medium">
                        Available
                      </span>
                    </div>
                    <button className="flex items-center space-x-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:shadow-xl">
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent  transition-all duration-300" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
