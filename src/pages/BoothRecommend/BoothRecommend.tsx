import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Choice {
  id: string;
  label: string;
}

const BoothRecommend: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const stepChoices: Record<number, Choice[]> = {
    1: [
      { id: "a1", label: "🍽 먹거리" },
      { id: "a2", label: "🎨 체험거리" },
    ],
    2: [
      { id: "b1", label: "👭 친구랑 같이" },
      { id: "b2", label: "🧘 혼자 힐링" },
    ],
    3: [
      { id: "c1", label: "⚡ 가볍게" },
      { id: "c2", label: "🕒 오래" },
    ],
    4: [
      { id: "d1", label: "🎉 신나는" },
      { id: "d2", label: "🌿 감성적인" },
      { id: "d3", label: "🧐 진지한" },
    ],
  };

  // 단계별 안내 문구
  const stepTexts: Record<number, string[]> = {
    1: ["오늘 축제에서 무엇을", "더 즐기고 싶으신가요?"],
    2: ["누구와 함께 오셨나요?"],
    3: ["활동은 어떤 느낌으로", "즐기고 싶으신가요?"],
    4: ["선호하는 분위기를 골라주세요!"],
  };

  const handleSelect = (choiceId: string) => {
    const newAnswers = [...answers, choiceId];
    setAnswers(newAnswers);

    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      navigate("/BoothRecommendResult", { state: { answers: newAnswers } });
    }
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center">
      <div className="pt-[70px] max-w-md mx-auto">
        {/* 단계 제목 */}
        <p className="mt-[50px] ml-[44px] text-[#508719] font-hssantokki text-[27.535px] font-normal leading-[30.288px] mb-2">
          0{step}
        </p>

        {/* 안내 문구 */}
        <p className="mt-[5px] ml-[44px] text-[#3B3B3B] font-hssantokki text-[28.636px] font-normal leading-[31.5px]">
          {stepTexts[step].map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        {/* 선택지 버튼 */}
        <div className="mt-[76px] flex flex-col items-center gap-4">
          {stepChoices[step].map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              className="flex justify-center items-center w-[353px] h-[65px] text-[#285100] rounded-[40px] border border-[#285100] bg-[rgba(255,255,255,0.80)] py-2 px-3 font-medium hover:bg-green-200 transition"

            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoothRecommend;
