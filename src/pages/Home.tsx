import React, { useRef, useState, useEffect } from "react";
import { HomeCard2 } from "../components/home/HomeCard2";
import { HomeCard3 } from "../components/home/HomeCard3";
import { RefButton } from "../components/home/RefButton";
import { useNavigate } from "react-router-dom";

// 타임테이블 데이터 (Timetable.tsx와 동일)
// 날짜 기반 스케줄 데이터
const scheduleData = [
  {
    date: "2025-09-22",
    events: [
      { time: "13:00 ~ 17:00", title: "무대 및 부스 설치" },
      { time: "17:00 ~", title: "무대 및 부스 설치 (계속)" },
      { time: "18:00 ~ 20:30", title: "전야제" },
    ],
  },
  {
    date: "2025-09-23",
    events: [
      { time: "13:00 ~ 17:00", title: "리허설" },
      { time: "17:00 ~", title: "재학생존 입장" },
      { time: "18:00 ~ 18:30", title: "개막식" },
      { time: "18:30 ~ 20:30", title: "재학생 무대 공연(KNU Artist)" },
      { time: "21:00 ~ 21:30", title: "초청 인사 소개 및 말씀" },
      { time: "21:30 ~ 22:00", title: "초청 아티스트 공연" },
    ],
  },
  {
    date: "2025-09-24",
    events: [
      { time: "13:00 ~ 17:00", title: "리허설" },
      { time: "17:00 ~", title: "재학생존 입장" },
      { time: "18:00 ~ 18:30", title: "보이는 라디오" },
      { time: "18:30 ~ 20:30", title: "재학생 무대 공연(KNU Artist)" },
      { time: "21:00 ~ 21:30", title: "초청 아티스트 공연" },
    ],
  },
  {
    date: "2025-09-25",
    events: [
      { time: "13:00 ~ 17:00", title: "리허설" },
      { time: "17:00 ~", title: "재학생존 입장" },
      { time: "18:00 ~ 19:30", title: "재학생 무대 공연(KNU Artist)" },
      { time: "19:30 ~ 20:30", title: "총장님 프로그램" },
      { time: "20:30 ~ 21:00", title: "폐막식" },
      { time: "21:00 ~ 21:30", title: "초청 아티스트 공연" },
      { time: "22:00 ~ 23:00", title: "축제 스케치 사진 상영회" },
    ],
  },
];

