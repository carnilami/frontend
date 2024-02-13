import {
  Box,
  HStack,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props {
  values: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function RadioCard(props: PropsWithChildren | PropsWithChildren) {
  const { getInputProps, getRadioProps } = useRadio(props as UseRadioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: "blue.500",
          color: "white",
          borderColor: "teal.600",
        }}
        px={4}
        py={"7px"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const CustomRadio = ({ values, defaultValue, onChange }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: defaultValue,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} wrap={"wrap"}>
      {values.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default CustomRadio;
