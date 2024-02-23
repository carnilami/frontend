import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Auction } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const useAuctionsSearch = (query: string) => {
  const apiClient = new APIClient<Auction>("/auctions?search=" + query);
  return useQuery<Auction[], AxiosError>({
    queryKey: ["auctionSearch", query],
    queryFn: () => {
      return apiClient.getAll();
    },
    gcTime: 1000 * 300, // 5 minutes
    staleTime: 1000 * 60, // 2 minutes
    retry: 1,
  });
};

export default useAuctionsSearch;
