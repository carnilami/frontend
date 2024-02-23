import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Navigate, useSearchParams } from "react-router-dom";
import AuctionCard from "../../components/auctions/AuctionCard";
import AuctionCardSkeleton from "../../components/auctions/AuctionCardSkeleton";
import useAuctionsSearch from "../../hooks/auctions/useAuctionsSearch";
import { CDN_URL } from "../../utils/constants";

const SearchVehicle = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { data, isLoading } = useAuctionsSearch(query || "");
  const fake = [1, 2, 3, 4, 5, 6, 7, 8];

  if (!query) {
    return <Navigate to="/" />;
  }

  return (
    <Stack mt={4}>
      <Stack spacing={0}>
        <Heading size="lg">Search Results</Heading>
        <Text>For: {searchParams.get("q") || ""}</Text>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 3, "2xl": 3 }}
        spacing={5}
        mt={4}
      >
        {isLoading &&
          fake.map((_, index) => (
            <Box key={index}>
              <AuctionCardSkeleton />
            </Box>
          ))}
        {data?.map((auction) => (
          <AuctionCard
            _id={auction._id}
            titleImage={CDN_URL + auction.images[0]}
            title={auction.title}
            description={
              auction.make +
              " " +
              auction.model +
              " " +
              auction.variant +
              " " +
              auction.year +
              ", " +
              auction.mileage +
              " Km"
            }
            price={auction.currentHighestBid || 0}
            city={auction.city}
            expiry={auction.auctionExpiry}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default SearchVehicle;
