import { Badge } from "@chakra-ui/react";

interface Props {
  size?: "xs" | "sm" | "md" | "lg";
}

const NoReserveBadge = ({ size }: Props) => {
  return (
    <Badge
      colorScheme="blue"
      fontSize={size ? size : { base: "sm" }}
      variant="subtle"
      children="No Reserve"
    />
  );
};

export default NoReserveBadge;
