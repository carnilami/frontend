import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const ButtonStyles: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: "#0171DE",
      color: "white",
      _hover: {
        bg: mode("#0065c7", "#1a7fe1")(props),
        _disabled: {
          bg: "#0171DE",
        }
      },
      _disabled: {
        _hover: {
          bg: mode("#0065c7", "#1a7fe1")(props),
        },
      },
    }),
    primaryOutline: (props) => ({
      bg: "transparent",
      color: mode("#3B82F6", "#3B82F6")(props),
      border: "1px solid",
      borderColor: mode("#3B82F6", "#3B82F6")(props),
      _hover: {
        bg: mode("#3B82F6", "#3B82F6")(props),
        color: mode("white", "black")(props),
      },
    }),
  },
  defaultProps: {},
};
