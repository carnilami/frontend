import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGoogle, FaWhatsapp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useLoginModalStore } from "../../stores";
import { API_URL } from "../../utils/constants";
import Logo from "../nav/Logo";

const LoginModal = () => {
  const { isOpen, close } = useLoginModalStore();

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader pt={7}>
          <Container centerContent>
            <Logo />
            <Heading pt={3} size="lg">
              Sign In
            </Heading>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              Or create an account
            </Text>
          </Container>
        </ModalHeader>
        <ModalBody>
          <Stack spacing={3}>
            <FormControl isInvalid>
              <FormLabel>
                <HStack alignContent="center" spacing={1}>
                  <Icon as={FaWhatsapp} />
                  <Text>WhatsApp Number</Text>
                </HStack>
              </FormLabel>
              <InputGroup>
                <InputLeftAddon>+92</InputLeftAddon>
                <Input isDisabled variant="filled" type="tel" placeholder="03123456789" />
              </InputGroup>
              <FormErrorMessage>
                <FormErrorIcon />
                WhatsApp authentication is disabled, please use google.
              </FormErrorMessage>
            </FormControl>
            <Text textAlign="end" textDecoration="underline" color="gray">
              Forget Password?
            </Text>
            <Button w="100%" variant="primary" isDisabled>
              Continue
            </Button>
            <Box position="relative" py={5}>
              <Divider />
              <AbsoluteCenter
                bg={useColorModeValue("whiteAlpha.900", "gray.700")}
                px="4"
              >
                or
              </AbsoluteCenter>
            </Box>
            <Stack>
              <NavLink to={API_URL + "/api/auth/google"}>
                <Button
                  variant="outline"
                  leftIcon={<Icon as={FaGoogle} fontSize="xl" />}
                  w="100%"
                >
                  Continue with Google
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
