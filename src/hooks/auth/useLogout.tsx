import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import APIClient from "../../services/apiClient";
import { useSellingPageStore } from "../../stores";
import { validateAuthCookies } from "../../utils/helpers";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const setStep = useSellingPageStore((state) => state.setStep);

  const headers = validateAuthCookies();

  return useMutation({
    mutationFn: () => {
      const apiClient = new APIClient("/auth/logout");
      return apiClient.delete({
        headers: {
          ...headers,
        },
      });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      if (window.location.pathname !== "/") {
        navigate("/");
      }
      toast({
        title: "Logged out",
        description: "You have been logged out",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setStep(0);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while logging out",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useLogout;
