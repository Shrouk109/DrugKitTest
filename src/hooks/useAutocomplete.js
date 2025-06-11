import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAutocompleteSuggestions = async (query) => {
  if (!query || query.length < 2) {
    return [];
  }

  const response = await axios.get(
    `https://drugkit.runasp.net/api/Drug/AutoComplete?prefix=${query}`
  );
  return response.data;
};

export const useAutocomplete = (query, enabled = true) => {
  return useQuery({
    queryKey: ["autocomplete", query],
    queryFn: () => fetchAutocompleteSuggestions(query),
    enabled: enabled && query && query.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    select: (data) => data || [],
  });
};
