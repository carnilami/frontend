import Cookies from "js-cookie";
import { AuctionBid, AuctionComment } from "../entities/Auction";

export const validateAuthCookies = () => {
  const sessionID = Cookies.get("connect.sid");
  return sessionID
    ? {
        Cookie: `connect.sid=${sessionID}`,
      }
    : false;
};

export const sortCommentsAndBids = (
  comments: AuctionComment[],
  bids: AuctionBid[]
) => {
  const merged = [...comments, ...bids];
  merged.sort((a, b) => {
    return (a.createdAt || 0) - (b.createdAt || 0);
  });
  return merged;
};

export function formatCommentTimeDifference(
  commentTimestamp: number,
  unixTimestamp: number
): string {
  const differenceInSeconds = unixTimestamp - commentTimestamp;

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInYear = 31536000;

  if (differenceInSeconds < secondsInMinute) {
    return `now`;
  } else if (differenceInSeconds < secondsInHour) {
    return `${Math.floor(differenceInSeconds / secondsInMinute)}m`;
  } else if (differenceInSeconds < secondsInDay) {
    return `${Math.floor(differenceInSeconds / secondsInHour)}h`;
  } else if (differenceInSeconds < secondsInWeek) {
    return `${Math.floor(differenceInSeconds / secondsInDay)}d`;
  } else if (differenceInSeconds < secondsInYear) {
    return `${Math.floor(differenceInSeconds / secondsInWeek)}w`;
  } else {
    return `${Math.floor(differenceInSeconds / secondsInYear)}y`;
  }
}
