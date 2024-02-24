import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Show,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import AuctionCard from "../../components/auctions/AuctionCard";
import AuctionCardSkeleton from "../../components/auctions/AuctionCardSkeleton";
import NewListingCard from "../../components/auctions/NewListingCard";
import AuctionLoadingError from "../../components/errors/AuctionLoadingError";
import HomeNav from "../../components/nav/HomeNav";
import useAuctions from "../../hooks/auctions/useAuctions";
import { CDN_URL } from "../../utils/constants";

const HomePage = () => {
  const { data, error, isLoading } = useAuctions();
  const fake = [1, 2, 3, 4, 5, 6, 7, 8];

  if (error) {
    return <AuctionLoadingError />;
  }

  return (
    <Stack direction="column" pt={5} spacing={6}>
      <Grid
        templateAreas={{
          base: `"main"`,
          xl: `"main aside"`,
        }}
        templateColumns={{
          base: "1fr",
          xl: "1fr 295px",
        }}
      >
        <GridItem gridArea="main">
          <HomeNav />
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
            {data?.map((auction, index) => (
              <Box key={index}>
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
                    " - " +
                    auction.mileage.toLocaleString() +
                    " Km"
                  }
                  price={auction.currentHighestBid || 0}
                  city={auction.city}
                  expiry={auction.auctionExpiry}
                />
              </Box>
            ))}
          </SimpleGrid>
        </GridItem>
        <Show above="xl">
          <GridItem ml={10} gridArea="aside">
            <Heading size="md">New Listings</Heading>
            <Divider py={1} />
            <SimpleGrid mt={4} columns={1} spacing={5}>
              {data?.map((auction, index) => (
                <Box key={index}>
                  <NewListingCard
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
                    image={CDN_URL + auction.images[0]}
                    city={auction.city}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </GridItem>
        </Show>
      </Grid>
    </Stack>
  );
};

export default HomePage;
