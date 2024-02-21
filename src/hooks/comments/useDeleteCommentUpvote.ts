import { useMutation } from "@tanstack/react-query";
import { AuctionComment, AuctionCommentUpvote } from "../../entities/Auction";
import APIClient from "../../services/apiClient";
import { validateAuthCookies } from "../../utils/helpers";

interface DeleteCommentUpvoteParams {
  auctionId: string;
  commentId: string;
  userId: string;
}

const useDeleteCommentUpvote = () => {
  const headers = validateAuthCookies();

  return useMutation({
    mutationFn: (params: DeleteCommentUpvoteParams) => {
      const apiClient = new APIClient<AuctionComment, AuctionCommentUpvote>(
        "/auctions/" +
          params.auctionId +
          "/comments/" +
          params.commentId +
          "/upvotes"
      );
      return apiClient.delete({
        headers: {
          ...headers,
        },
      });
    },
  });
};

export default useDeleteCommentUpvote;
