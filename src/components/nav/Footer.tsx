import { Box, Divider, HStack, Hide, Stack, Text } from "@chakra-ui/react";
import { Copyright, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Stack mt="auto">
      <Divider mt={12} mb={2} borderColor={"gray.500"} />
      <Box as="button" mt={15} mb={5}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          p={4}
          spacing={8}
        >
          <Hide below="md">
            <Box>
              <Logo />
            </Box>
          </Hide>
          <HStack justifyContent="space-between" spacing={{ md: 16 }}>
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
          </HStack>
          <Stack>
            <HStack>
              <Instagram />
              <Facebook />
              <Twitter />
              <Youtube />
            </HStack>
            <HStack>
              <Copyright size={15} />
              <Text>Copyright 2024 Car Nilami</Text>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Footer;
