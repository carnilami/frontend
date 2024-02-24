import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSellingPageStore } from "../../stores";

const SellingSuccess = () => {
  const setStep = useSellingPageStore((state) => state.setStep);

  const handleNewAd = () => {
    setStep(0);
  }

  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="300px"
      borderRadius={10}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Auction submitted!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thank you for submitting the Auction. The auction will become available
        once our team has reviewed and approved it.
      </AlertDescription>
      <Stack mt={6} spacing={1}>
        <Link to="/account/listings">
          <Button w="100%" colorScheme="green">My Listings</Button>
        </Link>
        <Button colorScheme="green" variant="outline" onClick={handleNewAd}>
          Post New Ad
        </Button>
      </Stack>
    </Alert>
  );
};

export default SellingSuccess;
