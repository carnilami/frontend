import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Progress,
  Stack,
  StackDivider,
  Switch,
  Text,
} from "@chakra-ui/react";
import { BellRing, Key, Mail } from "lucide-react";
import { useState } from "react";
import Loading from "../../components/nav/Loading";
import UserNotifications from "../../entities/User";
import useUpdateNotifications from "../../hooks/users/useUpdateNotifications";
import useUser from "../../hooks/users/useUser";

const MySettings = () => {
  const { data, isLoading } = useUser();

  const [changesMade, setChangesMade] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [clonedNotifications, setClonedNotifications] = useState<
    UserNotifications | undefined
  >(data?.notifications);

  const updateNotifications = useUpdateNotifications();

  if (isLoading) {
    return <Loading />;
  }

  const settings = [
    {
      title: "Seller Notifications",
      options: [
        {
          title: "Send new bid notifications",
          value: data?.notifications.sellerNewBid,
          key: "sellerNewBid",
        },
        {
          title: "Send new comment notifications",
          value: data?.notifications.sellerNewComment,
          key: "sellerNewComment",
        },
      ],
    },
  ];

  const handleToggle = (key: string, value: boolean) => {
    if (value !== undefined) {
      // @ts-expect-error Key exists but typescript doesnt know if it exists
      setClonedNotifications((prevNotifications) => ({
        ...prevNotifications,
        [key]: value,
      }));
      setChangesMade(true);
    }
  };

  const handleSaveChanges = () => {
    if (clonedNotifications) {
      updateNotifications.mutate(clonedNotifications, {
        onSuccess: () => {
          setChangesSaved(true);
          setTimeout(() => {
            setChangesSaved(false);
            setChangesMade(false);
          }, 3000);
        },
      });
    }
  };

  return (
    <>
      {changesMade && (
        <Stack spacing={0} mb={4}>
          <Alert
            status={changesSaved ? "success" : "info"}
            justifyContent="space-between"
            sx={{
              position: "sticky",
              top: "0",
              zIndex: 1,
            }}
          >
            <HStack spacing={0}>
              <AlertIcon />
              <AlertTitle>
                {changesSaved ? "Settings Saved!" : "Unsaved Changes!"}
              </AlertTitle>
              <AlertDescription>
                {changesSaved
                  ? "Your settings have been successfully saved."
                  : "You have unsaved changes. Click save to apply changes."}
              </AlertDescription>
            </HStack>
            {!changesSaved && (
              <Button
                size="sm"
                variant="solid"
                colorScheme="gray"
                onClick={handleSaveChanges}
                isDisabled={updateNotifications.isPending}
                isLoading={updateNotifications.isPending}
              >
                Save
              </Button>
            )}
          </Alert>
          {updateNotifications.isPending && <Progress size="xs" isIndeterminate />}
        </Stack>
      )}
      <Stack divider={<StackDivider />} spacing={8}>
        <Heading as="h1" size="lg">
          Settings
        </Heading>
        <Stack spacing={2}>
          <Heading as="h2" size="md" mb={3}>
            Account
          </Heading>
          <HStack>
            <Mail />
            <Text ml={2}>{data?.email}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <HStack>
              <Key />
              <Text ml={2}>Password :</Text>
              <Text ml={2} textAlign="center">
                ●●●●●●●●●●
              </Text>
            </HStack>
            <Button>Change password</Button>
          </HStack>
        </Stack>
        <Stack>
          <Heading as="h2" size="md" mb={3}>
            Payment info
          </Heading>
          <Button w="xs">Click to view Payment Details</Button>
        </Stack>
        {settings.map((setting) => (
          <Stack key={setting.title}>
            <Heading as="h2" size="md" mb={3}>
              {setting.title}
            </Heading>
            {setting.options.map((option) => (
              <HStack key={option.title} justifyContent="space-between">
                <HStack>
                  <Icon pt={0.5} as={BellRing} />
                  <Text>{option.title}</Text>
                </HStack>
                <Switch
                  size="lg"
                  colorScheme="blue"
                  defaultChecked={option.value}
                  onChange={(e) => handleToggle(option.key, e.target.checked)}
                />
              </HStack>
            ))}
          </Stack>
        ))}
        <Flex>
          <Button colorScheme="red">Logout</Button>
        </Flex>
      </Stack>
    </>
  );
};

export default MySettings;
