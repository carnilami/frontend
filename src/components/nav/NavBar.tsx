import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Hide,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/auth/useLogout";
import useUser from "../../hooks/users/useUser";
import { useLoginModalStore } from "../../stores";
import { PROFILE_CDN_URL } from "../../utils/constants";
import LoginModal from "../modals/LoginModal";
import ColorSwitchToggle from "./ColorModeSwitch";
import Loading from "./Loading";
import Logo from "./Logo";

const NavBar = () => {
  const { data, isLoading } = useUser();
  const { isOpen: MenuIsOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const { isOpen, open } = useLoginModalStore();
  const navigate = useNavigate();
  const logout = useLogout();

  const navBarColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  if (isLoading) {
    return <Loading />;
  }

  const handleCarSellButton = () => {
    if (!data) {
      open();
    } else {
      navigate("/sell");
    }
  };

  const handleLogout = () => {
    logout.mutate();
  };

  const handleSearch = () => {
    if (search === "") return;
    navigate("/search?q=" + search);
    setSearch("");
  };

  const navLinks = [
    { label: "My Account", value: "/account" },
    { label: "My Listings", value: "/account/listings" },
    { label: "Settings", value: "/account/settings" },
  ];

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
          <InputRightElement>
            <IconButton
              aria-label="search"
              variant="ghost"
              icon={<SearchIcon />}
              onClick={handleSearch}
            />
          </InputRightElement>
          <Input
            type="text"
            variant="outline"
            placeholder="Search for Cars (ex: Honda City 2018)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Show above="xl">
          {data ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={data.name}
                  src={PROFILE_CDN_URL + data?.profilePicture}
                  boxSize={10}
                />
              </MenuButton>
              <MenuList>
                {navLinks.map((navLink, index) => (
                  <NavLink key={index} to={navLink.value}>
                    <MenuItem>{navLink.label}</MenuItem>
                  </NavLink>
                ))}
                <MenuDivider mx={2} />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
        <Hide above="xl">
          <IconButton
            aria-label="nav menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
          <Drawer isOpen={MenuIsOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Logo />
              </DrawerHeader>
              <DrawerBody>
                <Stack divider={<StackDivider />} spacing={8}>
                  <Stack>
                    <Button justifyContent="flex-start">Auctions</Button>
                    <Button justifyContent="flex-start" variant="primary" onClick={handleCarSellButton}>
                      Sell A Car
                    </Button>
                  </Stack>
                  <Stack>
                    {data ? (
                      <Stack>
                        <HStack mb={4}>
                          <Avatar
                            name={data.name}
                            src={PROFILE_CDN_URL + data?.profilePicture}
                            boxSize={10}
                          />
                          <Text fontSize="lg" fontWeight="bold">
                            {data.name}
                          </Text>
                        </HStack>
                        {navLinks.map((navLink, index) => (
                          <NavLink key={index} to={navLink.value}>
                            <Button
                              variant="outline"
                              justifyContent="flex-start"
                              w="100%"
                            >
                              {navLink.label}
                            </Button>
                          </NavLink>
                        ))}
                      </Stack>
                    ) : (
                      <Button variant="outline" onClick={open}>
                        Sign In
                      </Button>
                    )}
                    {isOpen && <LoginModal />}
                  </Stack>
                </Stack>
              </DrawerBody>
              {data && (
                <DrawerFooter>
                  <Button colorScheme="red" onClick={handleLogout}>
                    Logout
                  </Button>
                </DrawerFooter>
              )}
            </DrawerContent>
          </Drawer>
        </Hide>
      </HStack>
    </HStack>
  );
};

export default NavBar;
