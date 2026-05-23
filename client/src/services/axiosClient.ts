import axios from "axios";
import { mockApi } from "./mockApi";
import type { AxiosRequestConfig } from "axios";

const mockAdapter = async (config: AxiosRequestConfig) => {
  const { url = "", method = "get", data, params, headers } = config;
  try {
    const headersValue = headers as any;
    const response = await mockApi.handleRequest({
      url: url.toString(),
      method: method.toString().toLowerCase(),
      data,
      params,
      headers: headersValue,
    });

    return {
      data: response,
      status: 200,
      statusText: "OK",
      headers: {},
      config,
      request: {},
    };
  } catch (error: any) {
    return Promise.reject({
      ...error,
      config,
      request: {},
      response: {
        status: error.status || 400,
        data: { message: error.message || "Mock API error" },
      },
    });
  }
};

export const apiClient = axios.create({
  baseURL: "/api",
  adapter: mockAdapter as any,
});

apiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("showtime-auth-token");
  if (!config.headers) {
    config.headers = {} as any;
  }
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 280);
  });
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
