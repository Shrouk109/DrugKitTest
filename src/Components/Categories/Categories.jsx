/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories({ category }) {
  let base = "https://drugkit.runasp.net/";
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleViewDetails = () => {
    navigate(`/drugcategory/${category.id}`, {
      state: { categoryName: category.name },
    });
  };

  return (
    <div className="relative bg-gray-100 shadow-md border border-gray-200 rounded-2xl overflow-hidden group hover:shadow-[0_0_20px_rgba(180,180,180,0.15)] transition-all duration-700 min-h-[320px] flex flex-col justify-between">
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center p-0">
        <img
          src={`${base}${category.imageUrl}`}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          style={{
            display: imageError ? "none" : "block",
          }}
        />
        {imageError && (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-2"
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

      {/* view details*/}
      <button
        onClick={handleViewDetails}
        className="absolute top-2 left-2 bg-[var(--primary-color)] text-white px-5 py-2 text-sm rounded-lg opacity-0 \
        group-hover:opacity-100 group-hover:top-1/2 group-hover:left-1/2 \
        group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 \
        transition-all duration-700 ease-in-out cursor-pointer"
      >
        View Details
      </button>
      <div className="p-4 text-center bg-gray-100 font-bold text-lg text-[var(--primary-color)]">
        {category.name}
      </div>
    </div>
  );
}
