import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "chakra-react-select";
import { Circle, UploadCloud } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import cities from "../../assets/cities.json";
import { AuctionInfoFormData } from "../../entities/Auction";
import useAddAuction from "../../hooks/auctions/useAddAuction";
import { useSellingPageStore } from "../../stores";
import {
  AuctionInfoFormData as AuctionInfoFD,
  AuctionInfoFormSchema,
} from "../../utils/validations";
import CustomRadio from "../nav/CustomRadio";

const SellingAuctionInfo = () => {
  const [isReserved, setIsReserved] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const setStep = useSellingPageStore((state) => state.setStep);
  const setData = useSellingPageStore((state) => state.setData);
  const postData = useSellingPageStore((state) => state.data);

  const addAuction = useAddAuction();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuctionInfoFD>({
    resolver: zodResolver(AuctionInfoFormSchema),
  });

  const onSubmit = (data: AuctionInfoFormData) => {
    setData({ ...data, images });
    const submissionData = { ...postData, ...data, images };
    addAuction.mutate(submissionData, {
      onSuccess: () => {
        setStep(2);
      },
    });
  };

  const handleImages = (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const cityNameObj = cities.map((city) => {
    return { label: city.name, value: city.name };
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Card variant="outline">
          <CardHeader>
            <Stack direction="row" spacing={2} alignItems="center">
              <Circle stroke="#3182ce" size={20} fill="#3182ce" />
              <Heading size="md">Auction Info</Heading>
            </Stack>
          </CardHeader>
          <CardBody as={Stack} spacing={8}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input {...register("title")} placeholder="e.g Urgent Sale" />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description")}
                placeholder="Please be as detailed as possible. Having a detailed description will lure in a lot of customers."
              />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent="space-between"
              spacing={6}
            >
              <FormControl>
                <FormLabel>How long should the auction last?</FormLabel>
                <Controller
                  control={control}
                  name="expiry"
                  defaultValue={"14d"}
                  render={({ field: { onChange } }) => (
                    <CustomRadio
                      values={["7d", "14d", "30d"]}
                      defaultValue={"14d"}
                      onChange={onChange}
                    />
                  )}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.city}>
                <FormLabel>What city is the auction targeted for?</FormLabel>
                <Controller
                  control={control}
                  name="city"
                  defaultValue={undefined}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      name="city"
                      options={cityNameObj}
                      placeholder="Select City"
                      onChange={(v) => onChange(v?.value)}
                      onBlur={onBlur}
                      value={cityNameObj.find((c) => c.value === value)}
                    />
                  )}
                />
                {errors.city && (
                  <FormErrorMessage>{errors.city.message}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardHeader>
            <Stack direction="row" spacing={2} alignItems="center">
              <Circle stroke="#3182ce" size={20} fill="#3182ce" />
              <Heading size="md">Reserve Price</Heading>
            </Stack>
          </CardHeader>
          <CardBody as={Stack} spacing={6} pt={0}>
            <Stack p={5} bg={"blackAlpha.100"} borderRadius={10}>
              <Text>
                The reserve price is confidential, representing the minimum
                amount your vehicle must reach to be sold. Vehicles with reserve
                prices may attract less attention compared to those without
                reserves.
              </Text>
              <Text>
                Please note that bidding often brings the end result well above
                the reserve price.
              </Text>
            </Stack>
            <FormControl>
              <FormLabel>
                Do you want to set a minimum price for your vehicle?
              </FormLabel>
              <RadioGroup
                defaultValue={"no"}
                pl={2}
                onChange={(value) =>
                  value === "no" ? setIsReserved(false) : setIsReserved(true)
                }
              >
                <Stack direction="column">
                  <Radio {...register("isReserved")} value="no">
                    No
                  </Radio>
                  <Radio {...register("isReserved")} value="yes">
                    Yes
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {isReserved && (
              <FormControl isInvalid={!!errors.reservePrice}>
                <FormLabel>What reserve price would you like?</FormLabel>
                <InputGroup>
                  <InputLeftElement pl={2} fontWeight="bold">
                    PKR
                  </InputLeftElement>
                  <Input
                    {...register("reservePrice", { valueAsNumber: true })}
                    type="number"
                    pl={12}
                    placeholder="Enter your minimum price"
                  />
                </InputGroup>
                {errors.reservePrice && (
                  <FormErrorMessage>
                    {errors.reservePrice.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardHeader>
            <Stack direction="row" spacing={2} alignItems="center">
              <Circle stroke="#3182ce" size={20} fill="#3182ce" />
              <Heading size="md">Photos</Heading>
            </Stack>
          </CardHeader>
          <CardBody as={Stack} spacing={2} pt={0}>
            <Alert
              borderRadius={10}
              status={images.length >= 6 ? "success" : "info"}
              w="100%"
            >
              <AlertIcon />
              <AlertDescription>
                {images.length >= 6
                  ? "You have met the minimum images requirement."
                  : "Please add " +
                    (6 - images.length) +
                    " more images to submit the application"}
              </AlertDescription>
            </Alert>
            <Dropzone
              onDrop={(acceptedFiles) => handleImages(acceptedFiles)}
              accept={{
                "image/jpeg": [],
                "image/png": [],
              }}
              maxSize={26214400} // 25MB
            >
              {({ getRootProps, getInputProps }) => (
                <Flex
                  w={"100%"}
                  bg={"gray.50"}
                  h="180px"
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius={10}
                  justifyContent="center"
                  alignItems={"center"}
                  display="flex"
                  flexDirection="column"
                  cursor={"pointer"}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <UploadCloud stroke="#3182ce" />
                  <Text>Click to select photos or drop them here.</Text>
                  <Text color="gray" fontSize="sm">
                    Max 25MB per image
                  </Text>
                </Flex>
              )}
            </Dropzone>
            <HStack spacing={2} flexWrap="wrap" justifyContent="flex-start">
              {images &&
                images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    borderRadius={5}
                    mt={2}
                    h="auto"
                    w="100px"
                    onClick={() => handleImageDelete(index)}
                  />
                ))}
            </HStack>
          </CardBody>
        </Card>
        <HStack justifyContent="flex-end">
          .
          <Button variant="solid" onClick={() => setStep(0)}>
            Back
          </Button>
          <Button
            type="submit"
            variant="solid"
            colorScheme="blue"
            isDisabled={images.length < 6 || addAuction.isPending}
            isLoading={addAuction.isPending}
            loadingText="Submitting"
          >
            Submit For Review
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};

export default SellingAuctionInfo;
