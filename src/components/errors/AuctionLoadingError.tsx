import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AuctionLoadingError = () => {
  return (
    <Container
      centerContent
      mt={"auto"}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={4}
      >
        <Heading size="lg">Oops! Something went wrong.</Heading>
        <Text color="gray">
          We're sorry, but it seems like there was an issue loading the auction.
          Please try again later. The developers were notified.
        </Text>
        <Link to="/">
          <Button>Return to homepage</Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default AuctionLoadingError;
