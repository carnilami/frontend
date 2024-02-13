import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/NavBar";

const Layout = () => {
  return (
    <Flex direction="column" mx={{ base: "12px", lg: "4%", xl: "15%" }}>
      <NavBar />
      <Outlet />
    </Flex>
  );
};

export default Layout;
