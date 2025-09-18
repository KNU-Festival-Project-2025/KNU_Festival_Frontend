// LoginCallback.tsx
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
    console.log("🔹 카카오 로그인 콜백 code:", code);

    if (!code) {
      toast.error("로그인 코드가 없습니다.");
      navigate("/");
      return;
    }

    const nickname = sessionStorage.getItem("nickname") || undefined;
    const phone = sessionStorage.getItem("phone") || undefined;
    console.log("sessionStorage nickname, phone:", nickname, phone);

    const body = { code, nickname, phone };
    console.log("kakaoLogin 호출, 전송 body:", body);

    kakaoLogin(body)
      .then((data) => {
        console.log("kakaoLogin then 데이터:", data);
        setAuth(data.accessToken, data.nickname);
        sessionStorage.setItem("accessToken", data.accessToken);
        console.log("Saved Token:", sessionStorage.getItem("accessToken"));
        sessionStorage.removeItem("phone");
        toast.success("로그인 성공!");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Login POST 에러:", err);
        toast.error("로그인에 실패했습니다.");
        navigate("/");
      });
  }, [searchParams, navigate, setAuth]);

  return <div className="flex justify-center items-center h-screen">로그인 처리 중...</div>;
};

export default LoginCallback;
