/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { PiMapPinAreaBold } from "react-icons/pi";
import {
  MdOutlineQrCodeScanner,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import { TbBrandWechat } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import InteractionCheckerIcon from "../InteractionCheckerIcon/InteractionCheckerIcon";
import Categories from "../Categories/Categories";
import Slider from "../Slider/Slider";
import axios from "axios";
import Loading from "../Loading/Loading";
import PharmacyLocator from "../PharmacyLocator/PharmacyLocator";
import { useNavigate } from "react-router-dom";
import { Spotlight } from "../ui/spotlight";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import SearchToggle from "../comp-436";
import { useAutocomplete } from "../../hooks/useAutocomplete";
import { useAlternatives } from "../../hooks/useAlternatives";
import { useCategories } from "../../hooks/useCategories";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [shouldFetchAlternatives, setShouldFetchAlternatives] = useState(false);
  const alternativesRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Use React Query for categories
  const { data: AllCategory = [], isLoading: loading, error } = useCategories();

  // Use React Query for autocomplete
  const { data: suggestions = [], isLoading: isLoadingSuggestions } =
    useAutocomplete(searchTerm, showSuggestions);

  // Use React Query for alternatives
  const {
    data: alternatives = [],
    isLoading: isLoadingAlternatives,
    error: alternativesError,
  } = useAlternatives(selectedDrug, shouldFetchAlternatives);

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      // Set the selected drug and enable fetching alternatives
      setSelectedDrug(searchTerm.trim());
      setShouldFetchAlternatives(true);
      // Scroll to alternatives section
      alternativesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchTerm(query);
    setShowSuggestions(query.length >= 2);
  }

  const handleSuggestionClick = (suggestion) => {
    setSelectedDrug(suggestion);
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setShouldFetchAlternatives(true);
    // Scroll to alternatives section
    alternativesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* <h1 className="text-4xl pt-10 pb-5 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[30%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[80%] bg-clip-text text-transparent">
        Find the Right Medicine Easily!
      </h1> */}

      {/* Search Input with AutoComplete */}

      <div className="relative w-full px-8 py-3 mx-auto">
        <div className="relative flex py-16 w-full  rounded-2xl  antialiased md:items-center md:justify-center">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
              "[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]",
              "overflow-hidden rounded-2xl bg-[#1A2045]"
            )}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-[#1A2045] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

          {/* <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="white"
          /> */}

          <div className="relative flex flex-col items-center gap-14 z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
            <h1 className="relative z-20 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500 bg-clip-text py-8 text-6xl font-bold text-transparent">
              Find the Right Medicine Easily!
            </h1>

            <SearchToggle />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-5 w-[90%] max-w-3xl mx-auto relative">
        {/* {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow z-10 max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => setQuery(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {noResults && (
          <p className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow z-10 max-h-60 overflow-y-auto text-center text-red-500">
            No drug found
          </p>
        )} */}
      </div>

      {/* Features Section */}
      <section className="bg-[var(--secondary-color)] py-20 mt-16">
        <div className="text-center mb-14">
          <h2 className="section-title">Our Key Features</h2>
          <p className="section-subtitle">
            A smarter way to manage your medications <br /> and stay healthy
          </p>
        </div>

        <div className="container mx-auto px-9">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 justify-center">
            <div className="card">
              <div className="card-icon">
                <MdOutlineDocumentScanner className="card-icon-svg" />
              </div>
              <h3 className="card-title">Prescription Scanner</h3>
              <p className="card-description">
                Upload a prescription image and get instant drug identification.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <InteractionCheckerIcon />
              </div>
              <h3 className="card-title">Interaction Checker</h3>
              <p className="card-description">
                Check if your medications are safe to take together.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <PiMapPinAreaBold className="card-icon-svg" />
              </div>
              <h3 className="card-title">Pharmacy Locator</h3>
              <p className="card-description">
                Find pharmacies near you with available stock.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <MdOutlineQrCodeScanner className="card-icon-svg" />
              </div>
              <h3 className="card-title">Barcode Scanner</h3>
              <p className="card-description">
                Scan a barcode to get instant drug details.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <TbBrandWechat className="card-icon-svg" />
              </div>
              <h3 className="card-title">AI Chatbot</h3>
              <p className="card-description">
                Describe your symptoms and get AI-powered drug suggestions.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <BiSearch className="card-icon-svg" />
              </div>
              <h3 className="card-title">Drug Search</h3>
              <p className="card-description">
                Search for medicines by name or category and find the best
                options for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="text-center mb-14">
          <h2 className="section-title">Categories</h2>
          <p className="section-subtitle">
            Find medications based on their <br />
            category.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="container mx-auto px-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 p-4">
              {AllCategory.map((category) => (
                <Categories key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Pharmacy Locator */}
      <section className="py-20 bg-[var(--secondary-color)]">
        <div className="text-center mb-14">
          <h2 className="section-title">Find Nearby Pharmacies</h2>
          <p className="section-subtitle">
            Quickly locate pharmacies close to <br />
            your current location.
          </p>
        </div>

        <PharmacyLocator />
      </section>

      {/* Alternatives Section */}
      {/* <section ref={alternativesRef} className="py-20" id="alternatives">
        <div className="text-center mb-14">
          <h2 className="section-title">Find Drug Alternatives</h2>
          <p className="section-subtitle">
            Enter a drug name to find safe <br />
            and effective alternatives
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10" ref={searchInputRef}>
            <div className="flex justify-center mt-6">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Enter drug name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="px-4 py-2 rounded-l-lg border border-gray-300 outline-0 w-full pr-20"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setShowSuggestions(false);
                      setShouldFetchAlternatives(false);
                      setSelectedDrug("");
                    }}
                    className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={handleSearchClick}
                  className="absolute right-0 top-0 bottom-0 bg-[var(--primary-color)] text-[var(--third-color)] cursor-pointer px-6 rounded-r-lg hover:bg-opacity-90 transition duration-200"
                >
                  Search
                </button>
              </div>
            </div>
            {showSuggestions &&
              (isLoadingSuggestions || suggestions.length > 0) && (
                <div className="suggestions-list mt-4 bg-white text-left border border-gray-300 rounded-lg shadow-lg max-w-lg mx-auto overflow-y-auto max-h-[300px]">
                  {isLoadingSuggestions ? (
                    <div className="px-4 py-2 text-gray-500 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading suggestions...
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="suggestion-item px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        {suggestion}
                      </div>
                    ))
                  ) : searchTerm.length >= 2 ? (
                    <div className="px-4 py-2 text-red-500">No drugs found</div>
                  ) : null}
                </div>
              )}
          </div>

          {shouldFetchAlternatives && (
            <div className="mt-8">
              {isLoadingAlternatives ? (
                <div className="bg-white rounded-lg shadow p-6 text-center max-w-3xl mx-auto">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading alternatives for "{selectedDrug}"...
                  </div>
                </div>
              ) : alternativesError ? (
                <div className="bg-white rounded-lg shadow p-6 text-center max-w-3xl mx-auto">
                  <div className="text-red-500 text-lg mb-4">
                    {alternativesError.message === "Token not found"
                      ? "Please log in to view alternatives"
                      : "Failed to fetch alternatives"}
                  </div>
                  <button
                    onClick={() => {
                      setShouldFetchAlternatives(false);
                      setSelectedDrug("");
                      setSearchTerm("");
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Try Again
                  </button>
                </div>
              ) : alternatives.length > 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-left max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4">
                    Alternatives for:{" "}
                    <span className="text-[var(--primary-color)]">
                      {selectedDrug}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {alternatives.map((alt, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/drugdetails/${encodeURIComponent(
                              alt.name || alt
                            )}`,
                            {
                              state: { categoryName: "Alternatives" },
                            }
                          )
                        }
                      >
                        {typeof alt === "object" ? (
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {alt.name}
                            </h4>
                            {alt.price && (
                              <p className="text-gray-600">{alt.price} EGP</p>
                            )}
                          </div>
                        ) : (
                          <div className="font-medium text-gray-800">{alt}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/alternatives/${encodeURIComponent(selectedDrug)}`
                        )
                      }
                      className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                    >
                      View All Alternatives
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center max-w-3xl mx-auto">
                  <div className="text-gray-500 text-lg mb-4">
                    No alternatives found for "{selectedDrug}"
                  </div>
                  <button
                    onClick={() => {
                      setShouldFetchAlternatives(false);
                      setSelectedDrug("");
                      setSearchTerm("");
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Search Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="bg-[var(--secondary-color)] py-20">
        <div className="text-center mb-14">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Discover how our platform helps <br />
            you find medications easily <br />
            and stay safe.
          </p>
        </div>

        <div className="container px-9">
          <Slider />
        </div>
      </section>
    </div>
  );
}
