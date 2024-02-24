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
  return (
    <ChakraBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      borderRadius={5}
      overflow="hidden"
    >
      <Link to={`/auctions/${_id}`}>
        <Card overflow="hidden" variant="unstyled">
          <CardBody>
            <Box
              position="relative"
              display="inline-block"
              w="100%"
              borderRadius={5}
              bg={"black"}
            >
                <AspectRatio ratio={3 / 2}>
                  <Image
                    borderRadius={5}
                    src={titleImage}
                    objectFit="cover"
                    w="100%"
                    _hover={{ opacity: 0.8 }}
                  />
                </AspectRatio>
              <Badge
                variant="solid"
                fontSize="sm"
                colorScheme="green"
                position="absolute"
                overflow="hidden"
                bottom={0}
                left={0}
                margin={2}
              >
                Active
              </Badge>
            </Box>
            <Heading size="sm" mt={2}>
              {title}
            </Heading>
            <Text>
              {price === 0 && <NoReserveBadge size="xs" />} {description}
            </Text>
            <Text color={"gray.400"}>{city}</Text>
          </CardBody>
        </Card>
      </Link>
    </ChakraBox>
  );
};

export default MyListingCard;
