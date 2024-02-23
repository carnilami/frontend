import { HStack, Heading } from "@chakra-ui/react";
import NoReserveBadge from "../badges/NoReserveBadge";

interface Props {
  title: string;
  isReserve: boolean;
}

const AuctionTitle = ({ title, isReserve }: Props) => {
  return (
    <HStack>
      <Heading fontSize={{ base: "md", md: "xl" }}>{title}</Heading>
      {isReserve && <NoReserveBadge />}
    </HStack>
  );
};

export default AuctionTitle;
