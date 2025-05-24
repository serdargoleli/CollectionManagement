import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const instance = axios.create({
    baseURL: baseURL,
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json", // Content-Type başlığını burada ekleyin
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};