const CurrentEventDisplay: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<{ time: string; title: string } | null>(null);

  // 오늘 날짜에 맞는 이벤트 가져오기
  const getTodaySchedule = () => {
    const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return scheduleData.find((day) => day.date === todayStr)?.events || [];
  };

  const getCurrentEvent = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const events = getTodaySchedule();

    const timeToMinutes = (timeStr: string) => {
      const [time] = timeStr.split(' ~');
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    for (const event of events) {
      if (event.time.includes('~')) {
        if (event.time.endsWith('~')) {
          const start = timeToMinutes(event.time);
          const end = 24 * 60; // 하루 끝까지
          if (currentMinutes >= start && currentMinutes <= end) return event;
        } else {
          const [startStr, endStr] = event.time.split(' ~ ');
          const start = timeToMinutes(startStr);
          const end = timeToMinutes(endStr);
          if (currentMinutes >= start && currentMinutes <= end) return event;
        }
      }
    }

    return null;
  };

  
  useEffect(() => {
    const updateEvent = () => {
      const event = getCurrentEvent();
      setCurrentEvent(event);
    };

    updateEvent();

    const timer = setInterval(updateEvent, 60000); // 1분마다 업데이트
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex absolute top-[71px] left-1/2 transform -translate-x-1/2 w-[330px] h-[46px] flex-shrink-0 rounded-[20px] border border-[#F6FAEB] 
                        bg-gradient-to-r from-white/0 to-white shadow-[ -2px_3px_5px_0_rgba(105,132,77,0.33) ]"
    >
      <img
        src="assets/home/Clock.svg"
        className="mt-[11px] ml-[11px] w-[24px] h-[24px] p-[2.667px] items-center"
        alt=""
      />
      <p className="mt-[9.5px] ml-[12px] text-[#39646C] font-[Hahmlet] text-[18px] font-normal leading-normal">
        {currentEvent ? currentEvent.time : "쉬는시간"}
      </p>
      <p className="mt-[9.5px] ml-auto mr-[20px] text-[#39646C] font-[Hahmlet] text-[18px] font-normal leading-normal">
        {currentEvent ? currentEvent.title : "다시 돌아올게요~!"}
      </p>
    </div>
  );
};

const Home: React.FC = () => {
  const getTodayString = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-based
  const date = now.getDate();
  // "MM.DD" 형식으로 반환
  return `${month.toString().padStart(2, "0")}.${date
    .toString()
    .padStart(2, "0")}`;
};
  //네비게이터
  const navigate = useNavigate();

  // 애니메이션 상태
  const [isVisible, setIsVisible] = useState({
    logo: false,
    cards: false,
    button: false,
  });

  // 스크롤 상태
  const [showScrollTop, setShowScrollTop] = useState(false);

  // scroll 영역 ref
  const scroll1Ref = useRef<HTMLDivElement>(null);
  const scroll2Ref = useRef<HTMLDivElement>(null);
  const scroll3Ref = useRef<HTMLDivElement>(null);
  const scroll4Ref = useRef<HTMLDivElement>(null);

  // 스크롤 이동 함수
  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 최상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지 로드 시 순차적 애니메이션
  useEffect(() => {
    const timer1 = setTimeout(
      () => setIsVisible((prev) => ({ ...prev, logo: true })),
      300
    );
    const timer2 = setTimeout(
      () => setIsVisible((prev) => ({ ...prev, cards: true })),
      600
    );
    const timer3 = setTimeout(
      () => setIsVisible((prev) => ({ ...prev, button: true })),
      900
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 500); // 500px 이상 스크롤하면 버튼 표시
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="w-full max-w-[430px] bg-contain bg-center bg-no-repeat overflow-x-hidden -mt-16"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "top center",
        minHeight: "calc(300vh + 64px)",
      }}
    >
      <div
        ref={scroll1Ref}
        className="w-full min-h-[932px] flex flex-col items-center overflow-x-hidden bg-[url('/assets/home/BGimg/BackImg1.webp')] bg-cover bg-center "
      >
        <div
          className={`text-center mt-[95px] transition-all duration-1000 ${
            isVisible.logo
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src="/assets/main_logo.webp"
            alt="메인 로고"
            className="
              w-full                /* 부모 너비에 맞게 */
              max-w-[310px]      /*  최대 크기 제한 */
              aspect-[237.48/78.21] /* 비율 유지 */
              flex-shrink-0
              mx-auto              
            "
            style={{
              animation: isVisible.logo ? "fadeInScale 0.8s ease-out" : "none",
            }}
          />

          <p className="mt-[-18px] text-[#5C6C00] font-[Hahmlet] text-[15px] font-normal leading-normal">
            고요를 채울, 환희로 피어날
          </p>

          <p className="text-[#0F1D00] font-[Hahmlet] text-[18px] font-normal leading-normal">
            2025.09.21 - 09.24
          </p>
        </div>

        {/*scroll 1 시작*/}

        {/* 1번째 HomeCard */}
        <div
          className={`mt-[30px] w-full h-full px-4 transition-all duration-1000 ${
            isVisible.cards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="relative w-full h-auto"
            onClick={() => navigate("/timetable")}
          >
            <img
              src="/assets/home/LayerFrame1/1LayerFrame1.webp"
              alt=""
              className="w-full h-auto"
            />
            {/* 이미지 위 글씨 */}
            <p className="absolute top-[14px] left-[37px] text-white text-2xl font-bold text-white font-[Pretendard] text-[11.89px] font-extralight leading-normal flex-shrink-0">
              TIME TABLE
            </p>

            <p className="absolute top-[14px] right-[47px] text-white font-[Hahmlet] text-[10px] font-normal leading-normal">
              today
            </p>

            <p className="absolute top-[24px] left-[35px] w-[117px] h-[34px] flex-shrink-0 text-white font-[Hahmlet] text-[25px] font-normal leading-normal">
              타임테이블
            </p>

            <p className="absolute top-[27px] right-[32px] text-white font-[Hahmlet] text-[19.698px] font-semibold leading-normal">
              {getTodayString()}
            </p>

            <CurrentEventDisplay />
          </div>

          {/* 2번째 HomeCard */}
          <div className="mt-[4px] mx-auto grid grid-cols-2 gap-[9px]">
            <img
              src="/assets/home/LayerFrame1/1LayerFrame2.webp"
              alt=""
              className="w-full h-full"
              onClick={() => navigate("/booth-foodtruck/대운동장")}
            />
            <img
              src="/assets/home/LayerFrame1/1LayerFrame3.webp"
              alt=""
              className="w-full h-full"
              onClick={() => navigate("/photo-festival")}
            />
            <img
              src="/assets/home/LayerFrame1/1LayerFrame4.webp"
              alt=""
              className="w-full h-full"
              onClick={() => navigate("/boothRecommendLoading")}
            />
            <img
              src="/assets/home/LayerFrame1/1LayerFrame5.webp"
              alt=""
              className="w-full h-full"
              onClick={() => navigate("/faq")}
            />
          </div>
        </div>

        <div
          className={`mt-[76px] h-[103px] text-centertransition-all duration-300 ${
            isVisible.button
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <RefButton
            text="축제 라인업 보기"
            backgroundColor="rgba(244, 203, 0, 0.71)"
            onClick={() => scrollToRef(scroll2Ref)}
          />

          <div
            className="mt-[9px] w-[37px] h-[37px] flex items-center justify-center mx-auto"
            onClick={() => scrollToRef(scroll2Ref)}
          >
            <img
              src="/assets/home/ArrowUp-circle.svg"
              alt="Arrow Up"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>



      {/* scroll2 시작 */}
      
      <div
        ref={scroll2Ref}
        className="w-full min-h-[932px] pt-[101px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg2.webp')] bg-cover bg-center"
      >
        <div className="relative -top-8">
          <HomeCard3
          logoSrc="/assets/home/lineup/name1.webp"
          mainImgSrc="/assets/home/lineup/idol1.webp"
          dayText="DAY1"
          dateText="9.23"
          nameText="JEON SOMI"
          imagePosition="right"
          number="1"
        />
        </div>
        

        <HomeCard3
          logoSrc="/assets/home/lineup/name2.webp"
          mainImgSrc="/assets/home/lineup/idol2.webp"
          dayText="DAY2"
          dateText="9.24"
          nameText="KISS OF LIFE"
          imagePosition="left"
          number="2"
        />

        <div className="relative -top-6">
        <HomeCard3
          logoSrc="/assets/home/lineup/name3.webp"
          mainImgSrc="/assets/home/lineup/idol3.webp"
          dayText="DAY2"
          dateText="9.24"
          nameText="PARK HYEWON"
          imagePosition="right"
          number="3"
        />
        </div>
      </div>
      
      <div className="w-full min-h-[932px] pt-[50px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg3.webp')] bg-cover bg-center">
        
        <div className="relative -top-20">
        <HomeCard3
          logoSrc="/assets/home/lineup/name4.webp"
          mainImgSrc="/assets/home/lineup/idol4.webp"
          dayText="DAY2"
          dateText="9.24"
          nameText="ASH ISLAND"
          imagePosition="left"
          number="4"
        />
        </div>

        <HomeCard3
          logoSrc="/assets/home/lineup/name5.webp"
          mainImgSrc="/assets/home/lineup/idol5.webp"
          dayText="DAY3"
          dateText="9.25"
          nameText="KIIRAS"
          imagePosition="right"
          number="5"
        />

        <HomeCard3
          logoSrc="/assets/home/lineup/name6.webp"
          mainImgSrc="/assets/home/lineup/idol6.webp"
          dayText="DAY3"
          dateText="9.25"
          nameText="CAR THE GARDEN"
          imagePosition="left"
          number="6"
        />

        <div className="text-center relative z-3">
          <RefButton
            text="축제 지도 보기"
            backgroundColor="#A0C09A"
            onClick={() => scrollToRef(scroll3Ref)}
          />
        </div>

        <div
          className="mt-[9px] w-[37px] h-[37px] flex items-center justify-center mx-auto"
          onClick={() => scrollToRef(scroll3Ref)}
        >
          <img
            src="/assets/home/ArrowUp-circle.svg"
            alt="Arrow Up"
            className="w-full h-full"
          />
        </div>
      </div>
           

      {/* scroll3 시작 */}
      <div
        ref={scroll3Ref}
        className="w-full min-h-[932px] pt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg4.webp')] bg-cover bg-center"
      >
        <HomeCard2
          title="60주년 기념관"
          subtitle="주점, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2Layer60thAnniversaryHall.webp"
          imagePosition="right"
          textAlignment="left"
          marginBottom="0px"
          link="60주년"
        />

        <HomeCard2
          title="미래광장"
          subtitle="부스, 주점, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2LayerFutureSquare.webp"
          imagePosition="left"
          textAlignment="right"
          marginBottom="0px"
          link="미래광장"
        />
      </div>

      <div className="w-full min-h-[932px] pt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg5.webp')] bg-cover bg-center">
        <HomeCard2
          title="대운동장"
          subtitle="공연, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2LayerLargeGround.webp"
          imagePosition="right"
          textAlignment="left"
          marginBottom="0px"
          link="대운동장"
        />

        <HomeCard2
          title="함인섭 광장"
          subtitle="부스, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2LayerHaminSquare.webp"
          imagePosition="left"
          textAlignment="right"
          marginBottom="0px"
          link="함인섭광장"
        />

        <div className="text-center">
          <RefButton
            text="개발자 및 디자이너"
            backgroundColor="#E5BEEF"
            onClick={() => scrollToRef(scroll4Ref)}
          />
        </div>

        <div
          className="mt-[9px] w-[37px] h-[37px] flex items-center justify-center mx-auto"
          onClick={() => scrollToRef(scroll4Ref)}
        >
          <img
            src="/assets/home/ArrowUp-circle.svg"
            alt="Arrow Up"
            className="w-full h-full"
          />
        </div>
      </div>

      <div
        ref={scroll4Ref}
        className="w-full min-h-[932px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg6.webp')] flex justify-center items-center"
      >
        <div className="flex flex-col w-[343.699px] h-[364px]">
          <p className="text-[#009A7C] font-hssantokki text-[20px] font-normal leading-normal">
            디자이너
          </p>

          <p className="text-black font-school text-[16px] font-bold leading-[32px]">
            최혜선 <br />
            AI융합학과 23
          </p>

          <p className="mt-[39px] text-[#009A7C] font-hssantokki text-[20px] font-normal leading-normal">
            프론트엔드
          </p>

          <div className="flex gap-[13px]">
            <p className="text-black font-school text-[16px] font-bold leading-[32px]">
              김재연 <br />
              컴퓨터공학과 21
            </p>

            <p className="text-black font-school text-[16px] font-bold leading-[32px]">
              이원형 (팀장)
              <br />
              컴퓨터공학과 22
            </p>

            <p className="text-black font-school text-[16px] font-bold leading-[32px]">
              한철완 <br />
              컴퓨터공학과 21
            </p>
          </div>

          <p className="mt-[39px] text-[#009A7C] font-hssantokki text-[20px] font-normal leading-normal">
            백엔드
          </p>

          <div className="flex gap-[38px]">
            <p className="text-black font-school text-[16px] font-bold leading-[32px]">
              김소연 <br />
              컴퓨터공학과 21
            </p>

            <p className="text-black font-school text-[16px] font-bold leading-[32px]">
              유다인 <br />
              컴퓨터공학과 21
            </p>
          </div>
        </div>
      </div>

      {/* 최상단으로 이동 버튼 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
          style={{
            right: "calc(50% - 215px + 45px)", // 430px 컨테이너의 우측에서 45px 떨어진 위치
          }}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;
