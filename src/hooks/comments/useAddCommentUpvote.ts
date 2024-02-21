import { useMutation } from "@tanstack/react-query";
import { AuctionComment, AuctionCommentUpvote } from "../../entities/Auction";
import APIClient from "../../services/apiClient";

interface AddCommentUpvoteParams {
  auctionId: string;
  commentId: string;
  userId: string;
}

const useAddCommentUpvote = () => {
  return useMutation({
    mutationFn: (params: AddCommentUpvoteParams) => {
      const apiClient = new APIClient<AuctionComment, AuctionCommentUpvote>(
        "/auctions/" +
          params.auctionId +
          "/comments/" +
          params.commentId +
          "/upvotes"
      );
      return apiClient.post({
        userId: params.userId,
      });
    },
  });
};

export default useAddCommentUpvote;
