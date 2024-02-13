import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
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
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "chakra-react-select";
import { AnimatePresence, motion } from "framer-motion";
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

interface ImageProps {
  id: string;
  url: string;
}

const MAX_IMAGES = 25;
const MAX_IMAGE_SIZE = 26214400; // 25MB

const SellingAuctionInfo = () => {
  const [isReserved, setIsReserved] = useState(false);
  const [images, setImages] = useState<ImageProps[]>([]);

  const setStep = useSellingPageStore((state) => state.setStep);
  const setData = useSellingPageStore((state) => state.setData);
  const postData = useSellingPageStore((state) => state.data);

  const addAuction = useAddAuction();

  const dropzoneColor = useColorModeValue("gray.50", "gray.700");
  const dropzoneBorderColor = useColorModeValue("gray.300", "gray.500");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuctionInfoFD>({
    resolver: zodResolver(AuctionInfoFormSchema),
  });

  const onSubmit = (data: AuctionInfoFormData) => {
    const imageUrls = images.map((image) => image.url);

    setData({ ...data, images: imageUrls });
    const submissionData = { ...postData, ...data, images: imageUrls };
    addAuction.mutate(submissionData, {
      onSuccess: () => {
        setStep(2);
      },
    });
  };

  const handleImages = (acceptedFiles: File[]) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.push(
        ...acceptedFiles
          .reverse()
          .slice(0, MAX_IMAGES - prev.length)
          .map((file) => ({
            id: Math.random().toString(36).substring(2, 15),
            url: URL.createObjectURL(file),
          }))
      );

      if (newImages.length > MAX_IMAGES) {
        newImages.splice(0, newImages.length - MAX_IMAGES);
      }
      return newImages;
    });
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
              <Text fontSize={{base: "sm", md: "md"}}>
                The reserve price is confidential, representing the minimum
                amount your vehicle must reach to be sold. Vehicles with reserve
                prices may attract less attention compared to those without
                reserves.
              </Text>
              <Text fontSize={{base: "sm", md: "md"}}>
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
          <CardBody as={Stack} spacing={5} pt={0}>
            <Alert
              borderRadius={10}
              status={images.length >= 6 ? "success" : "error"}
              w="100%"
              fontSize={{base: "sm", md: "md"}}
            >
              <AlertIcon />
              <AlertDescription>
                {images.length >= 6
                  ? "You have met the minimum images requirement."
                  : "Please add " +
                    (6 - images.length) +
                    " more images to submit the application."}
              </AlertDescription>
            </Alert>
            <Dropzone
              onDrop={(acceptedFiles) => handleImages(acceptedFiles)}
              accept={{
                "image/jpeg": [],
                "image/png": [],
              }}
              maxSize={MAX_IMAGE_SIZE}
              disabled={images.length >= MAX_IMAGES}
            >
              {({ getRootProps, getInputProps }) => (
                <Flex
                  w={"100%"}
                  bg={dropzoneColor}
                  h="180px"
                  border="2px dashed"
                  borderColor={dropzoneBorderColor}
                  borderRadius={10}
                  justifyContent="center"
                  alignItems={"center"}
                  display="flex"
                  flexDirection="column"
                  cursor={
                    images.length >= MAX_IMAGES ? "not-allowed" : "pointer"
                  }
                  {...getRootProps()}
                  position={"relative"}
                >
                  <input {...getInputProps()} />
                  {images.length >= MAX_IMAGES ? (
                    <CheckCircleIcon color="green" />
                  ) : (
                    <UploadCloud stroke="#3182ce" />
                  )}
                  {images.length >= MAX_IMAGES ? (
                    <Text mt={1} color="green" fontSize={{base: "xs", md: "sm"}}>
                      Maximum Images Uploaded
                    </Text>
                  ) : (
                    <Text mt={1} color="gray" fontSize={{base: "xs", md: "sm"}}>
                      Drag and drop or click to upload images
                    </Text>
                  )}
                  {images.length < MAX_IMAGES && (
                    <Badge mt={1} colorScheme="blue" borderRadius={4} fontSize={{base: "xs", md: "sm"}}>
                      {images.length + " / " + MAX_IMAGES} Images
                    </Badge>
                  )}
                </Flex>
              )}
            </Dropzone>
            <HStack spacing={2} flexWrap="wrap" justifyContent="flex-start">
              <AnimatePresence>
                {images &&
                  images.map((image, index) => (
                    <Box
                      key={image.id}
                      as={motion.div}
                      position="relative"
                      width="100px"
                      marginY={2}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                      }}
                      // @ts-expect-error no problem in operation, although type error appears.
                      transition={{
                        layout: { ease: "easeInOut", duration: 0.3 },
                      }}
                      layoutId={image.id}
                    >
                      <Image
                        src={image.url}
                        borderRadius={5}
                        h="auto"
                        w="100%"
                      />
                      <IconButton
                        aria-label="Delete Image"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        position="absolute"
                        top={0}
                        right={0}
                        onClick={() => handleImageDelete(index)}
                        borderTopLeftRadius={0}
                        borderBottomRightRadius={0}
                      />
                    </Box>
                  ))}
              </AnimatePresence>
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
