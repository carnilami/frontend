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
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaGoogle, FaWhatsapp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useInitiateLogin from "../../hooks/auth/useInitiateLogin";
import { useLoginModalStore } from "../../stores";
import { API_URL } from "../../utils/constants";
import Logo from "../nav/Logo";
import SecondFactorModal from "./SecondFactorModal";

const LoginModal = () => {
  const { isOpen, close } = useLoginModalStore();
  const [phone, setPhone] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [loginError, setLoginError] = useState("");

  const toast = useToast();
  const initiateLogin = useInitiateLogin();

  useEffect(() => {
    if (phone) {
      const phoneNumberRegex = /^3[0-4]\d{2}[0-9]{6}$/;
      if (!phoneNumberRegex.test(phone)) {
        setLoginError("Invalid phone number. Use the format 3000000000.");
      } else {
        setLoginError("");
      }
    }
  }, [phone]);

  const handleInitiateLogin = () => {
    initiateLogin.mutate(
      { phone },
      {
        onSuccess: () => {
          toast({
            title: "OTP Sent",
            description: "We have sent an OTP to your WhatsApp number.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoginError("");
          setOtpModal(true);
        },
        onError: (error: AxiosError) => {
          setLoginError(error.response?.data as string);
        },
      }
    );
  };

  const handleModalClosure = () => {
    setOtpModal(false);
    close();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered size={{ base: 'sm', md: "md" }}>
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
            <FormControl isInvalid={loginError !== ""}>
              <FormLabel>
                <HStack alignContent="center" spacing={1}>
                  <Icon as={FaWhatsapp} />
                  <Text>WhatsApp Number</Text>
                </HStack>
              </FormLabel>
              <InputGroup>
                <InputLeftAddon>+92</InputLeftAddon>
                <Input
                  variant="filled"
                  type="tel"
                  value={phone}
                  placeholder="300000000"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
              {loginError && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {loginError}
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              variant="primary"
              onClick={handleInitiateLogin}
              isDisabled={phone === "" || initiateLogin.isPending}
              isLoading={initiateLogin.isPending}
              loadingText="Sending OTP..."
            >
              Send One-Time Password
            </Button>
            {otpModal && (
              <SecondFactorModal phone={phone} onClose={handleModalClosure} />
            )}
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
