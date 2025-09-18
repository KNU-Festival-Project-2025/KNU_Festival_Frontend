import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { setAccessToken } from "../utils/auth";

const GuestbookWrite: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    try {
      const response = await api.post("/api/guestbooks/register", { content });

      // 서버에서 새 accessToken 발급 시 LocalStorage 갱신
      const newAccessToken = response.headers["accesstoken"];
      if (newAccessToken) setAccessToken(newAccessToken);

      if (response.status === 201 && response.data?.code === 0) {
        alert(response.data.message || "방명록이 등록되었습니다.");
        navigate("/guestbook");
      } else {
        alert(response.data?.message || "방명록 등록 실패");
      }
    } catch (err: any) {
      console.error("방명록 등록 오류:", err);
      alert("방명록 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <main className="pt-[74px] px-4 max-w-[430px] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-[#285100] font-pretendard font-bold">
              내용
            </label>
            <textarea
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={100}
              className="w-[353px] h-[124px] px-[20px] py-[16px] rounded-[20px]
                bg-[rgba(255,255,255,0.54)] font-pretendard text-sm resize-none
                placeholder:text-[#555555]
                focus:outline-none focus:ring-2 focus:ring-[#285100]"
              style={{ color: "#000", caretColor: "#000" }}
            />
          </div>

          <div
            style={{
              width: "339.5px",
              height: "0px",
              borderTop: "0.8px solid rgba(255, 255, 255, 0.88)",
              flexShrink: 0,
            }}
          />

          <button
            type="submit"
            disabled={!content.trim()}
            className={`w-[353px] h-[65px] rounded-[40px] font-pretendard font-bold 
              transition-colors duration-200 bg-[rgba(255,255,255,0.8)]
              ${!content.trim()
                ? "text-gray-400 border border-gray-400 cursor-not-allowed"
                : "text-[#285100] border border-[#285100] hover:bg-[#285100] hover:text-white"
              }`}
          >
            방명록 등록
          </button>
        </form>
      </main>
    </div>
  );
};

export default GuestbookWrite;
