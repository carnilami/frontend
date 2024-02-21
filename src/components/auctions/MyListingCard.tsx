import {
  AspectRatio,
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import NoReserveBadge from "../badges/NoReserveBadge";

interface MyListingCardProps {
  _id: string;
  titleImage: string;
  title: string;
  description: string;
  city: string;
  time: string;
  price: number;
}

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MyListingCard = ({
  _id,
  titleImage,
  title,
  description,
  city,
  price,
}: MyListingCardProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <ChakraBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotate: isActive ? 90 : 0,
      }}
      onClick={() => setIsActive(!isActive)}
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
            <Badge
              variant="solid"
              fontSize="sm"
              colorScheme="red"
              position="absolute"
              overflow="hidden"
              bottom={0}
              left={0}
              margin={2}
            >
              Declined
            </Badge>
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
  );
};

export default MyListingCard;
