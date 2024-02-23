import {
  ArrowDownIcon,
  CheckCircleIcon,
  Search2Icon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Divider,
  HStack,
  Heading,
  ListItem,
  OrderedList,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const AboutUsPage = () => {
  return (
    <>
      <Stack spacing={6}>
        <Heading
          mt={10}
          as="h2"
          size="2xl"
          borderBottom="5px solid"
          pb={3}
          borderColor="blue.400"
        >
          Our Story
        </Heading>
        <Text fontSize="lg">
          At CarNilami, we understand that buying a car is not just a
          transaction; it's a journey, a dream fulfilled. Our journey began with
          a simple yet powerful idea – to create a seamless platform that
          revolutionizes the way people buy and sell cars. Whether you're a
          first-time buyer or a seasoned car enthusiast, we are here to make the
          process easy, enjoyable, and transparent.
        </Text>
        <Heading as="h2" size="xl">
          Our Mission
        </Heading>
        <Text fontSize="lg">
          CarNilami is on a mission to redefine the car auction experience. We
          strive to provide a platform that brings together buyers and sellers
          in a dynamic marketplace, where trust, convenience, and innovation
          converge. Our commitment is to make buying and selling cars an
          exciting and hassle-free experience for everyone involved.{" "}
        </Text>
        <Heading mt={5} as="h2" size="xl" pb={3}>
          What's Car Nilami?
        </Heading>
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <HStack>
              <Heading mb={2} as="h3" fontSize={24}>
                Lowest Fees!
              </Heading>
              <ArrowDownIcon fontSize="3xl" color="blue.500" />
            </HStack>
            <Text fontSize="lg">
              Unlock unparalleled value at CarNilami with our unbeatable fee
              structure. Enjoy the thrill of your first two ads being absolutely
              free! But that's not all – from your third ad onwards, experience
              the convenience of paying just 1000 PKR per ad
            </Text>
          </Box>
          <Box>
            <HStack>
              <Heading mb={2} as="h3" fontSize={24}>
                Stylish Car Auctions
              </Heading>
              <Search2Icon fontSize="3xl" color="blue.500" />
            </HStack>
            <Text fontSize="lg">
              Discover a diverse range of cars, from sleek sedans to rugged
              off-roaders, all in one place. CarNilami offers a wide selection
              to cater to every taste and preference. Whether you're looking for
              a reliable family car or a stylish sports car, you'll find it
              here.
            </Text>
          </Box>
          <Box>
            <HStack>
              <Heading mb={2} as="h3" fontSize={24}>
                Easy To Use
              </Heading>
              <CheckCircleIcon fontSize="3xl" color="blue.500" />
            </HStack>
            <Text fontSize="lg">
              Say goodbye to the traditional hassles of car buying. CarNilami is
              designed with your convenience in mind. Browse, bid, and buy – all
              from the comfort of your home. We've streamlined the process to
              save you time and effort.
            </Text>
          </Box>
          <Box>
            <HStack>
              <Heading mb={2} as="h3" fontSize={24}>
                Transparency
              </Heading>
              <ViewIcon fontSize="3xl" color="blue.500" />
            </HStack>
            <Text fontSize="lg">
              We believe in transparency at every step. Our platform is designed
              to provide you with all the information you need to make informed
              decisions. From detailed car listings to transparent auction
              processes, we're committed to keeping you in the know.
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
      <Heading
        mt={10}
        mb={5}
        as="h2"
        size="xl"
        borderBottom="3px solid"
        pb={3}
        borderColor="blue.400"
      >
        How Car Nilami Works?
      </Heading>
      <Heading my={3} as="h3" size="lg">
        Buying a Car
      </Heading>
      <OrderedList>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Explore Our Inventory
          </Heading>
          Browse through our extensive inventory of cars. Use our advanced
          search features to narrow down options based on your preferences –
          make, model, year, and more.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Detailed Listings
          </Heading>
          Click on any car to view detailed listings, including specifications,
          features, and high-quality images. We provide comprehensive
          information to help you make an informed decision.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Auction Process
          </Heading>
          Participate in our exciting auctions to secure the car of your dreams.
          Bid confidently, knowing that our auction processes are transparent
          and fair.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Secure Payment
          </Heading>
          Once you win an auction, proceed to secure payment options. CarNilami
          ensures a secure transaction process to give you peace of mind.
        </ListItem>
      </OrderedList>
      <Divider my={8} />
      <Heading as="h3" size="lg">
        Selling a Car
      </Heading>
      <OrderedList mt={3}>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Create Your Listing
          </Heading>
          Sign up and create a listing for your car. Provide detailed
          information, including specifications, features, and high-quality
          photos to attract potential buyers.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Engage with Buyers
          </Heading>
          Respond promptly to inquiries and engage with potential buyers to
          answer any questions they may have about your car.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Manage Offers
          </Heading>
          Receive offers from interested buyers and negotiate terms if
          necessary. CarNilami provides tools to manage offers and facilitate
          smooth transactions.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Complete the Sale
          </Heading>
          Once you've agreed on a price, finalize the sale and arrange for
          payment and delivery. CarNilami ensures a secure transaction process
          to protect both buyers and sellers.
        </ListItem>
      </OrderedList>
      <Heading
        mt={10}
        mb={5}
        as="h2"
        size="xl"
        borderBottom="3px solid"
        pb={3}
        borderColor="blue.400"
      >
        Photography Guide
      </Heading>
      <Heading as="h3" size="lg">
        Tips for Taking Great Photos
      </Heading>
      <UnorderedList mt={3}>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Choose the Right Location
          </Heading>
          Find a clean, well-lit area to photograph your car. Avoid busy
          backgrounds or distracting elements.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Highlight Key Features
          </Heading>
          Take photos during the day to make the most of natural light. Avoid
          harsh shadows by shooting in the early morning or late afternoon.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Use Natural Light
          </Heading>
          Receive offers from interested buyers and negotiate terms if
          necessary. CarNilami provides tools to manage offers and facilitate
          smooth transactions.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Keep it Clean
          </Heading>
          Clean your car inside and out before taking photos. Remove clutter
          from the interior and ensure the exterior is free of dirt and debris
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Take Multiple Angles
          </Heading>
          Capture your car from different angles to provide a comprehensive
          view. Include shots of the front, back, sides, and interior.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Landscape Photos Only
          </Heading>
          Please make sure to take all photographs in Landscape orentiation. No
          Portraits allowed.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
            Edit and Enhance
          </Heading>
          Use photo editing software to enhance your images. Adjust brightness,
          contrast, and color balance to make your photos look their best.
        </ListItem>
      </UnorderedList>
    </>
  );
};

export default AboutUsPage;
