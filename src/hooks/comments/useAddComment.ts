import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuctionComment } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuctionComment) => {
      const apiClient = new APIClient<AuctionComment>("/auctions/" + data.auctionId + "/comments");
      return apiClient.post(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.auctionId] }); // clearing cache so the new data is refetched
    },
  });
};

export default useAddComment;
