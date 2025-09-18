// utils/api.ts
import axios from "axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 🔹 요청 interceptor: 로그인 요청 제외, 로그아웃 포함
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  // 로그인 요청에는 Authorization 헤더 제외
  if (token && !config.url?.includes("/api/auth/login")) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// 🔹 응답 interceptor: 401 처리 (재발급)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // 로그인 요청 제외, 재시도 안 한 경우
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        // 쿠키 기반 refreshToken으로 accessToken 재발급
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/reissue`,
          {},
          { withCredentials: true }
        );

        const newToken = response.data.data.accessToken;
        if (newToken) {
          setAccessToken(newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }

        removeAccessToken();
        alert("로그인이 필요한 서비스입니다.");
        return Promise.reject(err);
      } catch {
        removeAccessToken();
        alert("로그인이 필요한 서비스입니다.");
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
