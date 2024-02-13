import { Image, useColorMode } from "@chakra-ui/react";
import darkLogo from "../../assets/logo_transparent_dark.png";
import lightLogo from "../../assets/logo_transparent_light.png";

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Image
      src={colorMode === "dark" ? darkLogo : lightLogo}
      height="auto"
      w="150px"
    />
  );
};

export default Logo;
