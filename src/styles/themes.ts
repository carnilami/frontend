import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { ButtonStyles } from "./components/ButtonStyle";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Button: ButtonStyles,
  },
});

export default theme;
