import {
  Button,
  Hide,
  Show,
  Stack,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const AccountNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabsBackgroundColor = useColorModeValue("gray.100", "whiteAlpha.100");

  const navLinks = [
    { label: "Account", value: "/account" },
    { label: "Listings", value: "/account/listings" },
    { label: "Settings", value: "/account/settings" },
  ];

  return (
    <>
      <Hide above="md">
        <Tabs variant="soft-rounded" size="sm" isFitted mb={6} onChange={(index) => navigate(navLinks[index].value)} overflowX="hidden">
          <TabList
            mb="1em"
            p="6px"
            bg={tabsBackgroundColor}
            as={Stack}
            borderRadius={8}
          >
            {navLinks.map((navLink, index) => (
                <Tab
                  key={index}
                  borderRadius={8}
                  _selected={{
                    color: "white",
                    bg: "#3B82F6",
                    boxShadow: "md",
                    borderRadius: 8,
                  }}
                  _hover={{
                    borderRadius: 8,
                  }}
                  disabled
                >
                  {navLink.label}
                </Tab>
            ))}
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
