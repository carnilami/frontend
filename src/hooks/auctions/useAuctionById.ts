import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../../services/apiClient";
import { Auction } from "../../entities/Auction";

const useAuctionById = (id: string) => {
  return useQuery<Auction, AxiosError>({
    queryKey: ["auctions", id],
    queryFn: () => {
      const apiClient = new APIClient<Auction>("/auctions/" + id);
      return apiClient.get({});
    },
  });
};

export default useAuctionById;
