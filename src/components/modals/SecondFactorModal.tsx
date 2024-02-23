import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useResendOtp from "../../hooks/auth/useResendOtp";
import useVerifyOtp from "../../hooks/auth/useVerifyOtp";

interface Props {
  phone: string;
  onClose: () => void;
}

const SecondFactorModal = ({ phone, onClose }: Props) => {
  const [otp, setOtp] = useState<number | null>(null);
  const [secondsUntilResend, setSecondsUntilResend] = useState(60);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast();
  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  useEffect(() => {
    if (secondsUntilResend > 0) {
      const interval = setInterval(() => {
        if (secondsUntilResend === 1) {
          clearInterval(interval);
        }
        setSecondsUntilResend(secondsUntilResend - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [secondsUntilResend]);

  const handleSecondFactor = () => {
    verifyOtp.mutate(
      { phone, otp: otp! },
      {
        onSuccess: () => {
          toast({
            title: "Login Successful",
            description: "You have been successfully logged in.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          closeAndResetOtpModal();
        },
        onError: (error: AxiosError) => {
          setError(error.response?.data as string);
        },
      }
    );
  };

  const handleOtpResend = () => {
    if (secondsUntilResend === 0) {
      setResendingOtp(true);
      resendOtp.mutate(
        { phone },
        {
          onSuccess: () => {
            toast({
              title: "OTP Sent",
              description: "We have sent a new OTP to your WhatsApp number.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setSecondsUntilResend(60);
            setOtp(null);
            setResendingOtp(false);
          },
          onError: (error: AxiosError) => {
            setError(error.response?.data as string);
            setResendingOtp(false);
          },
        }
      );
    }
  };

  const closeAndResetOtpModal = () => {
    setError("");
    setOtp(null);
    onClose();
  };

  const isOtpValid = new RegExp("\\d{6}").test(otp?.toString() || "");

  return (
    <Modal isOpen={true} onClose={closeAndResetOtpModal} isCentered size={{ base: 'sm', md: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            Enter OTP
          </Text>
          <Text fontSize="sm" color="gray.500">
            We have sent an OTP to WhatsApp number. Please enter it below.
          </Text>
        </ModalHeader>
        <ModalBody>
          {error && (
            <Alert status="error" mb={6}>
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <HStack justifyContent="space-between">
            <PinInput otp onChange={(v) => setOtp(parseInt(v))} size="lg">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack mt={6}>
            <Tag
              colorScheme={secondsUntilResend === 0 ? "green" : "gray"}
              cursor={secondsUntilResend === 0 ? "pointer" : "not-allowed"}
              onClick={handleOtpResend}
            >
              {resendingOtp ? "Resending..." : "Resend OTP"}
            </Tag>
            <Text>{secondsUntilResend}s</Text>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              mr={3}
              onClick={handleSecondFactor}
              isDisabled={!isOtpValid || verifyOtp.isPending}
              isLoading={verifyOtp.isPending}
            >
              Verify
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SecondFactorModal;
