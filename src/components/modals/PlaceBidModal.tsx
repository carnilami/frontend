import { AddIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
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
} from "@chakra-ui/react";
import converter from "number-to-words";
import { useState } from "react";
import Auction from "../../entities/Auction";

interface Props {
  auction: Auction;
}

const PlaceBidModal = ({ auction }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [numericValue, setNumericValue] = useState<number>(0);
  const [wordsValue, setWordsValue] = useState<string>("");

  console.log(numericValue);

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
            <Text color={useColorModeValue("blackAlpha.700", "whiteAlpha.600")} fontSize="sm" pt={1}>
              The current highest bidder is Subhan Yousaf with a bid of PKR
              3,000,000
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Your Bid</FormLabel>
              <InputGroup>
                <InputLeftElement pl={2} fontWeight="bold">
                  PKR
                </InputLeftElement>
                <Input
                  type="text"
                  pl={12}
                  variant="filled"
                  border="1px solid"
                  borderColor="gray.500"
                  placeholder="Enter your bid"
                  onChange={handleInputChange}
                  value={numericValue.toLocaleString()}
                />
              </InputGroup>
              <FormHelperText>{wordsValue}</FormHelperText>
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
            <Button onClick={onClose} variant="primary">
              Confirm Bid
            </Button>
            <Button ml={2} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlaceBidModal;
