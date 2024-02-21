import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuctionInfoFormData } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<AuctionInfoFormData>("/auctions");

const useAddAuction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuctionInfoFormData) => {
      return apiClient.post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    },
  });
};

export default useAddAuction;
