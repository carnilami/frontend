import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuctionBid } from "../../entities/Auction";
import APIClient from "../../services/apiClient";
import { AxiosError } from "axios";

const useAddBid = () => {
  const queryClient = useQueryClient();

  return useMutation<AuctionBid, AxiosError, AuctionBid>({
    mutationFn: (data: AuctionBid) => {
      const apiClient = new APIClient<AuctionBid>("/auctions/" + data.auctionId + "/bids");
      return apiClient.post(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bids", data.auctionId] }); // clearing cache so the new data is refetched
    },
  });
};

export default useAddBid;
