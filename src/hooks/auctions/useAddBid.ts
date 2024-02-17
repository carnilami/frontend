import { useMutation } from "@tanstack/react-query";
import { AuctionBid } from "../../entities/Auction";
import APIClient from "../../services/apiClient";
import { AxiosError } from "axios";

const useAddBid = () => {
  return useMutation<AuctionBid, AxiosError, AuctionBid>({
    mutationFn: (data: AuctionBid) => {
      const apiClient = new APIClient<AuctionBid>("/auctions/" + data.auctionId + "/bids");
      return apiClient.post(data);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });
};

export default useAddBid;
