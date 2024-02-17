import { Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../../components/nav/Loading";
import NavBar from "../../components/nav/NavBar";
import useUser from "../../hooks/users/useUser";
import { useLoginModalStore } from "../../stores";

const PrivateLayout = () => {
  const { data, isLoading, error } = useUser();
  const navigate = useNavigate();
  const openLoginModal = useLoginModalStore((state) => state.open);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) {
      queryClient.removeQueries({ queryKey: ["user"] });
      openLoginModal();
      navigate("/");
    }
  }, [error, navigate, openLoginModal, queryClient]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    openLoginModal();
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Flex direction="column" mx={{ base: "24px", lg: "6%", xl: "15%" }}>
      <NavBar />
      <Outlet />
    </Flex>
  );
};

export default PrivateLayout;
