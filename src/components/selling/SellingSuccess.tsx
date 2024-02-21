import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SellingSuccess = () => {
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
      <Link to="/account/listings">
        <Button mt={6} colorScheme="green">
          My Listings
        </Button>
      </Link>
    </Alert>
  );
};

export default SellingSuccess;
