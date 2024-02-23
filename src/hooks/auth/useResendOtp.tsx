import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../../services/apiClient";

interface ResendOtpParams {
  phone: string;
}

const apiClient = new APIClient<string, ResendOtpParams>(
  "/auth/refreshOtp"
);

const useResendOtp = () => {
  return useMutation<string, AxiosError, ResendOtpParams>({
    mutationFn: (params: ResendOtpParams) => apiClient.post(params),
  });
};

export default useResendOtp;
