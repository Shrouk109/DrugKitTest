/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function AllDrugs() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const drugsPerPage = 8;
  const [categoryCount, setCategoryCount] = useState(0);

  const categoryName = state?.categoryName;

  const handleViewDetails = (drugName) => {
    const encodedDrugName = encodeURIComponent(drugName);
    navigate(`/drugdetails/${encodedDrugName}`, {
      state: { categoryName },
    });
  };

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://drugkit.runasp.net/api/Drug/GetCategoryDrugs${id}?pageNumber=${currentPage}&pageSize=${drugsPerPage}`
        );
        setDrugs(data.result);
        setCategoryCount(data.categoryCount);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, [id, currentPage]);

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
      <h1 className="text-4xl py-8 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[30%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[80%] bg-clip-text text-transparent">
        {state?.categoryName}
      </h1>

      <div className="flex mx-auto items-center bg-[var(--bg-search)] border border-[var(--border-search)] rounded-full shadow-md px-6 py-3 max-w-[50%]">
        <input
          type="text"
          placeholder="Search for a medicine or by category..."
          className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      <button
        className="block mx-auto my-8 bg-[var(--primary-color)] text-[var(--third-color)] duration-700 cursor-pointer font-semibold px-8 py-2 rounded-lg 
        hover:bg-[#1A237E] hover:shadow-[0_0_12px_rgba(26,35,126,0.5)] hover:scale-[1.01] transition-all ease-in-out"
      >
        Search Now
      </button>

      <section className="bg-[var(--secondary-color)] py-20 mt-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
              {drugs.map((drug) => {
                const drugName = drug.name.split(" ").slice(0, 2).join(" ");
                return (
                  <div
                    key={drug.id}
                    className="bg-white shadow-lg rounded-lg hover:cursor-pointer hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] transition-all"
                    onClick={() => handleViewDetails(drug.name)}
                  >
                    <img
                      src={`https://drugkit.runasp.net/${drug.imageUrl}`}
                      alt={drug.name}
                      className="w-full rounded-t-lg"
                    />
                    <div className="p-2 text-center">
                      <h3 className="text-lg font-bold text-[var(--primary-color)] truncate">
                        {drugName}
                      </h3>
                      <p className="text-gray-600 mt-1 font-semibold">
                        {drug.price} EGP
                      </p>
                    </div>
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
