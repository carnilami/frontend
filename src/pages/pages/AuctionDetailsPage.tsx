import {
  ArrowUpIcon,
  CalendarIcon,
  DragHandleIcon,
  QuestionIcon,
  StarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
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
import { useParams } from "react-router-dom";
import AuctionImages from "../../components/auctions/AuctionImages";
import NoReserveBadge from "../../components/badges/NoReserveBadge";
import PlaceBidModal from "../../components/modals/PlaceBidModal";
import ShareModal from "../../components/modals/ShareModal";
import useAuctionById from "../../hooks/auctions/useAuctionById";
import { CDN_URL } from "../../utils/constants";

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useAuctionById(id as string);
  const iconColorAdaptive = useColorModeValue("gray.700", "gray.300");
  const borderColorAdaptive = useColorModeValue("gray.300", "gray.700");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error 404- Auction not found.</Text>;
  }

  if (!data) {
    return <Text>Error 404- Auction not found.</Text>;
  }

  const imageUrls = data.images.map((path: string) => CDN_URL + path);

  const tableOneData = [
    { heading: "Make", value: data.make },
    { heading: "Model", value: data.model },
    { heading: "Year", value: data.year },
    { heading: "Mileage", value: data.mileage },
    {
      heading: "Registered",
      value: data.registered ? data.registeredProvince : "Unregistered",
    },
    { heading: "Location", value: "Johar Town, Lahore" },
    { heading: "Seller", value: "-" },
  ];

  const tableTwoData = [
    { heading: "Engine Capacity", value: data.engineCapacity + "cc" },
    { heading: "Transmission", value: data.transmissionType },
    { heading: "Variant", value: data.variant },
    { heading: "Mechnical Flaw", value: data.flawed ? "Yes" : "No" },
    { heading: "Modified / Altered", value: data.modified ? "Yes" : "No" },
    { heading: "Manufacturing", value: data.imported ? "Imported" : "Local" },
    { heading: "Placeholder", value: "tbd" },
  ];

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
            <Heading fontSize="xl">{data.title}</Heading>
            <NoReserveBadge />
          </HStack>
          <HStack>
            <Button leftIcon={<StarIcon />}>Watch</Button>
            <ShareModal auctionId={data._id} />
          </HStack>
        </HStack>
        <AuctionImages imageUrls={imageUrls} />
      </GridItem>
      <GridItem area={"aside"}></GridItem>
      <GridItem area={"details"} mt={3}>
        <Stack
          direction="row"
          position="sticky"
          top={0}
          bg={useColorModeValue("white", "gray.800")}
          py={2}
        >
          <HStack
            bg="transparent"
            p={1}
            px={5}
            borderRadius={5}
            w="100%"
            justifyContent="space-between"
            border="1px solid gray"
            overflow={"hidden"}
            wrap="wrap"
          >
            <HStack>
              <TimeIcon color={iconColorAdaptive} />
              <Text fontWeight="bold" p={0} fontSize="lg">
                Time Remaining
              </Text>
              <Text fontSize="lg">6 Days</Text>
            </HStack>
            <HStack>
              <ArrowUpIcon color={iconColorAdaptive} />
              <Text fontWeight="bold" fontSize="lg">
                Highest Bid
              </Text>
              <Text fontSize="lg">
                PKR {data.reservePrice.toLocaleString()}
              </Text>
            </HStack>
            <HStack>
              <DragHandleIcon color={iconColorAdaptive} />
              <Text fontWeight="bold" p={0} fontSize="lg">
                Bids
              </Text>
              <Text fontSize="lg">32</Text>
            </HStack>
            <HStack>
              <QuestionIcon color={iconColorAdaptive} />
              <Text fontWeight="bold" p={0} fontSize="lg">
                Questions
              </Text>
              <Text fontSize="lg">6</Text>
            </HStack>
          </HStack>
          <PlaceBidModal auction={data} />
        </Stack>
        <Card variant="outline" borderColor="gray" mt={3}>
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
                    {tableOneData.map((data) => (
                      <Tr>
                        <Th
                          py={3}
                          bg={useColorModeValue("gray.100", "gray.900")}
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
                    {tableTwoData.map((data) => (
                      <Tr>
                        <Th
                          py={3}
                          bg={useColorModeValue("gray.100", "gray.900")}
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
              {data.make +
                " " +
                data.model +
                " " +
                data.variant +
                " " +
                data.year}
            </Heading>
            <Divider />
            <Text pt={2} mb={3}>
              {data.description}
            </Text>
          </CardBody>
        </Card>
        <Card variant="outline" borderColor="gray" mt={3}>
          <CardBody>
            <Stack direction="row" divider={<StackDivider />}>
              <Stack w="50%">
                <Stat>
                  <StatLabel>
                    <HStack>
                      <Text>Current bid</Text>
                      <HStack>
                        <Avatar
                          src="https://bit.ly/sage-adebayo"
                          size="xs"
                          name="Subhan Yousaf"
                        />
                        <Text>Subhan Yousaf</Text>
                      </HStack>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="4xl" fontWeight="bold">
                    PKR {data.reservePrice.toLocaleString()}
                  </StatNumber>
                  <StatHelpText>
                    <HStack pl={1}>
                      <CalendarIcon />
                      <Text>Ending 13th Feburary, 2024</Text>
                    </HStack>
                  </StatHelpText>
                </Stat>
              </Stack>
              <Stack>
                <Text>test</Text>
              </Stack>
            </Stack>
          </CardBody>
          <CardFooter py={3} bg={useColorModeValue("gray.100", "gray.700")}>
            <HStack justifyContent="space-between" w="100%">
              <Button variant="primary">Place Bid</Button>
              <Text>
                <QuestionIcon /> How does bidding work?
              </Text>
              <Text>
                <StarIcon /> Watch this auction
              </Text>
            </HStack>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default AuctionDetailsPage;
