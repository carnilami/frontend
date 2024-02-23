import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../../services/apiClient";

interface InitiateLoginParams {
  phone: string;
}

const apiClient = new APIClient<string, InitiateLoginParams>(
  "/auth/initiateLogin"
);

const useInitiateLogin = () => {
  return useMutation<string, AxiosError, InitiateLoginParams>({
    mutationFn: (params: InitiateLoginParams) => apiClient.post(params),
  });
};

export default useInitiateLogin;
