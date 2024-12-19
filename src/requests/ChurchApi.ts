import axios, { AxiosHeaders, AxiosInstance } from "axios";

const ChurchApi: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}api`,
  withCredentials: true,
});

ChurchApi.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  config.headers.set("Content-Type", "application/json");

  return config;
});

ChurchApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // here we should log out the user.
    }
    return Promise.reject(error);
  }
);

export default ChurchApi;
