import api from "./axiosInstance";

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginRequest {
  code: string;
  nickname?: string;
  phone?: string;
}

//로그인
export const login = async (
  code: string,
  nickname?: string,
  phone?: string
) => {
  const body: LoginRequest = { code };

  if (nickname) body.nickname = nickname;
  if (phone) body.phone = phone;

  const res = await api.post<LoginResponse>("/auth/login", body);
  return res.data;
};


// 로그아웃
export const logout = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // 토큰 제거
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return res.data;
};

// 토큰 재발급
export const reissueToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await api.post(
    "/auth/reissue",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-Token": refreshToken ?? "",
      },
    }
  );

  // 새 토큰 저장
  localStorage.setItem("accessToken", res.data.data.accessToken);
  localStorage.setItem("refreshToken", res.data.data.refreshToken);

  return res.data;
};