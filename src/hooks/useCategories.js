import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async () => {
  const response = await axios.get("https://drugkit.runasp.net/api/Category");
  return response.data;
};

export const useCategories = (enabled = true) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled,
    staleTime: 1000 * 60 * 10, // 10 minutes (categories don't change often)
    cacheTime: 1000 * 60 * 30, // 30 minutes
    select: (data) => data || [],
  });
};
