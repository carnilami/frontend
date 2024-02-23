import { useMutation } from "@tanstack/react-query";
import { AuctionComment } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

const useAddComment = () => {
  return useMutation({
    mutationFn: (data: AuctionComment) => {
      const apiClient = new APIClient<AuctionComment>(
        "/auctions/" + data.auctionId + "/comments"
      );
      return apiClient.post(data);
    },
  });
};

export default useAddComment;
