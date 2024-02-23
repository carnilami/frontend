import { TimeIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoReserveBadge from "../badges/NoReserveBadge";
import moment from "moment";
import { formatAuctionTimeRemaining } from "../../utils/helpers";

interface AuctionCardProps {
  _id: string;
  titleImage: string;
  title: string;
  description: string;
  city: string;
  expiry: number;
  price: number;
}

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const AuctionCard = ({
  _id,
  titleImage,
  title,
  description,
  city,
  expiry,
  price,
}: AuctionCardProps) => {
  const [currentUnixTimestamp, setCurrentUnixTimestamp] = useState<number>(
    moment().unix()
  );

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
    <Link to={`/auctions/${_id}`}>
      <ChakraBox
        id={_id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        borderRadius={5}
        overflow="hidden"
      >
        <Card overflow="hidden" variant="unstyled">
          <CardBody>
            <Box
              position="relative"
              display="inline-block"
              w="100%"
              borderRadius={5}
              bg={"black"}
            >
              <Link to={`/auctions/${_id}`}>
                <AspectRatio ratio={3 / 2}>
                  <Image
                    borderRadius={5}
                    src={titleImage}
                    objectFit="cover"
                    w="100%"
                    _hover={{ opacity: 0.8 }}
                  />
                </AspectRatio>
              </Link>
              <Tag
                position="absolute"
                overflow="hidden"
                bottom={0}
                left={0}
                backgroundColor="gray.900"
                margin={2}
              >
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <TimeIcon color="gray" />
                  <Text color="white" fontWeight="700">
                    {auctionRemainingTime}
                  </Text>
                  <Text color="gray">PKR</Text>
                  <Text color="white" fontWeight="700">
                    {price.toLocaleString()}
                  </Text>
                </Stack>
              </Tag>
            </Box>
            <Heading size="sm" mt={2}>
              <Link to={`/auctions/${_id}`}>{title}</Link>
            </Heading>
            <Text>
              {price === 0 && <NoReserveBadge size="xs" />} {description}
            </Text>
            <Text color={"gray.400"}>{city}</Text>
          </CardBody>
        </Card>
      </ChakraBox>
    </Link>
  );
};

export default AuctionCard;
