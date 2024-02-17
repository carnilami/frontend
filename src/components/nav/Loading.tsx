import { Container, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container centerContent w="100%" h="100vh" justifyContent="center" >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Container>
  );
};

export default Loading;
