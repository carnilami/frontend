import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UserNotifications from "../../entities/User";
import APIClient from "../../services/apiClient";
import { validateAuthCookies } from "../../utils/helpers";

const apiClient = new APIClient<UserNotifications>("/users/me/notifications");

const useUpdateNotifications = () => {
  const headers = validateAuthCookies();
  const queryClient = useQueryClient();

  return useMutation<UserNotifications, AxiosError, UserNotifications>({
    mutationFn: (data: UserNotifications) => {
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

export default useUpdateNotifications;
