// LoginCallback.tsx
import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { kakaoLogin } from "./kakaologin";
import { useAuth } from "../utils/AuthContext";

const LoginCallback: React.FC<{ onRequireRegister?: () => void }> = ({ onRequireRegister }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const loginCalledRef = useRef(false);

  useEffect(() => {
    if (loginCalledRef.current) return;
    loginCalledRef.current = true;

    const code = searchParams.get("code");
    //console.log("🔹 카카오 로그인 콜백 code:", code);

    if (!code) {
      toast.error("로그인 코드가 없습니다.");
      navigate("/");
      return;
    }

    const nickname = sessionStorage.getItem("nickname") || undefined;
    const phone = sessionStorage.getItem("phone") || undefined;

    const body = { code, nickname, phone };
    //console.log("kakaoLogin 호출, 전송 body:", body);

    kakaoLogin(body)
      .then((data) => {
        //console.log("kakaoLogin then 데이터:", data);
        setAuth(data.accessToken, data.nickname);

        sessionStorage.setItem("accessToken", data.accessToken);
        if (data.nickname) sessionStorage.setItem("nickname", data.nickname);
        if (phone) sessionStorage.setItem("phone", phone);

        sessionStorage.removeItem("phone"); // 선택적 삭제
        toast.success("로그인 성공!");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const code = err.response?.data?.code;
        const message = err.response?.data?.message || "로그인에 실패했습니다.";
        //console.error("Login POST 에러:", code, message);

        if (code === 40001) {
          toast.error("이미 사용 중인 닉네임입니다.");
          onRequireRegister?.();
        } else if (code === 100 && message.includes("닉네임")) {
          toast.error("닉네임은 필수 입력값입니다.");
          onRequireRegister?.();
        } else if (code === 100 && message.includes("전화번호")) {
          toast.error("전화번호는 필수 입력값입니다.");
          onRequireRegister?.();
        } else {
          toast.error(message);
        }

        navigate("/"); // 필요하면 제거 가능 (회원가입 모달 열 때는 보통 그대로 있는 게 나음)
      });
  }, [searchParams, navigate, setAuth, onRequireRegister]);

  return <div className="flex justify-center items-center h-screen">로그인 처리 중...</div>;
};

export default LoginCallback;
