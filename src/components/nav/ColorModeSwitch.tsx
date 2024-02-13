import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionMoonIcon = motion(MoonIcon);
const MotionSunIcon = motion(SunIcon);

const ColorSwitchToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <MotionMoonIcon
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, rotate: 360 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.6}}
        />
      ) : (
        <MotionSunIcon
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, rotate: 360 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.6}}
        />
      )}
    </Button>
  );
};

export default ColorSwitchToggle;
