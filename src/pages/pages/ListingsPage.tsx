import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  SimpleGrid,
  Stack,
  StackDivider,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import AuctionCardSkeleton from "../../components/auctions/AuctionCardSkeleton";
import MyListingCard from "../../components/auctions/MyListingCard";
import Loading from "../../components/nav/Loading";
import useUser from "../../hooks/users/useUser";
import useUserListings from "../../hooks/users/useUserListings";
import { CDN_URL } from "../../utils/constants";

const ListingsPage = () => {
  const { isLoading: userDataLoading } = useUser();
  const { data: listingsData, isLoading: listingsDataLoading } =
    useUserListings();

  const [filter, setFilter] = useState(0);

  const fake = [1, 2, 3, 4, 5, 6, 7, 8];
  const tabsBackgroundColor = useColorModeValue("gray.100", "whiteAlpha.100");

  if (userDataLoading) {
    return <Loading />;
  }

  return (
    <Stack divider={<StackDivider />} spacing={6}>
      <Stack>
        <Heading as="h1" size="lg">
          My Listings
        </Heading>
        <Text color="gray.400">
          All your auction listings will appear here.
        </Text>
      </Stack>
      <Stack>
        <Show above="sm">
          <Flex>
            <Tabs
              variant="soft-rounded"
              size="sm"
              isFitted
              onChange={(index) => setFilter(index)}
            >
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
        </Show>
        <Hide above="sm">
          <Flex mb={4}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDown />}>
                Filter By
              </MenuButton>
              <MenuList defaultValue="active">
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem>Pending</MenuItem>
                <MenuItem>Declined</MenuItem>
                <MenuItem>Ended</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Hide>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
          {listingsDataLoading &&
            fake.map((_, index) => (
              <Box key={index}>
                <AuctionCardSkeleton />
              </Box>
            ))}
          {(filter === 0 || filter === 1) &&
            listingsData?.map((listing, index) => (
              <Box key={index}>
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
              </Box>
            ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default ListingsPage;
