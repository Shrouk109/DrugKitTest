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

export default function Home() {
  const [AllCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [alternatives, setAlternatives] = useState([]);
  const alternativesRef = useRef(null);
  const navigate = useNavigate();

  async function getRecentCategory() {
    try {
      const response = await axios.get(
        "https://drugkit.runasp.net/api/Category"
      );
      setAllCategory(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/alternatives/${searchTerm}`);
    }
  };

  async function handleSearchChange(event) {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(
          `https://drugkit.runasp.net/api/Drug/AutoComplete?prefix=${query}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب اقتراحات الأدوية:", error);
      }
    } else {
      setSuggestions([]);
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSelectedDrug(suggestion);
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const getAlternatives = async (drugName) => {
    try {
      const response = await axios.get(
        `https://drugkit.runasp.net/api/Drug/GetDrugsRecomendationByDrugName?drugName=${drugName}`
      );
      setAlternatives(response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب بدائل الدواء:", error);
    }
  };

  // const handleSearchClick = () => {
  //   if (searchTerm.trim() !== "") {
  //     getAlternatives(searchTerm);
  //     alternativesRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  useEffect(() => {
    getRecentCategory();
  }, []);

  return (
    <div>
      {/* <h1 className="text-4xl pt-10 pb-5 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[30%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[80%] bg-clip-text text-transparent">
        Find the Right Medicine Easily!
      </h1> */}

      {/* Search Input with AutoComplete */}

      <div className="relative w-full px-8 py-3 mx-auto">
        <div className="relative flex py-16 w-full overflow-hidden rounded-2xl bg-[#1A2045] antialiased md:items-center md:justify-center">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
              "[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]"
            )}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1A2045] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

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
      <section ref={alternativesRef} className="py-20" id="alternatives">
        <div className="text-center mb-14">
          <h2 className="section-title">Find Drug Alternatives</h2>
          <p className="section-subtitle">
            Enter a drug name to find safe <br />
            and effective alternatives
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex justify-center mt-6">
              <input
                type="text"
                placeholder="Enter drug name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 rounded-l-lg border border-gray-300 outline-0 w-full max-w-lg"
              />
              <button
                onClick={handleSearchClick}
                className="bg-[var(--primary-color)] text-[var(--third-color)] cursor-pointer px-6 py-2 rounded-r-lg hover:bg-opacity-90 transition duration-200"
              >
                Search
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="suggestions-list mt-4 bg-white text-left border border-gray-300 rounded-lg shadow-lg max-w-lg mx-auto overflow-y-auto max-h-[300px]">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* عرض البدائل إن وُجدت */}
          {alternatives.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 text-left max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                Alternatives for:{" "}
                <span className="text-[var(--primary-color)]">
                  {searchTerm}
                </span>
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {alternatives.map((alt, index) => (
                  <li key={index}>{alt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

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
