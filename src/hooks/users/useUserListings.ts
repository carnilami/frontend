import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Auction } from "../../entities/Auction";
import APIClient from "../../services/apiClient";
import { validateAuthCookies } from "../../utils/helpers";

const apiClient = new APIClient<Auction[]>("/users/me/listings");

const useUserListings = () => {
  const headers = validateAuthCookies();

  return useQuery<Auction[], AxiosError>({
    queryKey: ["userListings"],
    queryFn: () => {
      return apiClient.get({
        headers: {
          ...headers,
        },
      });
    },
    gcTime: 1000 * 300, // 5 minutes
    staleTime: 1000 * 120, // 2 minutes
    retry: 1,
  });
};

export default useUserListings;
