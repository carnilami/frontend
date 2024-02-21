import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuctionComment } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const useAuctionComments = (auctionId: string) => {
  return useQuery<AuctionComment[], AxiosError>({
    queryKey: ["comments", auctionId],
    queryFn: () => {
      const apiClient = new APIClient<AuctionComment[]>(
        "/auctions/" + auctionId + "/comments"
      );
      return apiClient.get({});
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
};

export default useAuctionComments;
