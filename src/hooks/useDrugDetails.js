import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDrugDetails = async (drugName) => {
  if (!drugName || drugName.length < 2) {
    return null;
  }

  // Clean and properly encode the drug name
  const cleanDrugName = drugName.trim();

  // Use axios params to handle encoding automatically
  const response = await axios.get(
    "https://drugkit.runasp.net/api/Drug/GetDrugsDetailsByName",
    {
      params: {
        drugName: cleanDrugName,
      },
    }
  );
  return response.data[0] || null;
};

export const useDrugDetails = (drugName, enabled = true) => {
  return useQuery({
    queryKey: ["drugDetails", drugName],
    queryFn: () => fetchDrugDetails(drugName),
    enabled: enabled && drugName && drugName.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    select: (data) => data || null,
  });
};
