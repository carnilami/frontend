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
  Input,
  UnorderedList,
  Textarea,
  Button

} from "@chakra-ui/react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
          Once you've agreed on a price, finalize the sale and arrange for payment and delivery. CarNilami ensures a secure transaction process to protect both buyers and sellers.
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
          Find a clean, well-lit area to photograph your car. Avoid busy backgrounds or distracting elements.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
          Highlight Key Features
          </Heading>
          Take photos during the day to make the most of natural light. Avoid harsh shadows by shooting in the early morning or late afternoon.
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
          Clean your car inside and out before taking photos. Remove clutter from the interior and ensure the exterior is free of dirt and debris
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
          Take Multiple Angles
          </Heading>
          Capture your car from different angles to provide a comprehensive view. Include shots of the front, back, sides, and interior.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
          Landscape Photos Only
          </Heading>
          Please make sure to take all photographs in Landscape orentiation. No Portraits allowed.
        </ListItem>
        <ListItem>
          <Heading my={3} as="h3" size="md">
          Edit and Enhance
          </Heading>
          Use photo editing software to enhance your images. Adjust brightness, contrast, and color balance to make your photos look their best.
        </ListItem>
      </UnorderedList>



      {/*ACCORDIANS ( FAQ )*/}

      <Heading
        mt={10}
        mb={5}
        as="h2"
        size="xl"
        borderBottom="3px solid"
        pb={3}
        borderColor="blue.400"
      >
        Frequently Asked Questions
      </Heading>

      <Accordion defaultIndex={[0]} allowMultiple my="5">
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="600">
                {" "}
                What are the fees for the buyer on car nilami?{" "}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text fontSize="lg">
              In addition to the final purchase price paid to the seller, buyers
              pay a 4.5% buyer’s fee to Cars & Bids. The buyer’s fee has a
              minimum of $225, and a maximum of $4,500.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="600">
                {" "}
                How do I place a bid?{" "}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text fontSize="lg">
              In order to place a bid, you first have to register, which we’ve
              explained above. Once you’ve registered and you’ve found a car
              you’re interested in buying, bidding is easy – just click the
              “Place Bid” icon on a vehicle’s listing page. Then, you’re
              prompted to enter your bid amount. Your bid must be higher than
              the previous bid, of course – and depending on the current bidding
              level, there may be a minimum increase over the previous bid. Once
              you’ve submitted your bid, we place a hold on your credit card for
              4.5% of your bid amount until the duration of the auction, in case
              you end up as the winning bidder.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="600">
                How do bid increments work?
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text fontSize="lg">
              Bid increments increase as follows: Minimum bid of $100 to start
              the auction 100 PKR increments up to $14,999 250 PKR increments
              from $15,000 to $49,999 500 PKR increments from $50,000 to 20 Lakh
              1,000 PKR increments at or above 50 Lakh
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="600">
                How do I contact a seller privately?
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text fontSize="lg">
              Bid increments increase as follows: Minimum bid of $100 to start
              the auction 100 PKR increments up to $14,999 250 PKR increments
              from $15,000 to $49,999 500 PKR increments from $50,000 to 20 Lakh
              1,000 PKR increments at or above 50 Lakh
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="600">
                Once the auction is over, how do I complete the transaction?
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text fontSize="lg">
              At the conclusion of the auction, both the buyer and seller are
              given each other’s contact information to complete the
              transaction. Read more about Finalizing the Transaction.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* SUPPORT PAGE */}

      <Stack mt={10} spacing={5}>
        <Heading>Looking for help? Contact Us below;</Heading>


        <Text> Fill up the form below and we'll get back in touch with you within 24 hours!  </Text> 
        
        <HStack mt={10}>  
        
        <Input placeholder=' Enter your Name ' width='50%' />

        <Input type= 'number' placeholder=' Enter your Phone Number ' width='50%'/>

        

         
          </HStack>

          <Input placeholder= 'Enter your Email ' /> 

        <Textarea placeholder="Enter your Question" /> 

        <Button variant="primary" width="50%"> Submit </Button> 
     
        
       
      </Stack>

    </>
  );
};

export default AboutUsPage;
