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
  Hide,
  Show,
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
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuctionComments from "../../components/auctions/AuctionComments";
import AuctionImages from "../../components/auctions/AuctionImages";
import AuctionRibbon from "../../components/auctions/AuctionRibbon";
import AuctionTitle from "../../components/auctions/AuctionTitle";
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
  const textResponsiveness = { base: "xs", sm: "sm" }

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
    reserved
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
  }, [bids]);

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
          <Show above="md">
            <AuctionTitle title={title || ""} isReserve={reserved!} />
            <HStack>
              <Button leftIcon={<StarIcon />}>Watch</Button>
              <ShareModal auctionId={_id as string} />
            </HStack>
          </Show>
          <Hide above="md">
            <HStack w="100%" justifyContent="space-between" mb={2}>
              <AuctionRibbon
                highestBid={highestBid}
                biddings={biddings}
                expiry={data.auctionExpiry}
              />
              <PlaceBidModal
                auction={data}
                highestBidder={highestBid?.userName || ""}
                highestBid={highestBidValue}
              />
            </HStack>
          </Hide>
        </HStack>
        <AuctionImages imageUrls={imageUrls} />
      </GridItem>
      <GridItem area={"aside"}></GridItem>
      <GridItem area={"details"} mt={3} as={Stack} spacing={4}>
        <Show above="md">
          <HStack>
            <AuctionRibbon
              highestBid={highestBid}
              biddings={biddings}
              expiry={data.auctionExpiry}
            />
            <PlaceBidModal
              highestBidder={highestBid?.userName || ""}
              highestBid={highestBidValue}
              auction={data}
            />
          </HStack>
        </Show>
        <Hide above="md">
          <Stack>
            <AuctionTitle title={title || ""} isReserve={reserved!} />
            <Stack direction="row" divider={<StackDivider />}>
              <Text fontSize={{ base: "sm", sm: "md" }}>
                {make + " " + data.model + " " + data.variant + " " + data.year}
              </Text>
              <Text
                color={iconColorAdaptive}
                fontSize={{ base: "sm", sm: "md" }}
              >
                Ending {moment.unix(data?.auctionExpiry).format("LLL")}
              </Text>
            </Stack>
            <HStack>
              <Button
                size={{ base: "sm", sm: "md" }}
                variant="outline"
                leftIcon={<StarIcon />}
              >
                Watch
              </Button>
              <ShareModal outline auctionId={_id as string} />
            </HStack>
          </Stack>
        </Hide>
        <Card variant={{ base: "unstyled", md: "outline" }} borderColor="gray">
          <CardBody>
            <HStack justifyContent="space-between">
              <Heading size="md" pb={2}>
                Car Details
              </Heading>
              <Hide below="md">
                <Text color={iconColorAdaptive}>
                  Ending {moment.unix(data?.auctionExpiry).format("LLL")}
                </Text>
              </Hide>
            </HStack>
            <Divider />
            <TableContainer
              borderRadius={5}
              overflow="hidden"
              border="1px solid"
              borderColor={borderColorAdaptive}
              my={5}
            >
              <Stack direction={{ base: "column", md: "row" }} spacing={0}>
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
                          w={44}
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
                          w={44}
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
              <Stack direction={{ base: "column", md: "row" }} divider={<StackDivider />}>
                <Stack w={{ base: "100%", md: "50%" }}>
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
                    <StatNumber fontSize={{base: "2xl", md: "4xl"}} fontWeight="bold">
                      PKR {highestBidValue.toLocaleString()}
                    </StatNumber>
                    <StatHelpText>
                      <HStack pl={1}>
                        <CalendarIcon />
                        <Text fontSize={{ base: "xs", sm: "sm" }}>Ending {moment.unix(data?.auctionExpiry).format("LLL")}</Text>
                      </HStack>
                    </StatHelpText>
                  </Stat>
                </Stack>
                <Stack pl={{ base: 0, md: 3 }}>
                  <HStack spacing={6}>
                    <Stack>
                      <Text fontSize={textResponsiveness} fontWeight="600">Seller</Text>
                      <Text fontSize={textResponsiveness} fontWeight="600">Ending</Text>
                      <Text fontSize={textResponsiveness} fontWeight="600">Bids</Text>
                      <Text fontSize={textResponsiveness} fontWeight="600">Views</Text>
                    </Stack>
                    <Stack>
                      <HStack>
                        <Avatar
                          src={PROFILE_CDN_URL + data.seller?.profilePicture}
                          size="xs"
                          name={seller?.name}
                        />
                        <Text fontSize={textResponsiveness}>{seller?.name}</Text>
                      </HStack>
                      <Text fontSize={textResponsiveness}>{moment.unix(data?.auctionExpiry).format("LLLL")}</Text>
                      <Text fontSize={textResponsiveness}>{biddings?.length || 0}</Text>
                      <Text fontSize={textResponsiveness}>100</Text>
                    </Stack>
                  </HStack>
                </Stack>
              </Stack>
            </CardBody>
            <CardFooter py={3} bg={footerColor}>
              <HStack justifyContent="space-between" w="100%">
                <PlaceBidModal auction={data} highestBidder={highestBid?.userName || ""} highestBid={highestBidValue} />
                <Text>
                  <QuestionIcon /> How does bidding work?
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
