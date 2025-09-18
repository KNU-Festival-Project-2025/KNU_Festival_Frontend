// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 🔹 요청 interceptor 제거 (헤더 자동 추가 안 함)
// api.interceptors.request.use((config) => {
//   const token = getAccessToken();
//   if (token && !config.url?.includes("/api/auth/login")) {
//     config.headers!["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

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
          // setAccessToken(newToken); // 헤더 자동 추가 없으므로 직접 사용 필요
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }

        alert("로그인이 필요한 서비스입니다.");
        return Promise.reject(err);
      } catch {
        alert("로그인이 필요한 서비스입니다.");
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
