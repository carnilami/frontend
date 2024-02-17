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
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import { useLoginModalStore } from "../../stores";
import LoginModal from "../modals/LoginModal";
import ColorSwitchToggle from "./ColorModeSwitch";
import Loading from "./Loading";
import Logo from "./Logo";
import { PROFILE_CDN_URL } from "../../utils/constants";

const NavBar = () => {
  const { data, isLoading } = useUser();
  const { isOpen, open } = useLoginModalStore();
  const navigate = useNavigate();

  const navBarColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  if (isLoading) {
    return <Loading />;
  }
  console.log(data);

  const handleCarSellButton = () => {
    if (!data) {
      open();
    } else {
      navigate("/sell");
    }
  };

  return (
    <HStack
      justifyContent="space-between"
      py={4}
      borderBottom="1px solid"
      borderColor={navBarColor}
    >
      <Stack direction="row" spacing={7}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <Show above="xl">
          <HStack>
            <NavLink to="/">
              <Button variant="ghost">Auctions</Button>
            </NavLink>
            <Button
              variant="primary"
              borderRadius={50}
              onClick={handleCarSellButton}
            >
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
                <Avatar name={data.name} src={PROFILE_CDN_URL + data?.profilePicture} boxSize={10} />
              </MenuButton>
              <MenuList>
                <NavLink to="/account">
                  <MenuItem justifyContent="space-between">Profile</MenuItem>
                </NavLink>
                <NavLink to="/account/listings">
                  <MenuItem>Listings</MenuItem>
                </NavLink>
                <NavLink to="/account/settings">
                  <MenuItem>Settings</MenuItem>
                </NavLink>
                <MenuDivider mx={2} />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button variant="outline" onClick={open}>
              Sign In
            </Button>
          )}
          {isOpen && <LoginModal />}
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
