import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User from "../../entities/User";
import APIClient from "../../services/apiClient";
import { validateAuthCookies } from "../../utils/helpers";

const apiClient = new APIClient<User>("/users/me");

const useUser = () => {
  const headers = validateAuthCookies();

  return useQuery<User, AxiosError>({
    queryKey: ["user"],
    queryFn: () => {
      return apiClient.get({
        headers: {
          ...headers,
        },
      });
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    retry: 0,
    enabled: !!headers,
  });
};

export default useUser;
