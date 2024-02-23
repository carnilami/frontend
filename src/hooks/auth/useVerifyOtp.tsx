import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import { AxiosError } from "axios";

const apiClient = new APIClient<string, VerifyOtpParams>("/auth/verifyOtp");

interface VerifyOtpParams {
  phone: string;
  otp: number;
}

const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, VerifyOtpParams>({
    mutationFn: (params: VerifyOtpParams) => apiClient.post(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export default useVerifyOtp;
