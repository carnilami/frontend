import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Calendar, Mail, Phone, StopCircle } from "lucide-react";
import moment from "moment";
import Loading from "../../components/nav/Loading";
import useUser from "../../hooks/users/useUser";

const MyProfile = () => {
  const { data, isLoading } = useUser();

  if (isLoading) return <Loading />;

  return (
    <Stack divider={<StackDivider />} spacing={8}>
      <Stack spacing={8}>
        <HStack>
          <Avatar size="2xl" name={data?.name} />
          <Stack ml={5}>
            <Text fontSize="4xl">{data?.name}</Text>
          </Stack>
        </HStack>
        <Stack direction="row" justifyContent="space-between">
          <HStack>
            <Phone />
            <Text ml={2}>Phone: 03XX-XXXXXXX</Text>
          </HStack>
          <HStack>
            <Mail />
            <Text ml={2}>{data?.email}</Text>
          </HStack>
          <HStack>
            <Calendar />
            <Text ml={2}>
              Member since{" "}
              {moment.unix(data?.createdAt || moment().unix()).format("L")}
            </Text>
          </HStack>
        </Stack>
      </Stack>
      <Stack>
        <Heading size="lg">Tokens</Heading>
        <HStack justifyContent="space-between">
          <HStack>
            <Heading size="md" fontWeight={600}>
              Current Balance
            </Heading>
            <Text fontSize="xl" ml={3}>
              {data?.tokens}
            </Text>
            <Icon as={StopCircle} fontSize="xl" pt={1} />
          </HStack>
          <Button> Buy Tokens </Button>
        </HStack>
      </Stack>

      <Stack justifyContent="space-between">
        <Heading as="h2" size="md" mb={3}>
          Bidding History
        </Heading>
        <Accordion mt={4} defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontSize="lg">
                Tesla Cyber Truck 2024
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Stack>
                <Text> Auction ID : 21154</Text>
                <Text> Bid Date : 7/5/2023 </Text>
                <Text> Auction Result : Ended</Text>
                <Text> Tokens Used : 1 </Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize="lg">
                  Honda City 2018
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack>
                <Text> Auction ID : 21154</Text>
                <Text> Bid Date : 7/5/2023 </Text>
                <Text> Auction Result : Ended</Text>
                <Text> Tokens Used : 1 </Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize="lg">
                  Suzuki Alto 2023
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack>
                <Text> Auction ID : 21154</Text>
                <Text> Bid Date : 7/5/2023 </Text>
                <Text> Auction Result : Ended</Text>
                <Text> Tokens Used : 1 </Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default MyProfile;
