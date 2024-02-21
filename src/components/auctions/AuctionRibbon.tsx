import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { AuctionBid } from "../../entities/Auction";
import { formatAuctionTimeRemaining } from "../../utils/helpers";
import { TimeIcon, DragHandleIcon, ArrowUpIcon } from "@chakra-ui/icons";

interface Props {
  highestBid: AuctionBid;
  biddings: AuctionBid[];
  expiry: number;
}

const AuctionRibbon = ({ highestBid, biddings, expiry }: Props) => {
  const [currentUnixTimestamp, setCurrentUnixTimestamp] = useState<number>(
    moment().unix()
  );
  const iconColorAdaptive = useColorModeValue("gray.700", "gray.300");

  const REFRESH_INTERVAL = 1000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentUnixTimestamp(moment().unix());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const auctionRemainingTime = formatAuctionTimeRemaining(
    expiry,
    currentUnixTimestamp
  );

  return (
    <HStack
      p={1.5}
      px={5}
      borderRadius={5}
      w="100%"
      justifyContent="space-between"
      border="1px solid gray"
      overflow={"hidden"}
      wrap="nowrap"
    >
      {expiry < currentUnixTimestamp ? (
        <Text>Sold to {highestBid?.userName}</Text>
      ) : (
        <HStack>
          <HStack>
            <TimeIcon color={iconColorAdaptive} />
            <Text fontWeight="bold" p={0} fontSize="lg">
              Ends
            </Text>
            <Text fontSize="lg">{auctionRemainingTime}</Text>
          </HStack>
          <HStack>
            <ArrowUpIcon color={iconColorAdaptive} />
            <Text fontWeight="bold" fontSize="lg">
              Highest Bid
            </Text>
            <Text fontSize="lg">
              PKR {(highestBid?.bid || 0).toLocaleString()}
            </Text>
          </HStack>
          <HStack>
            <DragHandleIcon color={iconColorAdaptive} />
            <Text fontWeight="bold" p={0} fontSize="lg">
              Bids
            </Text>
            <Text fontSize="lg">{biddings?.length || 0}</Text>
          </HStack>
        </HStack>
      )}
    </HStack>
  );
};

export default AuctionRibbon;
