import {
  Box,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react";

const SearchVehicle = () => {
  const [value, setValue] = useState("1");
  return (
    <Stack spacing={6} mt={10}>
      <Heading size="xl" textAlign="center">
        Filter for cars and vehicles up for auctions
      </Heading>
      <HStack>
        <Select
          placeholder="Select BodyType"
          width="20%"
          variant="filled"
        >
          <option value="option1">Sedan</option>
          <option value="option1">HatchBack</option>
          <option value="option2">MotorBike </option>
          <option value="option3">Heavy Vehicle</option>
        </Select>

        <Select placeholder="Select City" width="20%" variant="filled">
          <option value="option1">Lahore</option>
          <option value="option2">Islamabad </option>
          <option value="option3">Karachi</option>
          <option value="option3">Sialkot</option>
          <option value="option3">Gujranwala</option>
          <option value="option3">Larri Adda</option>
          <option value="option3">Multan</option>
        </Select>

        <Select placeholder="Select Brand" width="20%" variant="filled">
          <option value="option1">Toyota</option>
          <option value="option2">Honda </option>
          <option value="option3">Suzuki</option>
          <option value="option3">MG</option>
          <option value="option3">Hyundai</option>
          <option value="option3">Kia</option>
          <option value="option3">Changan</option>
          <option value="option3">Nissan</option>
          <option value="option3">Daihatsu</option>
          <option value="option3">DFSK</option>
        </Select>
    

     
        <Select placeholder="Fuel Type" width="20%">
          <option value="Option1">Petrol</option>
          <option value="Option2">Diesel</option>
          <option value="Option3">Hybrid</option>
          <option value="Option4">Electric</option>
        </Select>
        </HStack>
        <Box borderWidth={5} overflow='hidden' width="20%">
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio value="1">Manual</Radio>
              <Radio value="2">Automatic</Radio>
            </Stack>
          </RadioGroup>
        </Box>
    
    </Stack>
  );
};

export default SearchVehicle;
