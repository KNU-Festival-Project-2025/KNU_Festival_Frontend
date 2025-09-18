import api from "../utils/api";

export interface KakaoLoginBody {
  code: string;
  nickname?: string;
  phone?: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
  nickname?: string;
}

export const kakaoLogin = async (body: KakaoLoginBody): Promise<KakaoLoginResponse> => {
  try {
    const res = await api.post("/api/auth/login", body);

    const accessToken =
      res.headers["accesstoken"] ||
      res.headers["authorization"] ||
      res.data?.data?.accessToken;

    const nickname = res.data?.data?.nickname;

    if (res.data.code === 0 && accessToken) {
      return { accessToken, nickname };
    }

    throw new Error(res.data.message || "로그인 실패");
  } catch (err: any) {
    console.error("kakaoLogin 에러:", err.response?.data || err.message);
    throw err;
  }
};
