import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
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
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useLoginModalStore } from "../../stores";
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
            <FormControl>
              <FormLabel>
                Phone <QuestionOutlineIcon fontSize="xs" />
              </FormLabel>
              <InputGroup>
                <InputLeftAddon>+92</InputLeftAddon>
                <Input variant="filled" type="tel" placeholder="03123456789" />
              </InputGroup>
            </FormControl>
            <Text textAlign="end" textDecoration="underline" color="gray">
              Forget Password?
            </Text>
            <Button w="100%" variant="primary">
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
              <NavLink to="http://localhost:3000/api/auth/google">
                <Button
                  variant="outline"
                  leftIcon={<Icon as={FaGoogle} fontSize="xl" />}
                  w="100%"
                >
                  Continue with Google
                </Button>
              </NavLink>
              <Button
                variant="outline"
                leftIcon={<Icon as={FaFacebook} fontSize="xl" />}
              >
                Continue with Facebook
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
