// LoginCallback.tsx (안전 버전)
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { kakaoLogin } from "./kakaologin";
import { useAuth } from "../utils/AuthContext";

const LoginCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      toast.error("로그인 코드가 없습니다.");
      navigate("/");
      return;
    }

    // 중복 호출 방지
    if (sessionStorage.getItem("kakaoLoginCalled")) {
      console.warn("⚠️ kakaoLogin 이미 호출됨, skip");
      return;
    }
    sessionStorage.setItem("kakaoLoginCalled", "true");

    const nickname = sessionStorage.getItem("nickname") || undefined;
    const phone = sessionStorage.getItem("phone") || undefined;
    console.log("sessionStorage nickname, phone:", nickname, phone);

    const body = { code, nickname, phone };
    console.log("kakaoLogin 호출, 전송 body:", body);

    kakaoLogin(body)
      .then((data) => {
        if (!data.accessToken) {
          toast.error("AccessToken이 없습니다. 다시 로그인해주세요.");
          sessionStorage.removeItem("kakaoLoginCalled");
          navigate("/login");
          return;
        }

        setAuth(data.accessToken, data.nickname);
        sessionStorage.setItem("accessToken", data.accessToken);
        console.log("✅ Saved Token:", sessionStorage.getItem("accessToken"));

        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("kakaoLoginCalled");
        toast.success("로그인 성공!");
        navigate("/", { replace: true });
      })
      .catch((err: any) => {
        console.error("Login POST 에러:", err);

        // 카카오 code 만료 또는 유효하지 않은 토큰
        if (err.response?.status === 401 || err.message.includes("유효하지 않은 토큰")) {
          toast.error("카카오 로그인 코드가 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.removeItem("kakaoLoginCalled");
          navigate("/login"); // 로그인 페이지 재시도
          return;
        }

        toast.error("로그인에 실패했습니다.");
        sessionStorage.removeItem("kakaoLoginCalled");
        navigate("/");
      });
  }, [searchParams, navigate, setAuth]);

  return <div className="flex justify-center items-center h-screen">로그인 처리 중...</div>;
};

export default LoginCallback;
