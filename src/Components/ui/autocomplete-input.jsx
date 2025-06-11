/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AutocompleteInput({
  suggestions = [],
  isLoading = false,
  showSuggestions = false,
  onInputChange,
  onSuggestionClick,
  onSubmit,
  value = "",
  className = "",
  placeholder = "Type to search...",
}) {
  const [internalValue, setInternalValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onInputChange?.(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const handleSuggestionClick = (suggestion) => {
    setInternalValue(suggestion);
    onSuggestionClick?.(suggestion);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 px-4 pr-12 rounded-xl border border-gray-300 bg-white shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "placeholder:text-gray-400",
            className
          )}
        />
        <button
          type="submit"
          disabled={!internalValue.trim()}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg",
            "flex items-center justify-center transition-colors",
            internalValue.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              >
                {suggestion}
              </div>
            ))
          ) : internalValue.length >= 2 ? (
            <div className="px-4 py-2 text-red-500">No drugs found</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
