import { AddIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import converter from "number-to-words";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Auction, AuctionBid } from "../../entities/Auction";
import useAddBid from "../../hooks/bids/useAddBid";
import useUser from "../../hooks/users/useUser";
import {
  AuctionBiddingFormData,
  AuctionBiddingFormSchema,
} from "../../utils/validations";

interface Props {
  auction: Auction;
}

const PlaceBidModal = ({ auction }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addBid = useAddBid();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuctionBiddingFormData>({
    resolver: zodResolver(AuctionBiddingFormSchema),
  });

  const [numericValue, setNumericValue] = useState<number>(0);
  const [wordsValue, setWordsValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { data: userData } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.replace(/,/g, "");
    const newValue = parseInt(inputValue, 10) || 0;

    setNumericValue(newValue);
    setWordsValue(converter.toWords(newValue) + " rupees");
  };

  const handleIncreaseBid = () => {
    setNumericValue((prevValue) => prevValue + 10000);
    setWordsValue(converter.toWords(numericValue + 10000) + " rupees");
  };

  const handleDecreaseBid = () => {
    const newValue = numericValue - 10000;
    const updatedValue = newValue >= 0 ? newValue : 0;
    setNumericValue(updatedValue);
    setWordsValue(converter.toWords(updatedValue) + " rupees");
  };

  const onSubmit = (data: AuctionBiddingFormData) => {
    if (!userData) return;
    if (error) setError(null);

    const bidData: AuctionBid = {
      auctionId: auction._id,
      userId: userData?._id,
      bid: data.bid,
    };
    addBid.mutate(bidData, {
      onSuccess: () => {
        toast({
          title: "Bid Placed",
          description: "Your bid has been successfully placed.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onClose();
      },
      onError: (error) => {
        setError((error.response?.data as string) || "An error occurred.");
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<PlusSquareIcon />} variant="primary">
        Place Bid
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={2}>
            <Heading size="md">
              {auction.make +
                " " +
                auction.model +
                " " +
                auction.variant +
                " " +
                auction.year}
            </Heading>
            <Text
              color={useColorModeValue("blackAlpha.700", "whiteAlpha.600")}
              fontSize="sm"
              pt={1}
            >
              The current highest bidder is Subhan Yousaf with a bid of PKR
              3,000,000
            </Text>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {error && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormControl isInvalid={!!errors.bid}>
                <FormLabel>Your Bid</FormLabel>
                <InputGroup>
                  <InputLeftElement pl={2} fontWeight="bold">
                    PKR
                  </InputLeftElement>
                  <Input
                    {...register("bid", { valueAsNumber: true })}
                    type="text"
                    pl={12}
                    variant="filled"
                    border="1px solid"
                    borderColor="gray.500"
                    placeholder="Enter your bid"
                    onChange={handleInputChange}
                    value={numericValue}
                  />
                </InputGroup>
                <FormHelperText>{wordsValue}</FormHelperText>
                {errors.bid && (
                  <FormErrorMessage>{errors.bid.message}</FormErrorMessage>
                )}
              </FormControl>
              <HStack justifyContent="space-between" mt={4}>
                <Button
                  onClick={handleIncreaseBid}
                  variant="outline"
                  leftIcon={<AddIcon fontSize="sm" />}
                >
                  Increase Bid
                </Button>
                <Text fontSize="md" fontWeight="bold">
                  PKR 10,000
                </Text>
                <Button
                  onClick={handleDecreaseBid}
                  variant="outline"
                  leftIcon={<MinusIcon fontSize="sm" />}
                  disabled={numericValue - 10000 < 0}
                >
                  Decrease Bid
                </Button>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="primary"
                type="submit"
                isDisabled={addBid.isPending}
                isLoading={addBid.isPending}
                loadingText="Submitting Bid"
              >
                Confirm Bid
              </Button>
              <Button ml={2} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlaceBidModal;
