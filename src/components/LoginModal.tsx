import React, { useState, useEffect, useRef } from "react";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  forceRegister?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, forceRegister }) => {
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShouldRender(false);
      setIsAnimatingOut(false);
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  // 회원가입
  const handleKakaoRegister = () => {
  // 닉네임 체크
  if (!nickname.trim()) {
    alert("닉네임을 입력해주세요.");
    return;
  }

  // 전화번호 체크
  const phonePattern = /^010\d{8}$/; // 010xxxxxxxx
  if (!phone.trim()) {
    alert("전화번호를 입력해주세요.");
    return;
  } else if (!phonePattern.test(phone)) {
    alert("전화번호 형식이 올바르지 않습니다. 예: 01012345678");
    return;
  }

  // 저장
  sessionStorage.setItem("nickname", nickname);
  sessionStorage.setItem("phone", phone);

  // 카카오 인증 URL 이동
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.assign(kakaoAuthUrl);
};


  // 로그인
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.assign(kakaoAuthUrl);
  };

  // 단순 로그인 모달
  const loginModal2 = () => (
    <div className="fixed inset-0 bg-[#4C4C4C47] z-40 flex items-center justify-center" onClick={handleClose}>
      <div
        className="relative w-[279px] h-[200px] rounded-[15px] border border-gray-300 bg-[#D6DBBA] shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingTop: "90px", paddingLeft: "35px", paddingRight: "35px", paddingBottom: "25px" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-lg font-bold text-[rgba(68,98,64,0.60)] hover:text-[#446240]"
        >
          ✕
        </button>
        <h2 className="absolute top-6 left-1/2 -translate-x-1/2 font-pretendard font-semibold text-[20px] leading-[32px] text-black">
          로그인하기
        </h2>

        <button
          onClick={handleKakaoLogin}
          className="flex w-[209px] h-[48px] justify-center items-center rounded-[20px] bg-[#F6E550] font-pretendard font-bold text-[15px] text-black shadow"
        >
          카카오계정 로그인
        </button>
      </div>
    </div>
  );

  // 회원가입 모달
  const registerModal = (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-200 ease-out ${
        isAnimatingOut ? "bg-[#4C4C4C00]" : "bg-[#4C4C4C47]"
      }`}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`relative w-[279px] h-[434px] rounded-[15px] border border-gray-300 bg-[#eef2da] flex flex-col transform transition-all duration-200 ease-out ${
          isAnimatingOut
            ? "opacity-0 scale-95 translate-y-2 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingTop: "90px",
          paddingLeft: "35px",
          paddingRight: "35px",
          paddingBottom: "25px",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-lg font-bold text-[rgba(208, 247, 203, 0.6)] hover:text-[#446240]"
        >
          ✕
        </button>
        <h2 className="absolute top-6 left-1/2 -translate-x-1/2 font-pretendard font-semibold text-[20px] leading-[32px] text-black">
          회원가입
        </h2>

        <div className="mt-[-20px] text-gray-400 text-sm text-center">회원가입이 필요합니다. </div>

        <label className="text-[17px] font-bold mb-2 text-[#285100]">닉네임</label>
        <input
          type="text"
          maxLength={5}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="placeholder-gray-400 text-[black] flex bg-white h-[48px] w-full px-5 py-4 rounded-[20px] border border-gray-300 mb-4"
          placeholder="5글자 내로 입력"
        />

        <label className="text-[17px] font-bold mb-2 text-[#285100]">전화번호</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="placeholder-gray-400 text-[black] bg-white flex h-[48px] w-full px-5 py-4 rounded-[20px] border border-gray-300 mb-6"
          placeholder="010xxxxxxxx"
        />

        <button
          onClick={handleKakaoRegister}
          className="flex w-[209px] h-[48px] justify-center items-center rounded-[20px] bg-[#F6E550] font-bold text-[15px] text-black shadow"
        >
          카카오계정으로 회원가입
        </button>
      </div>
    </div>
  );

  return forceRegister ? registerModal : loginModal2();
};

export default LoginModal;
