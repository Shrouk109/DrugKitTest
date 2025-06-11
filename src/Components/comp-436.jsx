import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { useState, useRef, useEffect } from "react";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { useNavigate } from "react-router-dom";

export default function SearchToggle() {
  const [searchQuery, setSearchQuery] = useState("");
  const [alternativesQuery, setAlternativesQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showAlternativesSuggestions, setShowAlternativesSuggestions] =
    useState(false);
  const [activeTab, setActiveTab] = useState("search");

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const alternativesRef = useRef(null);

  // Use React Query for autocomplete
  const { data: searchSuggestions = [], isLoading: isLoadingSearch } =
    useAutocomplete(
      searchQuery,
      activeTab === "search" && showSearchSuggestions
    );

  const {
    data: alternativesSuggestions = [],
    isLoading: isLoadingAlternatives,
  } = useAutocomplete(
    alternativesQuery,
    activeTab === "alternatives" && showAlternativesSuggestions
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchSuggestions(value.length >= 2);
  };

  // Handle alternatives input changes
  const handleAlternativesChange = (e) => {
    const value = e.target.value;
    setAlternativesQuery(value);
    setShowAlternativesSuggestions(value.length >= 2);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/drugdetails/${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchSuggestions(false);
    }
  };

  // Handle alternatives submission
  const handleAlternativesSubmit = (e) => {
    e.preventDefault();
    if (alternativesQuery.trim()) {
      navigate(`/alternatives/${encodeURIComponent(alternativesQuery.trim())}`);
      setShowAlternativesSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion, type) => {
    if (type === "search") {
      setSearchQuery(suggestion);
      setShowSearchSuggestions(false);
      // Navigate directly to drug details
      navigate(`/drugdetails/${encodeURIComponent(suggestion)}`);
    } else {
      setAlternativesQuery(suggestion);
      setShowAlternativesSuggestions(false);
      // Navigate directly to alternatives
      navigate(`/alternatives/${encodeURIComponent(suggestion)}`);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
      if (
        alternativesRef.current &&
        !alternativesRef.current.contains(event.target)
      ) {
        setShowAlternativesSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Tabs
      defaultValue="search"
      className={"w-full gap-0"}
      onValueChange={setActiveTab}
    >
      {/* <ScrollArea> */}
      <TabsList className="before:bg-border relative h-auto w-fit gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
        <TabsTrigger
          value="search"
          className="bg-gray-300 overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          Find Drug
        </TabsTrigger>
        <TabsTrigger
          value="alternatives"
          className="bg-gray-300 overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none w-max"
        >
          Alternative
        </TabsTrigger>
      </TabsList>
      {/* <ScrollBar orientation="horizontal" /> */}
      {/* </ScrollArea> */}
      <div className="bg-white p-4 rounded-b-xl rounded-r-xl">
        <TabsContent value="search" className={"flex flex-col gap-4 "}>
          <label className="text-xl font-bold text-gray-700">
            Search for a medicine
          </label>
          <div className="flex w-full items-center gap-2" ref={searchRef}>
            <AutocompleteInput
              placeholder="Search for a medicine..."
              value={searchQuery}
              suggestions={searchSuggestions}
              isLoading={isLoadingSearch}
              showSuggestions={showSearchSuggestions}
              onInputChange={handleSearchChange}
              onSuggestionClick={(suggestion) =>
                handleSuggestionClick(suggestion, "search")
              }
              onSubmit={handleSearchSubmit}
            />
          </div>
        </TabsContent>

        <TabsContent value="alternatives" className={"flex flex-col gap-4 "}>
          <label className="text-xl font-bold text-gray-700">
            Find drug alternatives
          </label>
          <div className="flex w-full items-center gap-2" ref={alternativesRef}>
            <AutocompleteInput
              placeholder="Enter drug name to find alternatives..."
              value={alternativesQuery}
              suggestions={alternativesSuggestions}
              isLoading={isLoadingAlternatives}
              showSuggestions={showAlternativesSuggestions}
              onInputChange={handleAlternativesChange}
              onSuggestionClick={(suggestion) =>
                handleSuggestionClick(suggestion, "alternatives")
              }
              onSubmit={handleAlternativesSubmit}
            />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
