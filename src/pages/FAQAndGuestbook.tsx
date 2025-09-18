import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";
import FAQItem from "../components/FAQItem";
import api from "../utils/api";

// FAQ 데이터
const FAQ_DATA = [
  {
    q: "HORTUS는 어떤 의미인가요?",
    a: "HORTUS는 라틴어로 '정원'을 의미하며, 슬로건 '고요를 채울, 환희로 피어날'은 학우 여러분이 함께 어우러져 축제를 완성한다는 의미를 담고 있습니다."
  },
  {
    q: "베스트 포토 이벤트 참여 방법은 무엇인가요?",
    a: "축제 기간 촬영한 사진을 공식 웹사이트에 업로드 후, 선정된 사진은 축제 스케치 사진 상영회에서 방영됩니다."
  },
  {
    q: "공연 당일 우천 시에도 공연이 진행되나요?",
    a: "대부분 공연은 예정대로 진행되지만, 안전을 위해 일부 프로그램은 변경 또는 취소될 수 있습니다. 현장 안내를 확인해주세요."
  },
  {
    q: "대동제 주점은 몇 시까지 운영되나요?",
    a: "60주년 기념관 및 미래광장 주점 모두 18:00~24:00 운영되며, 주류 판매는 23:30까지입니다."
  },
  {
    q: "주문은 미리 예약하고 들어가야 하나요?",
    a: "일부 부스는 사전 예약이 필요할 수 있습니다. 참여 전 부스별 안내를 확인해주세요."
  },
  {
    q: "주점은 미리 예약해야 하나요? 예약 안 되어 있으면 어디로 연락하나요?",
    a: "주점은 일반적으로 예약 없이 이용 가능합니다. 예약 관련 문의는 집행위원회 공식 연락처를 통해 안내받으실 수 있습니다."
  },
  {
    q: "부스 참여 혜택이 있나요?",
    a: "체험 부스 참여 후 판매 부스 상품권을 받을 수 있으며, 현수막 키워드 찾기, 베스트 포토, 부스플래닛 등 다양한 참여 이벤트가 준비되어 있습니다."
  },
  {
    q: "푸드트럭은 어디서 운영되나요?",
    a: "푸드트럭은 60주년 기념관과 미래광장에 운영될 예정이며, 메뉴와 가격은 현장 안내를 확인해주세요."
  },
  {
    q: "재학생 무대에 참여하고 싶다면 어떻게 하나요?",
    a: "KNU Artist 프로그램(가요제, 밴드제, 댄스제)에 참여하려면 중앙동아리 소속이거나 집행위원회에 문의해야 합니다."
  },
  {
    q: "사진 촬영과 SNS 공유가 가능한가요?",
    a: "네, 가능하며 베스트 포토 이벤트 참여 시 공식 웹사이트에 사진 업로드 후 선정될 수 있습니다."
  },
  {
    q: "전야제는 누구나 참여할 수 있나요?",
    a: "재학생뿐 아니라 방문객 누구나 참여 가능합니다."
  },
  {
    q: "부스 상품권 이벤트 참여 방법은 무엇인가요?",
    a: "체험 부스 참여 후 상품권을 수령하며, 판매 부스에서 현금처럼 사용 가능합니다. 선착순 200명 대상입니다."
  },

];

interface GuestbookItem {
  guestbookId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

const FAQAndGuestbook: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"faq" | "guestbook">("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 서버에서 가져온 방명록
  const [guestbooks, setGuestbooks] = useState<GuestbookItem[]>([]);

  // URL에 따라 탭 설정
  useEffect(() => {
    if (location.pathname === "/guestbook") {
      setActiveTab("guestbook");
    } else if (location.pathname === "/faq") {
      setActiveTab("faq");
    }
  }, [location.pathname]);

  // 서버에서 방명록 목록 가져오기
  // 서버에서 방명록 목록 가져오기
  useEffect(() => {
    if (activeTab !== "guestbook") return;

    const fetchGuestbooks = async () => {
      try {
        const res = await api.get("/api/guestbooks"); // accessToken 자동 첨부
        if (res.data.code === 0) {
          setGuestbooks(res.data.data);
        } else {
          alert(res.data.message || "방명록 불러오기 실패");
        }
      } catch (err: any) {
        console.error("방명록 조회 오류:", err);
        // 401 처리 등은 api.ts에서 자동
        alert("방명록 불러오기 실패 또는 로그인 필요");
        navigate("/login");
      }
    };

    fetchGuestbooks();
  }, [activeTab, navigate]);
  const handleTabChange = (tab: "faq" | "guestbook") => {
    setActiveTab(tab);
  };

  const handleWriteGuestbook = () => {
    navigate("/guestbook/write");
  };

  return (
    <div className="w-full min-h-screen">
      <main className="relative w-full min-h-screen">
        <div className="h-[40px] w-full pointer-events-none" aria-hidden />

        {/* TabNav */}
        <div className="flex justify-center mt-6 mb-[9px]">
          <div className="w-[353px] h-[50px] rounded-[40px] bg-white/80 flex items-center justify-center px-4">
            <TabNav value={activeTab} onChange={handleTabChange} />
          </div>
        </div>

        {/* 방명록 작성하기 버튼 */}
        {activeTab === "guestbook" && (
          <div className="flex flex-col items-center mb-6">
            <button
              onClick={handleWriteGuestbook}
              className="w-[353px] h-[65px] rounded-[40px] border border-[#285100] 
                 bg-[rgba(255,255,255,0.8)] text-[#285100] font-pretendard font-bold 
                 hover:bg-[#285100] hover:text-white transition-colors duration-200"
            >
              방명록 작성하기
            </button>

            <div
              className="mt-[19px]"
              style={{
                width: "339.5px",
                height: "0px",
                borderTop: "0.8px solid rgba(255, 255, 255, 0.88)",
                flexShrink: 0,
              }}
            />
          </div>
        )}

        {/* 콘텐츠 영역 */}
        <section className="px-4 mt-6 pb-6">
          {activeTab === "faq" ? (
            <div className="space-y-4">
              {FAQ_DATA.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.q}
                  answer={item.a}
                  isOpen={openIndex === index}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}

              {/* 안내 문구를 FAQ 탭 맨 아래에만 출력 */}
              <p className="mt-6 text-center font-pretendard text-white text-[14px] font-bold leading-[22px]">
                자세한 내용은 @knuch_2025 로 문의 부탁드립니다
              </p>


            </div>
          ) : (
            <div className="space-y-4">
              {guestbooks.map((comment) => (
                <div
                  key={comment.guestbookId}
                  className="w-full max-w-[353px] mx-auto rounded-[20px] bg-white/80 px-4 py-3 shadow-md"
                >
                  {/* 작성자 정보 */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-[14px] bg-[#C7FBC2] overflow-hidden">
                      <img
                        src="/user-image.webp"
                        alt="avatar"
                        className="w-[50px] h-[50px] object-contain"
                      />
                    </div>

                    <div className="flex-1 flex justify-between items-center">
                      <span className="font-pretendard font-bold text-gray-800 text-sm">
                        {comment.nickname}
                      </span>
                      <span className="font-pretendard text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString("ko-KR", {
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* 내용 */}
                  <p className="font-pretendard text-[#000000] text-sm leading-relaxed mb-2">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FAQAndGuestbook;
