import axios from "axios";

export const axiosInstance = (TOKEN: string | undefined) => {
  // const TOKEN = useSession()?.data?.accessToken;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const instance = axios.create({
    baseURL: baseURL,
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json", // Content-Type başlığını burada ekleyin
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  instance.interceptors.request.use((config) => {
    return config;
  });

  return instance;
};
