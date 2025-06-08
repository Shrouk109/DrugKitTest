/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories({ category }) {
  
  let base = "https://drugkit.runasp.net/";
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/drugcategory/${category.id}`, {
      state: { categoryName: category.name },
    });
  };

  return (
    <div className="relative bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden group hover:shadow-[0_0_20px_rgba(180,180,180,0.5)] transition-all duration-700">
      <img
        src={`${base}${category.imageUrl}`}
        alt={category.name}
        className="w-full"
      />

      {/* view details*/}
      <button
        onClick={handleViewDetails}
        className="absolute top-2 left-2 bg-[var(--primary-color)] text-white px-5 py-2 text-sm rounded-lg opacity-0 
        group-hover:opacity-100 group-hover:top-1/2 group-hover:left-1/2 
        group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 
        transition-all duration-700 ease-in-out cursor-pointer"
      >
        View Details
      </button>

      <div className="p-3 text-center bg-gray-100 font-semibold text-[var(--primary-color)]">
        {category.name}
      </div>
    </div>
  );
}
