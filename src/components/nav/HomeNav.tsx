import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaCarSide, FaMotorcycle, FaTruck } from "react-icons/fa";
import { FaTruckField } from "react-icons/fa6";

const HomeNav = () => {
  const vehicleTypes = [
    { logo: <Icon as={FaCarSide} fontSize={20} />, name: "Sedan" },
    { logo: <Icon as={FaTruckField} fontSize={20} />, name: "SUV" },
    { logo: <Icon as={FaTruck} fontSize={20} />, name: "Truck" },
    { logo: <Icon as={FaMotorcycle} fontSize={20} />, name: "Motorcycle" },
  ];

  const responsiveButton = { base: "sm", md: "md" };

  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Heading size="lg" pr={3}>
        Auctions
      </Heading>
      <HStack>
        <Popover>
          <PopoverTrigger>
            <Button
              size={responsiveButton}
              variant="outline"
              rightIcon={<ChevronDownIcon />}
            >
              Year
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <HStack>
                <Input placeholder="From:" size="sm" />
                <Text>-</Text>
                <Input placeholder="To:" size="sm" />
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button
              size={responsiveButton}
              variant="outline"
              rightIcon={<ChevronDownIcon />}
            >
              Price
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <HStack>
                <Input placeholder="Mi:" size="sm" />
                <Text>-</Text>
                <Input placeholder="Max:" size="sm" />
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Menu>
          <MenuButton
            variant="outline"
            as={Button}
            size={responsiveButton}
            rightIcon={<ChevronDownIcon />}
          >
            Vehicle Type
          </MenuButton>
          <MenuList>
            {vehicleTypes.map((type, index) => (
              <MenuItem key={index} icon={type.logo}>
                {type.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </Stack>
  );
};

export default HomeNav;
