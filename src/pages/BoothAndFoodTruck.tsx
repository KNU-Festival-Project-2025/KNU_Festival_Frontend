import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BoothCard from "../components/Booth/BoothCard";
import BoothModal from "../components/Booth/BoothModal";

import stadiumBooths from "../data/booths-stadium.json";
import haminseopBooths from "../data/booths-haminseop.json";
import booths60th from "../data/booths-60th.json";
import futureBooths from "../data/booths-future.json";

export type Booth = {
  id: number;
  location: "대운동장" | "함인섭광장" | "60주년" | "미래광장";
  zone?: "A" | "B" | "C" | "D" | "truck" | "coffee" | "pub" | "program";
  boothNumber?: number | number[];
  category: "all" | "food" | "promo" | "pub";
  title: string;
  desc: string;
  notice: string;
  image?: string;
  prices?: { name: string; price: string }[];
};

const BoothAndFoodTruck: React.FC = () => {
  const { number } = useParams<{ number?: string }>();
  const [activeLocation, setActiveLocation] = useState(number || "대운동장");
  const [activeTab, setActiveTab] = useState<"all" | "food" | "promo">("all");
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [page, setPage] = useState(1);

  // 스와이프
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const locations = ["대운동장", "함인섭광장", "60주년", "미래광장"];

  const locationImages: Record<string, string> = {
    대운동장: "/assets/maps/map-stadium.webp",
    함인섭광장: "/assets/maps/map-haminseop.webp",
    "60주년": "/assets/maps/map-60th.webp",
    미래광장: "/assets/maps/map-future.webp",
  };

  const boothData: Record<string, Booth[]> = {
    대운동장: stadiumBooths as Booth[],
    함인섭광장: haminseopBooths as Booth[],
    "60주년": booths60th as Booth[],
    미래광장: futureBooths as Booth[],
  };

  const currentBooths = boothData[activeLocation] || [];
  const filteredBooths = currentBooths.filter((booth) => {
    if (activeTab === "all") return true; // 전체 → 모두 포함
    if (activeTab === "food") {
      // 먹거리 탭 → food + pub 둘 다 포함
      return booth.category === "food" || booth.category === "pub";
    }
    return booth.category === activeTab; // 나머지 탭은 기존 그대로
  });

  // 페이지네이션
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredBooths.length / itemsPerPage);
  const paginatedBooths = filteredBooths.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 지도 넘기기
  const prevLocation = () => {
    const idx = locations.indexOf(activeLocation);
    setActiveLocation(
      locations[(idx - 1 + locations.length) % locations.length]
    );
    setPage(1);
  };
  const nextLocation = () => {
    const idx = locations.indexOf(activeLocation);
    setActiveLocation(locations[(idx + 1) % locations.length]);
    setPage(1);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto pt-4">
        {/* 두 번째 탭 네비게이션 */}
        <div className="flex justify-center mt-[11px]">
          <div className="w-[353px] h-[50px] rounded-[40px] bg-[#FFFFFFCC] flex items-center justify-center px-[12px] py-[8px] gap-[28px]">
            <button
              onClick={() => {
                setActiveTab("all");
                setPage(1);
              }}
              className={`font-pretendard text-[17px] font-[700] leading-[22px]
                ${activeTab === "all"
                  ? "text-[#285100]"
                  : "text-[rgba(125,149,100,0.63)]"
                }`}
            >
              전체
            </button>
            <div className="w-px h-[20.5px] bg-[#285100]/40" />
            <button
              onClick={() => {
                setActiveTab("food");
                setPage(1);
              }}
              className={`font-pretendard text-[17px] font-[700] leading-[22px]
                ${activeTab === "food"
                  ? "text-[#285100]"
                  : "text-[rgba(125,149,100,0.63)]"
                }`}
            >
              먹거리
            </button>
            <div className="w-px h-[20.5px] bg-[#285100]/40" />
            <button
              onClick={() => {
                setActiveTab("promo");
                setPage(1);
              }}
              className={`font-pretendard text-[17px] font-[700] leading-[22px]
                ${activeTab === "promo"
                  ? "text-[#285100]"
                  : "text-[rgba(125,149,100,0.63)]"
                }`}
            >
              체험 및 홍보
            </button>
          </div>
        </div>

        {/* 지도 캐러셀 */}
        <div
          className="flex justify-center mt-4 relative w-[353px] mx-auto"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const diffX = e.changedTouches[0].clientX - touchStartX;

            if (diffX > 50) {
              prevLocation(); // 오른쪽 → 왼쪽 스와이프
            } else if (diffX < -50) {
              nextLocation(); // 왼쪽 → 오른쪽 스와이프
            }

            setTouchStartX(null);
          }}
        >
          <div className="relative w-[353px] h-[200px] flex justify-center items-center rounded-[10px] bg-[rgba(255,255,255,0.8)] shadow-md px-[10px] pt-[12px] pr-[9px] pb-[11px]">
            {/* 좌우 버튼 */}
            <button
              onClick={prevLocation}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <img
                src="/assets/booth/icons/arrow-left.svg"
                alt="prev"
                width={26}
                height={26}
              />
            </button>

            <img
              src={locationImages[activeLocation]}
              alt={`${activeLocation} 지도`}
              className="w-full h-full object-cover rounded-[6px]"
            />

            <button
              onClick={nextLocation}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <img
                src="/assets/booth/icons/arrow-right.svg"
                alt="next"
                width={26}
                height={26}
              />
            </button>

            {/* 장소 태그 */}
            <div className="absolute bottom-4 right-4 h-[26px] px-3 rounded-[10px] bg-[rgba(255,255,255,0.8)] flex items-center justify-center">
              <span className="text-[#285100] text-[12px] font-pretendard font-bold leading-[22px]">
                {activeLocation}
              </span>
            </div>
          </div>
        </div>

        {/* 상단 버튼 영역 */}
        <div className="flex justify-center gap-[4px] flex-wrap mt-4">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setActiveLocation(loc);
                setPage(1);
              }}
              className={`w-[85px] h-[38px] rounded-full text-[15px] font-pretendard font-bold leading-[22px] flex justify-center items-center
                ${activeLocation === loc
                  ? "bg-white text-[#285100]"
                  : "bg-[#FFFFFFCC] text-[#A3B693]"
                }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* 부스 카드 리스트 및 페이지네이션을 스크롤 영역으로 분리 */}
      <div className="max-h-[calc(100vh-420px)] overflow-y-auto px-4 mt-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[353px] flex flex-col gap-4">
            {paginatedBooths.length > 0 ? (
              paginatedBooths.map((booth) => (
                <div
                  key={booth.id}
                  className="w-full cursor-pointer"
                  onClick={() => setSelectedBooth(booth)}
                >
                  <BoothCard booth={booth} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                해당 장소/탭에 등록된 부스가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 페이지네비게이션 */}
        <div className="flex justify-center items-center gap-[22px] mt-[25px] pb-8">
          {/* 이전 버튼 */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="disabled:opacity-40"
          >
            <img
              src="/assets/booth/icons/page-arrow.svg"
              alt="prev"
              className="w-8 h-8 transform rotate-180"
            />
          </button>

          {/* 페이지 점 + 숫자 */}
          <div className="flex items-center gap-6">
            {[...Array(totalPages)].map((_, i) => {
              const isActive = page === i + 1;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center cursor-pointer w-[10px] gap-[6px] flex-shrink-0"
                  onClick={() => setPage(i + 1)}
                >
                  <img
                    src={`/assets/booth/icons/${isActive ? "dot-active.svg" : "dot-inactive.svg"
                      }`}
                    alt={isActive ? "active" : "inactive"}
                    className="w-[10px] h-[10px]"
                  />
                  <span className="text-[14px] font-pretendard text-white">
                    {i + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 다음 버튼 */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="disabled:opacity-40"
          >
            <img
              src="/assets/booth/icons/page-arrow.svg"
              alt="next"
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>

      {/* 모달 */}
      {selectedBooth && (
        <BoothModal
          booth={selectedBooth}
          onClose={() => setSelectedBooth(null)}
        />
      )}
    </div>
  );
};

export default BoothAndFoodTruck;
