import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { boothRecommendMap, boothList } from "./RecommendModel";
import type { RecommendModel } from "./RecommendModel";
import type { Booth } from "../../pages/BoothAndFoodTruck";
import BoothModal from "../../components/Booth/BoothModal";

// 변환 함수 (RecommendModel → Booth)
function toBooth(model: RecommendModel): Booth | null {
  const full = boothList.find((b) => b.id === model.id);
  if (!full) return null;

  return {
    id: Number(model.id.replace("b", "")),
    location: (model.location as Booth["location"]) ?? "대운동장",
    zone: (model.zone as Booth["zone"]) ?? "A",
    boothNumber: full.boothNumber ?? 1,
    category: (full.category as Booth["category"]) ?? "promo",
    title: model.name,
    desc: full.desc ?? "",
    notice: full.notice ?? "",
    image: model.image ?? "",
    prices: full.prices ?? [],
  };
}

const BoothRecommendResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { answers } = (location.state as { answers: string[] }) || { answers: [] };
  const key = answers.join("-");
  const recommendedBooths: RecommendModel[] = boothRecommendMap[key] || [];

  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

  if (recommendedBooths.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-center">
        <p className="text-xl font-bold text-gray-700">추천 부스를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const mainBooth = recommendedBooths[0];
  const subBooths = recommendedBooths.slice(1);

  const allTags = recommendedBooths.reduce((acc: string[], booth: RecommendModel) => {
    booth.tags.forEach((tag) => {
      if (!acc.includes(tag)) acc.push(tag);
    });
    return acc;
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="container max-w-md mx-auto px-4 py-8">
        <p className="mt-[25px] text-[#6EAFF0] text-center font-hssantokki text-[28.636px]">
          {answers[1] === "b1" ? "친구와 함께" : "혼자서 힐링하고 싶은"}
        </p>
        <p className="text-[#3B3B3B] text-center font-hssantokki text-[28.636px]">
          당신에게 맞는 부스는,,
        </p>

        {/* 태그 */}
        <div className="mt-[10px] flex justify-center items-center gap-[10px] text-[#003661] text-[10px]">
          {allTags.map((tag, index) => (
            <p
              key={index}
              className="w-[67px] px-[5px] py-[1px] rounded-[10px] bg-[rgba(218,238,249,0.73)]"
            >
              #{tag}
            </p>
          ))}
        </div>

        {/* 메인 부스 카드 */}
        <div
          className="mt-[16px] w-[150px] h-[150px] mx-auto cursor-pointer"
          onClick={() => {
            const booth = toBooth(mainBooth);
            if (booth) setSelectedBooth(booth);
          }}
        >
          <div className="h-[150px] rounded-[10px] border-[4px] border-[#BBCF90] bg-white shadow overflow-hidden">
            <img src={mainBooth.image} alt={mainBooth.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="mt-[10px] text-[#90B246] text-center text-[20px]">
          {mainBooth.name}
        </p>

        {/* 서브 부스 카드 */}
        <div className="mt-[30px] flex justify-center gap-10 flex-wrap">
          {subBooths.map((booth, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[150px] mt-4 cursor-pointer"
              onClick={() => {
                const full = toBooth(booth);
                if (full) setSelectedBooth(full);
              }}
            >
              <div className="h-[150px] w-full rounded-[10px] border-[4px] border-[#BBCF90] bg-white shadow overflow-hidden">
                <img src={booth.image} alt={booth.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-[10px] text-[#90B246] text-center text-[20px]">
                {booth.name}
              </p>
            </div>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="mt-[40px] flex flex-col items-center gap-4">
          {/* 다시하기 버튼 */}
          <button
            onClick={() => navigate("../boothRecommendLoading")}
            className="w-[180px] h-[45px] bg-[#90B246] rounded-[20px] text-white text-[18px] shadow"
          >
            다시하기
          </button>

          {/* 부스 전체 보러가기 버튼 */}
          <button
            onClick={() => navigate("/booth-foodtruck/대운동장")}
            className="w-[200px] h-[45px] bg-[#285100] rounded-[20px] text-white text-[18px] shadow flex items-center justify-center gap-2"
          >
            부스 전체 보러가기
            <span className="text-[20px]">→</span>
          </button>
        </div>
      </div>

      {/* 모달 */}
      {selectedBooth && (
        <BoothModal booth={selectedBooth} onClose={() => setSelectedBooth(null)} />
      )}
    </div>
  );
};

export default BoothRecommendResult;
