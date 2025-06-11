import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategoryDrugs = async (categoryId, page = 1, pageSize = 8) => {
  if (!categoryId) {
    return { result: [], categoryCount: 0 };
  }

  const response = await axios.get(
    `https://drugkit.runasp.net/api/Drug/GetCategoryDrugs${categoryId}?pageNumber=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const useCategoryDrugs = (
  categoryId,
  page = 1,
  pageSize = 8,
  enabled = true
) => {
  return useQuery({
    queryKey: ["categoryDrugs", categoryId, page, pageSize],
    queryFn: () => fetchCategoryDrugs(categoryId, page, pageSize),
    enabled: enabled && !!categoryId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    select: (data) => data || { result: [], categoryCount: 0 },
    keepPreviousData: true, // Keep previous data while loading new page
  });
};
