/* eslint-disable react-hooks/rules-of-hooks */
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import LoginModal from "../modals/LoginModal";
import ColorSwitchToggle from "./ColorModeSwitch";
import Logo from "./Logo";

const NavBar = () => {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log(data);

  return (
    <HStack
      justifyContent="space-between"
      py={4}
      borderBottom="1px solid"
      borderColor={useColorModeValue("#E2E8F0", "#2D3748")}
    >
      <Stack direction="row" spacing={7}>
        <Logo />
        <Show above="xl">
          <HStack>
            <NavLink to="/">
              <Button variant="ghost">Auctions</Button>
            </NavLink>
            <Button variant="primary" borderRadius={50}>
              Sell A Car
            </Button>
          </HStack>
        </Show>
      </Stack>
      <HStack>
        <InputGroup w={{ base: "100", md: "md", lg: "sm", xl: "sm" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            variant="outline"
            placeholder="Search for Cars (ex: Honda City 2018)"
          />
        </InputGroup>
        <Show above="xl">
          {data ? (
            <Menu>
              <MenuButton>
                <Avatar name={data.name} boxSize={10} />
              </MenuButton>
              <MenuList>
                <MenuItem justifyContent="space-between">Profile</MenuItem>
                <MenuItem>My Listings</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider mx={2} />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <LoginModal />
          )}
          <ColorSwitchToggle />
        </Show>
        <Show below="xl">
          <IconButton aria-label="nav menu" icon={<HamburgerIcon />} />
        </Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
