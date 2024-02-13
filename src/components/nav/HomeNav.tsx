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
  Text,
} from "@chakra-ui/react";
import { FaCarSide, FaMotorcycle, FaTruck } from "react-icons/fa";
import { FaTruckField } from "react-icons/fa6";
import {
  SiHonda,
  SiHyundai,
  SiKia,
  SiMg,
  SiSuzuki,
  SiToyota,
  SiMercedes,
  SiBmw,
} from "react-icons/si";

const HomeNav = () => {
  const carBrands = [
    { logo: <Icon as={SiSuzuki} fontSize={20} />, name: "Suzuki" },
    { logo: <Icon as={SiToyota} fontSize={20} />, name: "Toyota" },
    { logo: <Icon as={SiHonda} fontSize={20} />, name: "Honda" },
    { logo: <Icon as={SiKia} fontSize={20} />, name: "KIA" },
    { logo: <Icon as={SiHyundai} fontSize={20} />, name: "Hyundai" },
    { logo: <Icon as={SiMercedes} fontSize={20} />, name: "Mercedes" },
    { logo: <Icon as={SiBmw} fontSize={20} />, name: "BMW" },
    { logo: <Icon as={SiMg} fontSize={20} />, name: "MG" },
  ];
  const vehicleTypes = [
    { logo: <Icon as={FaCarSide} fontSize={20} />, name: "Sedan" },
    { logo: <Icon as={FaTruckField} fontSize={20} />, name: "SUV" },
    { logo: <Icon as={FaTruck} fontSize={20} />, name: "Truck" },
    { logo: <Icon as={FaMotorcycle} fontSize={20} />, name: "Motorcycle" },
  ];
  return (
    <HStack>
      <Heading size="lg" pr={3}>
        Auctions
      </Heading>
      <Menu>
        <MenuButton variant="outline" as={Button} rightIcon={<ChevronDownIcon />}>
          Brand
        </MenuButton>
        <MenuList>
          {carBrands.map((brand) => (
            <MenuItem icon={brand.logo}>{brand.name}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" rightIcon={<ChevronDownIcon />}>
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
          <Button variant="outline" rightIcon={<ChevronDownIcon />}>
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
        <MenuButton variant="outline" as={Button} rightIcon={<ChevronDownIcon />}>
          Vehicle Type
        </MenuButton>
        <MenuList>
          {vehicleTypes.map((type) => (
            <MenuItem icon={type.logo}>{type.name}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default HomeNav;
