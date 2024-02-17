import {
  Box,
  Heading,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { useEffect } from "react";
import SellingAuctionInfo from "../../components/selling/SellingAuctionInfo";
import SellingSuccess from "../../components/selling/SellingSuccess";
import VehicleInfo from "../../components/selling/SellingVehicleInfo";
import { useSellingPageStore } from "../../stores";

const steps = [
  { title: "First", description: "Vehicle Info" },
  { title: "Second", description: "Auction Info" },
];

const SellCarPage = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const step = useSellingPageStore((state) => state.step);
  useEffect(() => {
    setActiveStep(step);
  }, [setActiveStep, step]);

  const renderComponentByStep = () => {
    if (activeStep === 0) {
      return <VehicleInfo />;
    }
    if (activeStep === 1) {
      return <SellingAuctionInfo />;
    }
    if (activeStep === 2) {
      return <SellingSuccess />;
    }
  };

  return (
    <Stack w="100%" justifyItems="center" alignItems="center">
      <Stack w={{ md: "50rem" }} spacing={6} my={6} mx={5}>
        <Heading size="xl">Tell us about your vehicle</Heading>
        <Text fontSize="md">
          Please share some fundamental details about yourself and the car
          you're interested in selling. Additionally, kindly provide information
          regarding the title status of the car, along with at least six photos
          showcasing both its exterior and interior conditions.
        </Text>
        <Text fontSize="md">
          We aim to review your application and provide a response within one
          business day. Upon acceptance, we will request additional information
          and a minimum of 50 high-resolution photos. Subsequently, we will
          collaborate with you to create a personalized and professional
          listing, initiating the auction process.
        </Text>
        <Stepper
          colorScheme={activeStep === 2 ? "green" : "blue"}
          size={{ base: "sm", sm: "md", md: "lg" }}
          index={activeStep}
        >
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        {renderComponentByStep()}
      </Stack>
    </Stack>
  );
};

export default SellCarPage;
