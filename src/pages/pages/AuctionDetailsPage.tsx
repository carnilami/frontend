import { CalendarIcon, QuestionIcon, StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuctionComments from "../../components/auctions/AuctionComments";
import AuctionImages from "../../components/auctions/AuctionImages";
import AuctionRibbon from "../../components/auctions/AuctionRibbon";
import NoReserveBadge from "../../components/badges/NoReserveBadge";
import AuctionLoadingError from "../../components/errors/AuctionLoadingError";
import NotFound from "../../components/errors/NotFound";
import PlaceBidModal from "../../components/modals/PlaceBidModal";
import ShareModal from "../../components/modals/ShareModal";
import Loading from "../../components/nav/Loading";
import { AuctionBid } from "../../entities/Auction";
import useAuctionById from "../../hooks/auctions/useAuctionById";
import useAuctionBids from "../../hooks/bids/useAuctionBids";
import { API_URL, CDN_URL, PROFILE_CDN_URL } from "../../utils/constants";

const socket = io(API_URL);

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useAuctionById(id as string);
  const { data: bids, isLoading: bidsLoading } = useAuctionBids(id as string);
  const [biddings, setBiddings] = useState<AuctionBid[]>([]);

  const iconColorAdaptive = useColorModeValue("gray.700", "gray.300");
  const borderColorAdaptive = useColorModeValue("gray.300", "gray.700");
  const footerColor = useColorModeValue("gray.100", "gray.700");
  const tableHeadingColor = useColorModeValue("gray.100", "gray.900");

  const {
    _id,
    title,
    description,
    make,
    model,
    year,
    mileage,
    registered,
    registeredProvince,
    city,
    seller,
    engineCapacity,
    transmissionType,
    variant,
    flawed,
    modified,
    imported,
    images,
  } = data || {};

  const highestBidValue = biddings[0]?.bid ?? 0;
  const highestBid = biddings[0];

  const imageUrls = images?.map((path: string) => CDN_URL + path) || [];

  const tableOneData = [
    { heading: "Make", value: make },
    { heading: "Model", value: model },
    { heading: "Year", value: year },
    { heading: "Mileage", value: mileage },
    {
      heading: "Registered",
      value: registered ? registeredProvince : "Unregistered",
    },
    { heading: "Location", value: city },
    {
      heading: "Seller",
      value: (
        <HStack>
          <Avatar
            src={PROFILE_CDN_URL + seller?.profilePicture}
            size="xs"
            name={seller?.name}
          />
          <Text>{seller?.name}</Text>
        </HStack>
      ),
    },
  ];

  const tableTwoData = [
    { heading: "Engine Capacity", value: engineCapacity + "cc" },
    { heading: "Transmission", value: transmissionType },
    { heading: "Variant", value: variant },
    { heading: "Mechanical Flaw", value: flawed ? "Yes" : "No" },
    { heading: "Modified / Altered", value: modified ? "Yes" : "No" },
    { heading: "Manufacturing", value: imported ? "Imported" : "Local" },
    { heading: "Placeholder", value: "tbd" },
  ];

  useEffect(() => {
    setBiddings(bids || []);
  }, [bids])

  useEffect(() => {
    const handleBidEvent = (eventData: AuctionBid) => {
      if (
        eventData.auctionId === id &&
        !biddings.find((bidding) => bidding._id === eventData._id)
      ) {
        setBiddings((prev) => [eventData, ...prev]);
      }
    };

    socket.on("bid", handleBidEvent);

    return () => {
      socket.off("bid", handleBidEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || bidsLoading) {
    return <Loading />;
  }

  if (error) {
    return <AuctionLoadingError />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <Grid
      templateAreas={{
        base: `"images" "details"`,
        xl: `"images images"
        "details aside"`,
      }}
      gridTemplateColumns={{
        base: "1fr",
        xl: "2fr 1fr",
      }}
      mt={5}
    >
      <GridItem area={"images"}>
        <HStack pb={3} justifyContent="space-between">
          <HStack>
            <Heading fontSize="xl">{title}</Heading>
            <NoReserveBadge />
          </HStack>
          <HStack>
            <Button leftIcon={<StarIcon />}>Watch</Button>
            <ShareModal auctionId={_id as string} />
          </HStack>
        </HStack>
        <AuctionImages imageUrls={imageUrls} />
      </GridItem>
      <GridItem area={"aside"}></GridItem>
      <GridItem area={"details"} mt={3} as={Stack} spacing={4}>
        <HStack>
          <AuctionRibbon
            highestBid={highestBid}
            biddings={biddings}
            expiry={data.auctionExpiry}
          />
          <PlaceBidModal auction={data} />
        </HStack>
        <Card variant="outline" borderColor="gray">
          <CardBody>
            <HStack justifyContent="space-between">
              <Heading size="md" pb={2}>
                Car Details
              </Heading>
              <Text color={iconColorAdaptive}>Ending 13th Feburary, 2024</Text>
            </HStack>
            <Divider />
            <TableContainer
              borderRadius={5}
              overflow="hidden"
              border="1px solid"
              borderColor={borderColorAdaptive}
              my={5}
            >
              <Stack direction="row" spacing={0}>
                <Table
                  border="1px solid"
                  borderColor={borderColorAdaptive}
                  variant="unstyled"
                  size="sm"
                >
                  <Tbody>
                    {tableOneData.map((data, index) => (
                      <Tr key={index}>
                        <Th
                          py={3}
                          bg={tableHeadingColor}
                          borderRight="1px solid"
                          borderBottom="1px solid"
                          borderColor={borderColorAdaptive}
                        >
                          {data.heading}
                        </Th>
                        <Td
                          borderBottom="1px solid"
                          borderColor={borderColorAdaptive}
                        >
                          {data.value}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Table
                  border="1px solid"
                  borderColor={borderColorAdaptive}
                  variant="unstyled"
                  size="sm"
                >
                  <Tbody>
                    {tableTwoData.map((data, index) => (
                      <Tr key={index}>
                        <Th
                          py={3}
                          bg={tableHeadingColor}
                          borderRight="1px solid"
                          borderBottom="1px solid"
                          borderColor={borderColorAdaptive}
                        >
                          {data.heading}
                        </Th>
                        <Td
                          borderBottom="1px solid"
                          borderColor={borderColorAdaptive}
                        >
                          {data.value}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Stack>
            </TableContainer>
            <Heading pb={2} fontSize="xl">
              {make + " " + data.model + " " + data.variant + " " + data.year}
            </Heading>
            <Divider />
            <Text pt={2} mb={3}>
              {description}
            </Text>
          </CardBody>
        </Card>
        {highestBid && (
          <Card variant="outline" borderColor="gray" overflow="hidden">
            <CardBody>
              <Stack direction="row" divider={<StackDivider />}>
                <Stack w="50%">
                  <Stat>
                    <StatLabel>
                      <HStack>
                        <Text>Current bid</Text>
                        <HStack>
                          <Avatar
                            src={
                              PROFILE_CDN_URL + highestBid.userProfilePicture
                            }
                            size="xs"
                            name={highestBid.userName}
                          />
                          <Text>{highestBid.userName}</Text>
                        </HStack>
                      </HStack>
                    </StatLabel>
                    <StatNumber fontSize="4xl" fontWeight="bold">
                      PKR {highestBidValue.toLocaleString()}
                    </StatNumber>
                    <StatHelpText>
                      <HStack pl={1}>
                        <CalendarIcon />
                        <Text>Ending 13th Feburary, 2024</Text>
                      </HStack>
                    </StatHelpText>
                  </Stat>
                </Stack>
                <Stack pl={3}>
                  <HStack spacing={6}>
                    <Stack>
                      <Text fontWeight="600">Seller</Text>
                      <Text fontWeight="600">Ending</Text>
                      <Text fontWeight="600">Bids</Text>
                      <Text fontWeight="600">Views</Text>
                    </Stack>
                    <Stack>
                      <HStack>
                        <Avatar
                          src={PROFILE_CDN_URL + data.seller?.profilePicture}
                          size="xs"
                          name={seller?.name}
                        />
                        <Text>{seller?.name}</Text>
                      </HStack>
                      <Text>13th Feburary, 2024</Text>
                      <Text>{biddings?.length || 0}</Text>
                      <Text>100</Text>
                    </Stack>
                  </HStack>
                </Stack>
              </Stack>
            </CardBody>
            <CardFooter py={3} bg={footerColor}>
              <HStack justifyContent="space-between" w="100%">
                <PlaceBidModal auction={data} />
                <Text>
                  <QuestionIcon /> How does bidding work?
                </Text>
                <Text>
                  <StarIcon /> Watch this auction
                </Text>
              </HStack>
            </CardFooter>
          </Card>
        )}
        <AuctionComments auction={data} bids={biddings} />
      </GridItem>
    </Grid>
  );
};

export default AuctionDetailsPage;
