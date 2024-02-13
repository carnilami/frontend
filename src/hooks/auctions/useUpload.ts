import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient("/upload");

const useUpload = () => {
  return useMutation({
    mutationFn: (files: FormData) => {
      return apiClient.post("/upload", {
        data: files,
      });
    },
  });
};

export default useUpload;
