import { Box, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import { Facebook, Instagram, Twitter, Youtube, Copyright } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      <Divider mt={12} mb={2} borderColor={"gray.500"} />
      <Box as="button" mt={15} mb={5}>
        <HStack justifyContent="space-between" p={4}>
          <Stack>
            <Logo />
          </Stack>
          <Stack>
            <Text textAlign="start">Selling a Car</Text>
            <Text textAlign="start">Buying a Car</Text>
            <Text textAlign="start">FAQs</Text>
          </Stack>
          <Stack>
            <Text textAlign="start">Support</Text>
            <Text textAlign="start">Photograpy Guide</Text>
            <Text textAlign="start">Search Vehicle</Text>
          </Stack>
          <Stack>
            <HStack>
              <Instagram />
              <Facebook />
              <Twitter />
              <Youtube />
            </HStack>
            <HStack>
            <Copyright size={15}/>
            <Text>Copyright 2024 Car Nilami</Text>
            </HStack>
          </Stack>
        </HStack>
      </Box>
    </>
  );
};

export default Footer;
