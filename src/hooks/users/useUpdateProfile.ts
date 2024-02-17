import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserProfile } from "../../entities/User";
import APIClient from "../../services/apiClient";
import { validateAuthCookies } from "../../utils/helpers";

const apiClient = new APIClient<UserProfile>("/users/me/profile");

const useUpdateProfile = () => {
  const headers = validateAuthCookies();
  const queryClient = useQueryClient();

  return useMutation<UserProfile, AxiosError, UserProfile>({
    mutationFn: (data: UserProfile) => {
      return apiClient.put(data, {
        headers: {
          ...headers,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // clearing cache so the new data is refetched
    },
  });
};

export default useUpdateProfile;
