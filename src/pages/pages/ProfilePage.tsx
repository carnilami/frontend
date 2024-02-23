import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  SkeletonCircle,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import EditProfileModal from "../../components/modals/EditProfileModal";
import Loading from "../../components/nav/Loading";
import useUser from "../../hooks/users/useUser";
import { PROFILE_CDN_URL } from "../../utils/constants";

const ProfilePage = () => {
  const { data, isLoading } = useUser();

  if (isLoading) return <Loading />;

  return (
    <Stack divider={<StackDivider />} spacing={6}>
      <HStack justifyContent="space-between">
        <HStack spacing={4}>
          <Flex position="relative">
            <SkeletonCircle size="65px" position="absolute" top={0} />
            <Avatar
              name={data?.name}
              src={
                data?.profilePicture && PROFILE_CDN_URL + data?.profilePicture
              }
              size="lg"
            />
          </Flex>
          <Stack spacing={0}>
            <Heading size="lg">{data?.name}</Heading>
            <Text color="gray">{data?.bio || "Tell us about yourself!"}</Text>
          </Stack>
        </HStack>
        <EditProfileModal />
      </HStack>
      <Stack>
        <Heading size="sm">Email</Heading>
        <Text>{data?.email || "No Email"}</Text>
        <Heading size="sm">Phone</Heading>
        <Text>{data?.phone ? "+92-" + data?.phone : "No Phone"}</Text>
        <Heading size="sm">Member Since</Heading>
        <Text>
          {moment.unix(data?.createdAt || moment().unix()).format("LL")}
        </Text>
      </Stack>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", lg: "center" }}
        spacing={4}
      >
        <Stack>
          <Heading size="sm">Tokens</Heading>
          <Text>
            You currently have {data?.tokens} tokens. You will get 5 tokens
            every month or you can buy them.
          </Text>
        </Stack>
        <Stack>
          <Button size="sm" isDisabled>
            Buy Tokens
          </Button>
          <Tag colorScheme="red">Coming Soon!</Tag>
        </Stack>
      </Stack>
      <Stack>
        <Heading size="sm">Bidding History</Heading>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
