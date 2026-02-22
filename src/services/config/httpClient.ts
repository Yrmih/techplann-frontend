import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor para Auto-Login.
 * Garante que o token retornado no finalizeAccount seja enviado em todas as chamadas.
 */
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("@TechPlann:token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
