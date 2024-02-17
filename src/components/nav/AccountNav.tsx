import {
  Button,
  Hide,
  Show,
  Stack,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const AccountNav = () => {
  const location = useLocation();
  
  return (
    <>
      <Hide above="md">
        <Tabs
          isFitted
          variant="soft-rounded"
          colorScheme="gray"
          onChange={() => {
            console.log("test");
          }}
        >
          <TabList mb="1em">
            <Tab>Profile</Tab>
            <Tab>Listings</Tab>
            <Tab>Settings</Tab>
          </TabList>
        </Tabs>
      </Hide>
      <Show above="md">
        <Stack mr={8} pr={12} h={"100vh"}>
          <NavLink to="/account">
            <Button
              variant="ghost"
              justifyContent="flex-start"
              isActive={location.pathname === "/account"}
              w="100%"
            >
              Profile
            </Button>
          </NavLink>
          <NavLink to="/account/listings">
            <Button
              variant="ghost"
              justifyContent="flex-start"
              isActive={location.pathname === "/account/listings"}
              w="100%"
            >
              Listings
            </Button>
          </NavLink>
          <NavLink to="/account/settings">
            <Button
              variant="ghost"
              justifyContent="flex-start"
              isActive={location.pathname === "/account/settings"}
              w="100%"
            >
              Settings
            </Button>
          </NavLink>
        </Stack>
      </Show>
    </>
  );
};

export default AccountNav;
