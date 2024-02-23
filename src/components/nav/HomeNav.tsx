import { Heading, Stack } from "@chakra-ui/react";

const HomeNav = () => {
  /* const vehicleTypes = [
    { logo: <Icon as={FaCarSide} fontSize={20} />, name: "Sedan" },
    { logo: <Icon as={FaTruckField} fontSize={20} />, name: "SUV" },
    { logo: <Icon as={FaTruck} fontSize={20} />, name: "Truck" },
    { logo: <Icon as={FaMotorcycle} fontSize={20} />, name: "Motorcycle" },
  ];

  const responsiveButton = { base: "sm", md: "md" }; IMPLEMENT THIS SOON */

  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Heading size="lg" pr={3}>
        Auctions
      </Heading>
    </Stack>
  );
};

export default HomeNav;
