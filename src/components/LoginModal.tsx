import React, { useState, useEffect, useRef } from "react";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
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

  const handleKakaoLogin = () => {
    if (nickname) sessionStorage.setItem("nickname", nickname);
  if (phone) sessionStorage.setItem("phone", phone);



    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("phone", phone);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.assign(kakaoAuthUrl);
  };

  return (
    <div 
      className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-200 ease-out ${
        isAnimatingOut ? "bg-[#4C4C4C00]" : "bg-[#4C4C4C47]"
      }`} 
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`relative w-[279px] h-[434px] rounded-[15px] border border-gray-300 bg-[#D6DBBA] shadow-lg flex flex-col transform transition-all duration-200 ease-out ${
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
          animation: shouldRender && !isAnimatingOut 
            ? 'modalSlideIn 0.3s ease-out forwards' 
            : isAnimatingOut 
            ? 'modalSlideOut 0.2s ease-in forwards'
            : 'none'
        }}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-lg font-bold text-[rgba(68,98,64,0.60)] hover:text-[#446240] transition-colors duration-200 ease-out hover:scale-110 active:scale-95"
        >
          ✕
        </button>
        <h2 className="absolute top-6 left-1/2 -translate-x-1/2 font-pretendard font-semibold text-[20px] leading-[32px] text-black">
          로그인하기
        </h2>

        <label className="text-[17px] font-pretendard font-bold leading-[22px] mb-2 text-[#285100]">닉네임</label>
        <input
          type="text"
          maxLength={5}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="flex h-[48px] w-full px-5 py-4 rounded-[20px] border border-gray-300 bg-[rgba(255,255,255,0.54)] text-[15px] font-normal text-[#285100] focus:outline-none focus:ring-2 focus:ring-[#A7C957] mb-4"
          placeholder="5글자 내로 입력"
        />

        <label className="text-[17px] font-pretendard font-bold leading-[22px] mb-2 text-[#285100]">전화번호</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex h-[48px] w-full px-5 py-4 rounded-[20px] border border-gray-300 bg-[rgba(255,255,255,0.54)] text-[15px] font-normal text-[#285100] focus:outline-none focus:ring-2 focus:ring-[#A7C957] mb-6"
        />

        <div className="text-center text-black text-sm mb-4">
          처음 로그인시에만 <br />
          닉네임과 전화번호 기입
        </div>
        <button
          onClick={handleKakaoLogin}
          className="flex w-[209px] h-[48px] justify-center items-center rounded-[20px] bg-[#F6E550] font-pretendard font-bold text-[15px] text-black shadow transition-all duration-200 ease-out hover:scale-105 hover:bg-[#F4E23A] active:scale-95"
        >
          카카오계정 로그인
        </button>
        
      </div>
    </div>
  );
};

export default LoginModal;
