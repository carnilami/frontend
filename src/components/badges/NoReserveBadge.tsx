import { Badge } from "@chakra-ui/react";

interface Props {
  size?: "xs" | "sm" | "md" | "lg";
}

const NoReserveBadge = ({ size = "md" }: Props) => {
  return (
    <Badge
      colorScheme="blue"
      fontSize={size}
      variant="subtle"
      children="No Reserve"
    />
  );
};

export default NoReserveBadge;
