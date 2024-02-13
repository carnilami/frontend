import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  StackDirection,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Circle } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useSellingPageStore } from "../../stores";
import {
  VehicleInfoFormData as VehicleInfoFD,
  VehicleInfoFormSchema,
} from "../../utils/validations";
import CustomRadio from "../nav/CustomRadio";
import { AuctionInfoFormData } from "../../entities/Auction";

const VehicleInfo = () => {
  const setStep = useSellingPageStore((state) => state.setStep);
  const setData = useSellingPageStore((state) => state.setData);
  const formData = useSellingPageStore((state) => state.data);

  const [isVehicleRegistered, setIsVehicleRegistered] = useState(
    formData.registered === "registered" ||
      formData.registered === undefined
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VehicleInfoFD>({
    resolver: zodResolver(VehicleInfoFormSchema),
    defaultValues: formData,
  });

  const currentYear: number = new Date().getFullYear();
  const yearsArray: number[] = Array.from(
    { length: currentYear - 1939 },
    (_, index) => index + 1940
  );

  const onSubmit = (data: FieldValues) => {
    setData(data as AuctionInfoFormData);
    setStep(1);
  };

  const renderCustomRadio = (
    name: keyof VehicleInfoFD,
    values: string[]
  ) => (
    <Controller
      control={control}
      name={name}
      defaultValue={values[0]}
      render={({ field: { onChange, value } }) => (
        <CustomRadio
          values={values}
          defaultValue={value as string} // Ensure the type is compatible
          onChange={(selectedValue) => {
            onChange(selectedValue);
            selectedValue === "Registered"
              ? setIsVehicleRegistered(true)
              : setIsVehicleRegistered(false);
          }}
        />
      )}
    />
  );

  const directionResponsive: StackDirection = { base: "column", md: "row" };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Card variant="outline">
          <CardHeader>
            <Stack direction="row" spacing={2} alignItems="center">
              <Circle stroke="#3182ce" size={20} fill="#3182ce" />
              <Heading size="md">Vehicle Info</Heading>
            </Stack>
          </CardHeader>
          <CardBody as={Stack} spacing={8}>
            <Stack direction={directionResponsive} spacing={6}>
              <FormControl isInvalid={!!errors.make}>
                <FormLabel>Make</FormLabel>
                <Input {...register("make")} placeholder="Suzuki" />
                <FormErrorMessage>
                  {errors.make && errors.make.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.model}>
                <FormLabel>Model</FormLabel>
                <Input {...register("model")} placeholder="Suzuki" />
                <FormErrorMessage>
                  {errors.model && errors.model.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.variant}>
                <FormLabel>Variant</FormLabel>
                <Input {...register("variant")} placeholder="VXL" />
                <FormErrorMessage>
                  {errors.variant && errors.variant.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction={directionResponsive} spacing={6}>
              <FormControl isInvalid={!!errors.year}>
                <FormLabel>Year</FormLabel>
                <Select
                  {...register("year", { valueAsNumber: true })}
                  placeholder="Select Year"
                  defaultValue={formData.year || currentYear}
                >
                  {yearsArray.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.year && errors.year.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.mileage}>
                <FormLabel>Mileage (KMs)</FormLabel>
                <Input
                  type="number"
                  {...register("mileage", { valueAsNumber: true })}
                  placeholder="100,000"
                />
                <FormErrorMessage>
                  {errors.mileage && errors.mileage.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.engineCapacity}>
                <FormLabel>Engine Capacity (CC)</FormLabel>
                <Input
                  type="number"
                  {...register("engineCapacity", { valueAsNumber: true })}
                  placeholder="660"
                />
                <FormErrorMessage>
                  {errors.engineCapacity && errors.engineCapacity.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction={directionResponsive} spacing={6}>
              <FormControl isInvalid={!!errors.transmission}>
                <FormLabel>Transmission Type</FormLabel>
                <Select
                  {...register("transmission")}
                  placeholder="Select Transmission"
                  defaultValue={formData.transmission}
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </Select>
                <FormErrorMessage>
                  {errors.transmission && errors.transmission.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.fuelType}>
                <FormLabel>Fuel Type</FormLabel>
                <Select
                  {...register("fuelType")}
                  placeholder="Select Fuel Type"
                  defaultValue={formData.fuelType}
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="cng">CNG</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </Select>
                <FormErrorMessage>
                  {errors.fuelType && errors.fuelType.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Divider />
            <Stack direction={directionResponsive}>
              <FormControl>
                <FormLabel>
                  Is this vehicle registered with the excise department?
                </FormLabel>
                {renderCustomRadio("registered", [
                  "Registered",
                  "Unregistered",
                ])}
              </FormControl>

              <FormControl isInvalid={!!errors.registeredProvince}>
                <FormLabel>Registration Province</FormLabel>
                <Select
                  {...register("registeredProvince")}
                  placeholder="Select Province"
                  defaultValue={formData.registeredProvince}
                  isDisabled={!isVehicleRegistered}
                >
                  <option value="punjab">Punjab</option>
                  <option value="sindh">Sindh</option>
                  <option value="kpk">KPK</option>
                  <option value="balochistan">Balochistan</option>
                  <option value="gilgit">Gilgit Baltistan</option>
                  <option value="ajk">AJK</option>
                </Select>
                <FormErrorMessage>
                  {errors.registeredProvince &&
                    errors.registeredProvince.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <FormControl isInvalid={!!errors.modified}>
              <FormLabel>Was the vehicle modified or altered?</FormLabel>
              <RadioGroup defaultValue={formData.modified || "no"} pl={2}>
                <Stack direction="column">
                  <Radio {...register("modified")} value="no">
                    No, its stock
                  </Radio>
                  <Radio {...register("modified")} value="yes">
                    Yes, its modified
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.modified && errors.modified.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.flaws}>
              <FormLabel>Any major mechnical or body flaws?</FormLabel>
              <RadioGroup defaultValue={formData.flaws || "no"} pl={2}>
                <Stack direction="column">
                  <Radio {...register("flaws")} value="no">
                    No
                  </Radio>
                  <Radio {...register("flaws")} value="yes">
                    Yes
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.flaws && errors.flaws.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Is the vehicle Pakistani made or imported?</FormLabel>
              {renderCustomRadio("imported", ["Pakistani", "Imported"])}
            </FormControl>
          </CardBody>
        </Card>
        <Box justifyContent="flex-end" display="flex" flexDirection="row">
          <Button type="submit" variant="solid" colorScheme="blue">
            Continue
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default VehicleInfo;
