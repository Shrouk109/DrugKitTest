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
            {alternatives.map((alt) => {
              const altName = alt.name.split(" ").slice(0, 2).join(" ");
              return (
                <div
                  key={alt.id}
                  className="bg-white shadow-lg rounded-lg hover:cursor-pointer hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] transition-all"
                  onClick={() => handleViewDetails(alt.name)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                      src={`https://drugkit.runasp.net/${alt.imageUrl}`}
                      alt={alt.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(alt.id)}
                      style={{
                        display: imageErrors[alt.id] ? "none" : "block",
                      }}
                    />
                    {imageErrors[alt.id] && (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-10 h-10 text-gray-400 mx-auto mb-1"
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
                          <p className="text-xs text-gray-500 font-medium">
                            Image not available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="text-lg font-bold text-[var(--primary-color)] truncate">
                      {altName}
                    </h3>
                    <p className="text-gray-600 mt-1 font-semibold">
                      {alt.price} EGP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
