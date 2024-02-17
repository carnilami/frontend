import {
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AuctionCardSkeleton from "../../components/auctions/AuctionCardSkeleton";
import MyListingCard from "../../components/auctions/MyListingCard";
import Loading from "../../components/nav/Loading";
import useUser from "../../hooks/users/useUser";
import useUserListings from "../../hooks/users/useUserListings";
import { CDN_URL } from "../../utils/constants";

const MyListings = () => {
  const { isLoading: userDataLoading } = useUser();
  const { data: listingsData, isLoading: listingsDataLoading } =
    useUserListings();

  const fake = [1, 2, 3, 4, 5, 6, 7, 8];
  const tabsBackgroundColor = useColorModeValue("gray.100", "whiteAlpha.100");

  if (userDataLoading) {
    return <Loading />;
  }

  return (
    <Stack divider={<StackDivider />} spacing={6}>
      <Stack>
        <Heading as="h1" size="lg" mt={5}>
          My Listings
        </Heading>
        <Text color="gray.400">
          All your auction listings will appear here.
        </Text>
      </Stack>
      <Stack>
        <Flex>
          <Tabs variant="soft-rounded" size="sm" isFitted>
            <TabList
              mb="1em"
              p="6px"
              bg={tabsBackgroundColor}
              as={Stack}
              borderRadius={8}
            >
              {["All", "Active", "Pending", "Expired", "Declined"].map(
                (tab) => (
                  <Tab
                    key={tab}
                    borderRadius={8}
                    _selected={{
                      color: "white",
                      bg: "#3B82F6",
                      boxShadow: "md",
                    }}
                    disabled
                  >
                    {tab}
                  </Tab>
                )
              )}
            </TabList>
          </Tabs>
        </Flex>
        <SimpleGrid columns={4} spacing={5}>
          {listingsDataLoading && fake.map(() => <AuctionCardSkeleton />)}
          {listingsData?.map((listing) => (
            <MyListingCard
              _id={listing._id}
              titleImage={CDN_URL + listing.images[0]}
              title={listing.title}
              description={
                listing.make +
                " " +
                listing.model +
                " " +
                listing.variant +
                " " +
                listing.year +
                ", " +
                listing.mileage +
                " Km"
              }
              price={listing.reservePrice}
              city={listing.city}
              time="7d 12h 30m"
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default MyListings;
