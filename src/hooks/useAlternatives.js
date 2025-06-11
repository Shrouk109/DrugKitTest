import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAlternatives = async (drugName) => {
  if (!drugName || drugName.length < 2) {
    return [];
  }

  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token not found");
  }

  const response = await axios.get(
    `https://drugkit.runasp.net/api/Drug/GetDrugsRecomendationByDrugName?drugName=${encodeURIComponent(
      drugName
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useAlternatives = (drugName, enabled = true) => {
  return useQuery({
    queryKey: ["alternatives", drugName],
    queryFn: () => fetchAlternatives(drugName),
    enabled: enabled && drugName && drugName.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    select: (data) => data || [],
    retry: (failureCount, error) => {
      // Don't retry if it's an auth error
      if (error?.message === "Token not found") {
        return false;
      }
      return failureCount < 3;
    },
  });
};
