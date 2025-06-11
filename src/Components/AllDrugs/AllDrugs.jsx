/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import SearchToggle from "../comp-436";
import { useCategoryDrugs } from "../../hooks/useCategoryDrugs";

export default function AllDrugs() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const drugsPerPage = 8;
  const [imageErrors, setImageErrors] = useState({});

  const categoryName = state?.categoryName;

  // Use React Query for fetching category drugs
  const {
    data: { result: drugs = [], categoryCount = 0 } = {},
    isLoading: loading,
    error,
  } = useCategoryDrugs(id, currentPage, drugsPerPage, true);

  const handleViewDetails = (drugName) => {
    const encodedDrugName = encodeURIComponent(drugName);
    navigate(`/drugdetails/${encodedDrugName}`, {
      state: { categoryName },
    });
  };

  const handleImageError = (drugId) => {
    setImageErrors((prev) => ({
      ...prev,
      [drugId]: true,
    }));
  };

  // Scroll to top only on the first page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // This effect will run only once when the component mounts

  const totalPages = Math.ceil(categoryCount / drugsPerPage);
  const maxPagesToShow = 5;

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow;
    return new Array(Math.min(maxPagesToShow, totalPages - start))
      .fill()
      .map((_, i) => start + i + 1);
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      {/* <h1 className="text-4xl py-8 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[30%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[80%] bg-clip-text text-transparent">
        {state?.categoryName}
      </h1> */}

      {/* Modern Search Section with same style as Home */}
      <div className="relative w-full px-8 py-3 mx-auto">
        <div className="relative flex py-16 w-full overflow-hidden rounded-2xl bg-[#1A2045] antialiased md:items-center md:justify-center">
          <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1A2045] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

          <div className="relative flex flex-col items-center gap-14 z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
            <h2 className="relative z-20 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500 bg-clip-text py-8 text-6xl font-bold text-transparent">
              Search {state?.categoryName} Medicines
            </h2>

            <SearchToggle />
          </div>
        </div>
      </div>

      <section className="bg-[var(--secondary-color)] py-20 mt-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl animate-pulse overflow-hidden"
              >
                <div className="aspect-[4/3] w-full bg-gray-300 relative">
                  <div className="absolute top-4 right-4 w-16 h-6 bg-gray-400 rounded-full" />
                </div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <div className="h-4 bg-gray-300 rounded w-16" />
                    </div>
                    <div className="h-8 bg-gray-300 rounded-full w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-xl mb-4">
              Failed to load drugs for this category
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : drugs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 text-xl mb-4">
              No drugs found in this category
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
              {drugs.map((drug) => {
                return (
                  <div
                    key={drug.id}
                    className="group relative bg-white shadow-lg rounded-2xl hover:cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    onClick={() => handleViewDetails(drug.name)}
                  >
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 z-10 bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {drug.price} EGP
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={`https://drugkit.runasp.net/${drug.imageUrl}`}
                        alt={drug.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => handleImageError(drug.id)}
                        style={{
                          display: imageErrors[drug.id] ? "none" : "block",
                        }}
                      />
                      {imageErrors[drug.id] && (
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
                          {drug.name}
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
                );
              })}
            </div>

            {/* ✅ Smart Pagination with arrows */}
            <div className="flex justify-center mt-10 px-4">
              <div className="flex gap-2 items-center flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-2 rounded-lg font-semibold bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-40"
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                {getPaginationGroup().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      currentPage === page
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-2 rounded-lg font-semibold bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-40"
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
