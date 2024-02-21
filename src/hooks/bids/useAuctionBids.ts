import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuctionBid } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const useAuctionBids = (auctionId: string) => {
  return useQuery<AuctionBid[], AxiosError>({
    queryKey: ["bids", auctionId],
    queryFn: () => {
      const apiClient = new APIClient<AuctionBid[]>(
        "/auctions/" + auctionId + "/bids"
      );
      return apiClient.get({});
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
};

export default useAuctionBids;
