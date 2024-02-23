import { ArrowUpIcon, DragHandleIcon, TimeIcon } from "@chakra-ui/icons";
import { HStack, Hide, Show, Text, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { AuctionBid } from "../../entities/Auction";
import { formatAuctionTimeRemaining } from "../../utils/helpers";

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

  const textResponsiveness = { base: "sm", md: "lg" };

  return (
    <HStack
      p={1.5}
      px={5}
      minH={"40px"}
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
        <HStack w="100%" justifyContent="space-between">
          <HStack>
            <TimeIcon color={iconColorAdaptive} />
            <Hide below="sm">
              <Text fontWeight="bold" p={0} fontSize={textResponsiveness}>
                Ends
              </Text>
            </Hide>
            <Text fontSize={textResponsiveness}>{auctionRemainingTime}</Text>
          </HStack>
          <HStack>
            <ArrowUpIcon color={iconColorAdaptive} />
            <Text fontWeight="bold" fontSize={textResponsiveness}>
              Bid
            </Text>
            <Text fontSize={textResponsiveness}>
              PKR {(highestBid?.bid || 0).toLocaleString()}
            </Text>
          </HStack>
          <Show above="md">
            <HStack>
              <DragHandleIcon color={iconColorAdaptive} />
              <Text fontWeight="bold" p={0} fontSize={textResponsiveness}>
                Bids
              </Text>
              <Text fontSize={textResponsiveness}>{biddings?.length || 0}</Text>
            </HStack>
          </Show>
        </HStack>
      )}
    </HStack>
  );
};

export default AuctionRibbon;
