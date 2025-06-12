/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { PiMapPinAreaBold } from "react-icons/pi";
import {
  MdOutlineQrCodeScanner,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import { TbBrandWechat } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";

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
import { GiPill } from "react-icons/gi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import DownloadApp from "../DownloadApp/DownloadApp";
import { MdOutlineBloodtype } from "react-icons/md";


export default function Home({ showDownloadAppSection }) {
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

          <div className="relative flex flex-col items-center gap-14 z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
            <h1 className="relative z-20 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500 bg-clip-text py-8 text-6xl font-bold text-transparent">
              Find the Right Medicine Easily!
            </h1>

            <SearchToggle />
          </div>
        </div>
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
                <MdOutlineBloodtype className="card-icon-svg" />
              </div>
              <h3 className="card-title">Test Insights & Tips</h3>
              <p className="card-description">
                Get easy insights and advice from your health test results.
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
                <GiPill className="card-icon-svg" />
                {/* <HiOutlineSwitchHorizontal className="card-icon-svg" /> */}
                {/* <TbArrowsExchange className="card-icon-svg" /> */}
                {/* <MdSwapHoriz className="card-icon-svg" /> */}
                {/* <BiSearch className="card-icon-svg" /> */}
              </div>
              <h3 className="card-title">Drug Alternatives</h3>
              <p className="card-description">
                Find a drug and see its alternatives instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 ">
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

      {/* Download App Section */}
      <DownloadApp />

      {/* Pharmacy Locator */}
      {/* <section className="py-20 bg-[var(--secondary-color)]">
        <div className="text-center mb-14">
          <h2 className="section-title">Find Nearby Pharmacies</h2>
          <p className="section-subtitle">
            Quickly locate pharmacies close to <br />
            your current location.
          </p>
        </div>

        <PharmacyLocator />
      </section> */}

      {/* How It Works Section */}
      <section className=" py-20">
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
