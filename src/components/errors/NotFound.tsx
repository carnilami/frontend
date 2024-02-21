import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container centerContent mt="auto" textAlign="center">
      <Heading size="4xl" color="">
        404
      </Heading>
      <Text>Page not found</Text>
      <Text mt={3} color="gray">
        Looks like you are lost in the universe of vehicles, let me guide you
        back!
      </Text>
      <Link to="/">
        <Button mt={3} size="sm" variant="outline">
          Go Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
