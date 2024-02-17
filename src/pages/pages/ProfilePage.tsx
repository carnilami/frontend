import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  SkeletonCircle,
  Stack,
  StackDivider,
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
        <Text>{data?.email}</Text>
        <Heading size="sm">Phone</Heading>
        <Text>+92 317-4552300</Text>
        <Heading size="sm">Member Since</Heading>
        <Text>
          {moment.unix(data?.createdAt || moment().unix()).format("LL")}
        </Text>
      </Stack>
      <HStack justifyContent="space-between" alignItems="center">
        <Stack>
          <Heading size="sm">Tokens</Heading>
          <Text>
            You currently have 100 tokens. You will get 5 tokens every month or
            you can buy them.
          </Text>
        </Stack>
        <Button size="sm">Buy Tokens</Button>
      </HStack>
      <Stack>
        <Heading size="sm">Bidding History</Heading>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
