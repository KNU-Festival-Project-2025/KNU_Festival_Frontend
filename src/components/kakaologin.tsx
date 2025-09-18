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
  console.log("kakaoLogin 호출, 전송 body:", body);

  try {
    const res = await api.post("/api/auth/login", body);

    console.log("서버 응답 status:", res.status);
    console.log("서버 응답 headers:", res.headers);
    console.log("서버 응답 data:", res.data);

    const accessToken =
      res.headers["accesstoken"] ||
      res.headers["authorization"] ||
      res.data?.data?.accessToken;

    const nickname = res.data?.data?.nickname;

    if (res.data.code === 0 && accessToken) {
      console.log("로그인 성공, accessToken:", accessToken, "nickname:", nickname);
      return { accessToken, nickname };
    }

    console.warn("로그인 실패 조건 충족, message:", res.data.message);
    throw new Error(res.data.message || "로그인 실패");
  } catch (err: any) {
    console.error("kakaoLogin 에러:", err.response?.data || err.message);
    throw err;
  }
};
