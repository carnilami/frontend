import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Progress,
  Stack,
  StackDivider,
  Switch,
  Tag,
  Text,
} from "@chakra-ui/react";
import { BellRing } from "lucide-react";
import { useState } from "react";
import Loading from "../../components/nav/Loading";
import User from "../../entities/User";
import useUpdateNotifications from "../../hooks/users/useUpdateNotifications";
import useUser from "../../hooks/users/useUser";
import useLogout from "../../hooks/auth/useLogout";

const SettingsPage = () => {
  const { data, isLoading } = useUser();
  const logout = useLogout();

  const [changesMade, setChangesMade] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [clonedNotifications, setClonedNotifications] = useState({});

  const updateNotifications = useUpdateNotifications();

  if (isLoading) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout.mutate();
  };

  const settings = [
    {
      title: "Seller Notifications",
      options: [
        {
          title: "Send new bid notifications",
          value: data?.notifications.sellerNewBid,
          key: "sellerNewBid",
        }
      ],
    },
  ];

  const handleToggle = (key: string, value: boolean) => {
    if (value !== undefined) {
      setClonedNotifications((prevNotifications) => ({
        ...prevNotifications,
        [key]: value,
      }));
      setChangesMade(true);
    }
  };

  const handleSaveChanges = () => {
    if (clonedNotifications) {
      updateNotifications.mutate(clonedNotifications as User, {
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
          {updateNotifications.isPending && (
            <Progress size="xs" isIndeterminate />
          )}
        </Stack>
      )}
      <Stack divider={<StackDivider />} spacing={8}>
        <Stack>
          <Heading as="h1" size="lg">
            Settings
          </Heading>
          <Text color="gray.400">Configure your settings from this page.</Text>
        </Stack>
        <Stack>
          <Heading as="h2" size="md" mb={3}>
            Payment info{" "}
            <Tag colorScheme="red" textAlign="center">
              Coming Soon!
            </Tag>
          </Heading>
          <Box>
            <Button isDisabled>Click to view Payment Details</Button>
          </Box>
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
          <Button colorScheme="red" onClick={handleLogout} isDisabled={logout.isPending} isLoading={logout.isPending}>Logout</Button>
        </Flex>
      </Stack>
    </>
  );
};

export default SettingsPage;
