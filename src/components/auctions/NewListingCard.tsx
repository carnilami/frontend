import { Box, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  image: string;
  city: string;
}

const NewListingCard = ({ title, description, image, city }: Props) => {
  return (
    <Card overflow="hidden" variant="unstyled">
      <CardBody>
        <Box position="relative" display="inline-block">
          <Image borderRadius={5} src={image} _hover={{ opacity: 0.8 }} />
        </Box>
        <Heading size="sm">
          {title}
        </Heading>
        <Text fontSize="sm">{description}</Text>
        <Text fontSize="sm" color={"gray.400"}>
          {city}
        </Text>
      </CardBody>
    </Card>
  );
};

export default NewListingCard;
