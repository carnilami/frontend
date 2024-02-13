import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Auction } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<Auction>("/auctions");

const useAuctions = () => {
  return useQuery<Auction[], AxiosError>({
    queryKey: ["auctions"],
    queryFn: () => {
      return apiClient.getAll();
    },
    gcTime: 1000 * 300, // 5 minutes
    staleTime: 1000 * 120, // 2 minutes
    retry: 1,
  });
};

export default useAuctions;
