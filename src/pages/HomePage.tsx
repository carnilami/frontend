import {
  Divider,
  Grid,
  GridItem,
  Heading,
  Show,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import AuctionCard from "../components/auctions/AuctionCard";
import AuctionCardSkeleton from "../components/auctions/AuctionCardSkeleton";
import NewListingCard from "../components/auctions/NewListingCard";
import HomeNav from "../components/nav/HomeNav";
import useAuctions from "../hooks/auctions/useAuctions";

const HomePage = () => {
  const { data, error, isLoading } = useAuctions();
  const fake = [1, 2, 3, 4, 5, 6, 7, 8];
  const newListingData = data;

  if (error) {
    return <Text> Error 404 </Text>;
  }

  return (
    <Stack direction="column" pt={5} spacing={6} mt={5}>
      <HomeNav />
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 2, "2xl": 3 }} spacing={5}>
            {isLoading && fake.map(() => <AuctionCardSkeleton />)}
            {data?.map((auction) => (
              <AuctionCard
                _id={auction._id}
                titleImage={"https://cdn.carnilami.com/" + auction.images[0]}
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
                  auction.mileage + " Km"
                }
                price={auction.reservePrice}
                city={auction.city}
                time="7d 12h 30m"
              />
            ))}
          </SimpleGrid>
        </GridItem>
        <Show above="xl">
          <GridItem ml={10} gridArea="aside">
            <Heading size="md">New Listings</Heading>
            <Divider py={1} />
            <SimpleGrid mt={4} columns={1} spacing={5}>
              {newListingData?.map((auction) => (
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
                    auction.mileage + " Km"
                  }
                  image={"https://cdn.carnilami.com/" + auction.images[0]}
                  city={auction.city}
                />
              ))}
            </SimpleGrid>
          </GridItem>
        </Show>
      </Grid>
    </Stack>
  );
};

export default HomePage;
