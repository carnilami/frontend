import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Dot, SendHorizonalIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Auction, AuctionBid, AuctionComment } from "../../entities/Auction";
import useAddComment from "../../hooks/comments/useAddComment";
import useAddCommentUpvote from "../../hooks/comments/useAddCommentUpvote";
import useAuctionComments from "../../hooks/comments/useAuctionComments";
import useDeleteCommentUpvote from "../../hooks/comments/useDeleteCommentUpvote";
import useUser from "../../hooks/users/useUser";
import { API_URL, PROFILE_CDN_URL } from "../../utils/constants";
import {
  formatCommentTimeDifference,
  sortCommentsAndBids,
} from "../../utils/helpers";

const socket = io(API_URL);

interface Props {
  auction: Auction;
  bids: AuctionBid[];
}

const AuctionComments = ({ auction, bids }: Props) => {
  const { data } = useAuctionComments(auction?._id ?? "");
  const { data: user } = useUser();
  const [comments, setComments] = useState<AuctionComment[]>([]);
  const [comment, setComment] = useState("");
  const [currentUnixTimestamp, setCurrentUnixTimestamp] = useState(
    moment().unix()
  );
  const [currentFilter, setFilter] = useState("latest");

  const addComment = useAddComment();
  const addCommentUpvote = useAddCommentUpvote();
  const deleteCommentUpvote = useDeleteCommentUpvote();
  const toast = useToast();

  const commentFilterColor = useColorModeValue("black", "white");

  const REFRESH_INTERVAL = 10000;

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  useEffect(() => {
    const handleSocketEvent = (event: string, data: AuctionComment) => {
      switch (event) {
        case "comment":
          handleCommentSocketEvent(data);
          break;
        case "upvote":
          handleUpvoteSocketEvent(data);
          break;
        case "upvote_removed":
          handleUpvoteRemovedSocketEvent(data);
          break;
      }
    };

    socket.onAny((event, data) => {
      handleSocketEvent(event, data);
    });

    return () => {
      socket.offAny(handleSocketEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentSocketEvent = (data: AuctionComment) => {
    if (
      data.auctionId === auction?._id &&
      !comments.find((comment) => comment._id === data._id)
    ) {
      setComments((prev) => [data, ...prev]);
    }
  };

  const handleUpvoteSocketEvent = (data: AuctionComment) => {
    if (data.auctionId === auction?._id) {
      updateCommentsWithUpvote(data);
    }
  };

  const handleUpvoteRemovedSocketEvent = (data: AuctionComment) => {
    if (data.auctionId === auction?._id) {
      updateCommentsWithUpvote(data);
    }
  };

  const updateCommentsWithUpvote = (data: AuctionComment) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment._id === data._id) {
          return {
            ...comment,
            upvotes: data.upvotes,
          };
        } else {
          return comment;
        }
      });
      return updatedComments;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentUnixTimestamp(moment().unix());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const onCommentSubmit = () => {
    if (!user) {
      toast({
        title: "Please Login!",
        description: "You must be logged in to comment.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    addComment.mutate(
      {
        auctionId: auction?._id ?? "",
        userId: user?._id || "",
        content: comment,
      },
      {
        onSuccess: () => {
          setComment("");
          toast({
            title: "Comment added",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const onUpvote = (commentId: string) => {
    if(!user) {
      toast({
        title: "Please Login!",
        description: "You must be logged in to upvote.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const hasUserUpvoted = comments
      .find((comment) => comment._id === commentId)
      ?.upvotes?.find((upvote) => upvote.userId === user?._id);

    if (hasUserUpvoted) {
      handleUpvoteRemoval(commentId);
    } else {
      handleUpvoteAddition(commentId);
    }
  };

  const handleUpvoteRemoval = (commentId: string) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            upvotes: comment.upvotes?.filter(
              (upvote) => upvote.userId !== user?._id
            ),
          };
        } else {
          return comment;
        }
      });
      return updatedComments;
    });

    deleteCommentUpvote.mutate({
      auctionId: auction?._id ?? "",
      commentId,
      userId: user?._id || "",
    });
  };

  const handleUpvoteAddition = (commentId: string) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            upvotes: [
              ...(comment.upvotes || []),
              { userId: user?._id || "", createdAt: moment().unix() },
            ],
          };
        } else {
          return comment;
        }
      });
      return updatedComments;
    });

    addCommentUpvote.mutate({
      auctionId: auction?._id ?? "",
      commentId,
      userId: user?._id || "",
    });
  };

  const commentFilters = [
    { label: "Latest", value: "latest" },
    { label: "Most Upvoted", value: "most-upvoted" },
    { label: "Bids", value: "bids" },
    { label: "Seller Comments", value: "seller-comments" },
  ];

  const sortedCommentsAndBids: (AuctionComment | AuctionBid)[] = [];

  switch (currentFilter) {
    case "latest":
      sortedCommentsAndBids.push(...sortCommentsAndBids(comments, bids));
      break;
    case "bids":
      sortedCommentsAndBids.push(...sortCommentsAndBids([], bids));
      break;
    case "seller-comments":
      sortedCommentsAndBids.push(
        ...comments.filter((comment) => comment.userId === auction?.sellerId)
      );
      break;
    case "most-upvoted":
      sortedCommentsAndBids.push(
        ...comments.sort(
          (a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0)
        )
      );
      break;
    default:
      sortedCommentsAndBids.push(...sortCommentsAndBids(comments, bids));
  }

  const hasUpvoted = (comment: AuctionComment) => {
    return comment.upvotes?.find((upvote) => upvote.userId === user?._id);
  };

  return (
    <Stack spacing={5} mt={2}>
      <Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Heading size="md">Comments, Bids & Questions</Heading>
          <HStack spacing={4} flexWrap="wrap">
            {commentFilters.map((filter) => (
              <Button
                key={filter.value}
                color="gray"
                variant="unstyled"
                size="sm"
                _hover={{ color: commentFilterColor }}
                _active={{ color: commentFilterColor }}
                isActive={currentFilter === filter.value}
                onClick={() => setFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </HStack>
        </Stack>
        <InputGroup>
          <InputRightElement>
            <IconButton
              size="sm"
              aria-label="send comment"
              variant="primary"
              icon={<Icon as={SendHorizonalIcon} fontSize="xl" />}
              onClick={onCommentSubmit}
              isDisabled={addComment.isPending}
              isLoading={addComment.isPending}
            />
          </InputRightElement>
          <Input
            placeholder="Enter Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </InputGroup>
      </Stack>
      {sortedCommentsAndBids?.reverse().map((data, index) => (
        <Stack key={index} spacing={1}>
          <HStack spacing={0}>
            <Avatar
              size="xs"
              name={data.userName}
              src={
                data.userProfilePicture &&
                PROFILE_CDN_URL + data.userProfilePicture
              }
            />
            <Text fontWeight="600" ml={2}>
              {data.userName}
            </Text>
            {data.userId === auction.sellerId && (
              <Badge ml={2} colorScheme="blue">
                Seller
              </Badge>
            )}
            <HStack spacing={0}>
              <Dot />
              <Text color="gray">
                {formatCommentTimeDifference(
                  data.createdAt || 0,
                  currentUnixTimestamp
                )}
              </Text>
            </HStack>
          </HStack>
          <Stack ml={8}>
            {Object.prototype.hasOwnProperty.call(data, "content") ? (
              <Stack>
                <Text>{(data as AuctionComment).content}</Text>
                <Tag
                  mr="auto"
                  onClick={() => onUpvote(data._id as string)}
                  colorScheme={
                    hasUpvoted(data as AuctionComment) ? "green" : "gray"
                  }
                >
                  <ArrowUpIcon />
                  <Text fontWeight="bold">
                    {(data as AuctionComment).upvotes?.length}
                  </Text>
                </Tag>
              </Stack>
            ) : (
              <Tag size="lg" mr="auto" colorScheme="gray" as={HStack}>
                <ArrowUpIcon />
                <Text fontWeight="bold">BID</Text>
                <Text>PKR {(data as AuctionBid).bid.toLocaleString()}</Text>
              </Tag>
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default AuctionComments;
