import axios from "axios";
import { reissueToken } from "./auth";

const api = axios.create({
  baseURL: "http://34.47.70.96:8080/api",
});


// 요청 시 accessToken 자동 포함
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 에러 시 토큰 만료 처리 → 재발급 요청
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await reissueToken(); // 토큰 재발급
        return api(originalRequest); // 원래 요청 재시도
      } catch (err) {
        console.error("❌ 토큰 재발급 실패:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
