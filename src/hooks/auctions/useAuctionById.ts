import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Auction } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const useAuctionById = (id: string, includeSeller = true) => {
  return useQuery<Auction, AxiosError>({
    queryKey: ["auctions", id],
    queryFn: () => {
      const apiClient = new APIClient<Auction>(
        "/auctions/" + id + (includeSeller && "?includeSeller=true")
      );
      return apiClient.get({});
    },
  });
};

export default useAuctionById;
