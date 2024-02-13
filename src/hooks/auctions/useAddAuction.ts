import { useMutation } from "@tanstack/react-query";
import { AuctionInfoFormData } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<AuctionInfoFormData>("/auctions");

const useAddAuction = () => {
  return useMutation({
    mutationFn: (data: AuctionInfoFormData) => {
      return apiClient.post(data);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });
};

export default useAddAuction;
