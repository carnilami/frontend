import axios, { AxiosRequestConfig } from "axios";

const apiUrl = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (config: AxiosRequestConfig = {}) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };

  post = (data: T, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };
}

export default APIClient;
