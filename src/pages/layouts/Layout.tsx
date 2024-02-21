import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/nav/Footer";
import NavBar from "../../components/nav/NavBar";

const Layout = () => {
  return (
    <Flex direction="column" mx="auto" px="40px" maxW={{ base: "auto", xl: "1350px" }} minH="100vh">
      <NavBar />
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default Layout;
