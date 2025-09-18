import axios from "axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 요청 시 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers!["Authorization"] = `Bearer ${token}`;
  return config;
});

// 응답 에러 처리 (401)
// 응답 에러 처리 (401)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // 로그인 관련 요청이 아니고, 아직 재시도 안 한 경우
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
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
          // 새 토큰 저장 후 원래 요청 재전송
          setAccessToken(newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }

        // 재발급 실패 시 팝업
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
