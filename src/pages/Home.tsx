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

  const handleArtistClick = (number: string) => {
    navigate(`/artist/${number}`);
  };

  // 애니메이션 상태
  const [isVisible, setIsVisible] = useState({
    logo: false,
    cards: false,
    button: false,
  });

  // 각 카드의 가시성 상태
  const [cardVisibility, setCardVisibility] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false,
  });

  // HomeCard2 요소들의 가시성 상태
  const [homeCard2Visibility, setHomeCard2Visibility] = useState({
    'homecard2-card60th': false,
    'homecard2-cardFuture': false,
    'homecard2-cardStadium': false,
    'homecard2-cardHamin': false,
  });

  // 개발자 정보 섹션의 가시성 상태
  const [developerVisibility, setDeveloperVisibility] = useState({
    designer: false,
    frontend: false,
    backend: false,
  });

  // 스크롤 상태
  const [showScrollTop, setShowScrollTop] = useState(false);

  // scroll 영역 ref
  const scroll1Ref = useRef<HTMLDivElement>(null);
  const scroll2Ref = useRef<HTMLDivElement>(null);
  const scroll3Ref = useRef<HTMLDivElement>(null);
  const scroll4Ref = useRef<HTMLDivElement>(null);

  // 각 카드 ref
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);

  // HomeCard2 refs
  const card60thRef = useRef<HTMLDivElement>(null);
  const cardFutureRef = useRef<HTMLDivElement>(null);
  const cardStadiumRef = useRef<HTMLDivElement>(null);
  const cardHaminRef = useRef<HTMLDivElement>(null);

  // 개발자 정보 refs
  const designerRef = useRef<HTMLDivElement>(null);

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

  // 카드 가시성 관찰을 위한 Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // 30% 보이면 트리거
      rootMargin: '0px 0px -50px 0px' // 아래쪽 50px 여유
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.getAttribute('data-card-id');
          if (cardId) {
            if (cardId.startsWith('card')) {
              setCardVisibility(prev => ({
                ...prev,
                [cardId]: true
              }));
            } else if (cardId.startsWith('homecard2')) {
              setHomeCard2Visibility(prev => ({
                ...prev,
                [cardId]: true
              }));
            } else if (cardId.startsWith('developer')) {
              // 개발자 정보 섹션이 보이면 순차적으로 애니메이션
              if (cardId === 'developer-section') {
                setTimeout(() => {
                  setDeveloperVisibility(prev => ({ ...prev, designer: true }));
                }, 200);
                
                setTimeout(() => {
                  setDeveloperVisibility(prev => ({ ...prev, frontend: true }));
                }, 700);
                
                setTimeout(() => {
                  setDeveloperVisibility(prev => ({ ...prev, backend: true }));
                }, 1200);
              }
            }
          }
        }
      });
    }, observerOptions);

    // 각 카드 관찰 시작
    const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref, card6Ref];
    cardRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.setAttribute('data-card-id', `card${index + 1}`);
        observer.observe(ref.current);
      }
    });

    // HomeCard2 관찰 시작
    const homeCard2Refs = [
      { ref: card60thRef, id: 'homecard2-card60th' },
      { ref: cardFutureRef, id: 'homecard2-cardFuture' },
      { ref: cardStadiumRef, id: 'homecard2-cardStadium' },
      { ref: cardHaminRef, id: 'homecard2-cardHamin' }
    ];
    
    homeCard2Refs.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-card-id', id);
        observer.observe(ref.current);
      }
    });

    // 개발자 정보 섹션 관찰 시작
    const developerRefs = [
      { ref: designerRef, id: 'developer-section' }
    ];
    
    developerRefs.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-card-id', id);
        observer.observe(ref.current);
      }
    });


    return () => {
      cardRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      homeCard2Refs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      developerRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
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
        className="w-full h-screen min-h-[600px] max-h-[932px] flex flex-col items-center overflow-hidden bg-[url('/assets/home/BGimg/BackImg1.webp')] bg-cover bg-center "
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
          className={`mt-[30px] w-full h-auto px-4 transition-all duration-1000 ${
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
          className={`h-[73px] mt-[60px] text-centertransition-all duration-300 ${
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
        className="w-full h-screen min-h-[600px] max-h-[932px] pt-[70px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg2.webp')] bg-cover bg-center relative overflow-hidden"
      >
        {/* 첫 번째 카드 - 하이브리드 위치 */}
        <div className="absolute top-[8vh] lg:top-[70px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
          <div 
            ref={card1Ref}
            className={`relative transition-all duration-1000 ${
              cardVisibility.card1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
          <HomeCard3
              mainImgSrc="/assets/home/lineup/1_jeonsomi.webp"
            />
            
            {/* 다음 버튼 - 첫 번째 카드에만 */}
            <div className="absolute bottom-6 left-16 z-10 cursor-pointer" onClick={() => handleArtistClick("1")}>
              <svg width="48" height="48" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" fill="white" fillOpacity="0.8"/>
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" stroke="#F8779C" strokeWidth="0.854839"/>
                <g filter="url(#filter0_i_987_3669)">
                  <path d="M27.8346 24.851C28.426 25.4424 28.426 26.4013 27.8346 26.9928L20.2456 34.5818C19.6541 35.1732 19.6541 36.1322 20.2456 36.7236L21.0653 37.5434C21.6568 38.1348 22.6157 38.1348 23.2071 37.5434L33.7577 26.9928C34.3492 26.4013 34.3492 25.4424 33.7577 24.851L23.2071 14.3004C22.6157 13.709 21.6568 13.709 21.0653 14.3004L20.2456 15.1202C19.6541 15.7116 19.6541 16.6705 20.2456 17.262L27.8346 24.851Z" fill="#F8779C"/>
                </g>
                <defs>
                  <filter id="filter0_i_987_3669" x="19.8018" y="13.8564" width="14.3994" height="27.5502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3.41935"/>
                    <feGaussianBlur stdDeviation="1.70968"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.326257 0 0 0 0 0.556971 0 0 0 0 0.73753 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_987_3669"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
        {/* 두 번째 카드 - 하이브리드 위치 */}
        <div className="absolute top-[40vh] lg:top-[370px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
          <div 
            ref={card2Ref}
            className={`relative transition-all duration-1000 ${
              cardVisibility.card2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
        <HomeCard3
              mainImgSrc="/assets/home/lineup/2_kissoflife.webp"
            />
            
            {/* 다음 버튼 - 두 번째 카드에만 */}
            <div className="absolute bottom-4 right-12 z-10 cursor-pointer" onClick={() => handleArtistClick("2")}>
              <svg width="48" height="48" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.719412" y="0.864919" width="52.1452" height="52.1452" rx="26.0726" fill="white" fillOpacity="0.8"/>
                <rect x="0.719412" y="0.864919" width="52.1452" height="52.1452" rx="26.0726" stroke="#340059" strokeWidth="0.854839"/>
                <g filter="url(#filter0_i_987_3661)">
                  <path d="M28.1266 25.2885C28.718 25.8799 28.718 26.8388 28.1266 27.4303L20.5376 35.0193C19.9461 35.6107 19.9461 36.5697 20.5376 37.1611L21.3573 37.9809C21.9488 38.5723 22.9077 38.5723 23.4991 37.9809L34.0497 27.4303C34.6411 26.8388 34.6411 25.8799 34.0497 25.2885L23.4991 14.7379C22.9077 14.1465 21.9488 14.1465 21.3573 14.7379L20.5376 15.5577C19.9461 16.1491 19.9461 17.108 20.5376 17.6995L28.1266 25.2885Z" fill="#340059"/>
                </g>
                <defs>
                  <filter id="filter0_i_987_3661" x="20.0938" y="14.2939" width="14.3994" height="27.5502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3.41935"/>
                    <feGaussianBlur stdDeviation="1.70968"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.326257 0 0 0 0 0.556971 0 0 0 0 0.73753 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_987_3661"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* 세 번째 카드 - 하이브리드 위치 */}
        <div className="absolute top-[65vh] lg:top-[600px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
          <div 
            ref={card3Ref}
            className={`relative transition-all duration-1000 ${
              cardVisibility.card3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
        <HomeCard3
              mainImgSrc="/assets/home/lineup/3_parkhyewon.webp"
            />
            
            {/* 다음 버튼 - 세 번째 카드에만 */}
            <div className="absolute bottom-10 left-12 z-10 cursor-pointer" onClick={() => handleArtistClick("3")}>
              <svg width="48" height="48" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" fill="white" fillOpacity="0.8"/>
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" stroke="#340059" strokeWidth="0.854839"/>
                <g filter="url(#filter0_i_987_3678)">
                  <path d="M27.8346 24.851C28.426 25.4424 28.426 26.4013 27.8346 26.9928L20.2456 34.5818C19.6541 35.1732 19.6541 36.1322 20.2456 36.7236L21.0653 37.5434C21.6568 38.1348 22.6157 38.1348 23.2071 37.5434L33.7577 26.9928C34.3492 26.4013 34.3492 25.4424 33.7577 24.851L23.2071 14.3004C22.6157 13.709 21.6568 13.709 21.0653 14.3004L20.2456 15.1202C19.6541 15.7116 19.6541 16.6705 20.2456 17.262L27.8346 24.851Z" fill="#340059"/>
                </g>
                <defs>
                  <filter id="filter0_i_987_3678" x="19.8018" y="13.8564" width="14.3994" height="27.5502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3.41935"/>
                    <feGaussianBlur stdDeviation="1.70968"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.326257 0 0 0 0 0.556971 0 0 0 0 0.73753 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_987_3678"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full h-screen min-h-[600px] max-h-[932px] pt-[15px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg3.webp')] bg-cover bg-center relative overflow-hidden">
        
        {/* 네 번째 카드 - 하이브리드 위치 */}
        <div className="absolute top-[1vh] lg:top-[10px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
          <div 
            ref={card4Ref}
            className={`relative transition-all duration-1000 ${
              cardVisibility.card4
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
        <HomeCard3
              mainImgSrc="/assets/home/lineup/4_ash.webp"
            />
            
            {/* 다음 버튼 - 네 번째 카드에만 */}
            <div className="absolute  bottom-[80px] right-10 z-10 cursor-pointer" onClick={() => handleArtistClick("4")}>
              <svg width="48" height="48" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" fill="white" fillOpacity="0.8"/>
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" stroke="#340059" strokeWidth="0.854839"/>
                <g filter="url(#filter0_i_987_3768)">
                  <path d="M27.8346 24.851C28.426 25.4424 28.426 26.4013 27.8346 26.9928L20.2456 34.5818C19.6541 35.1732 19.6541 36.1322 20.2456 36.7236L21.0653 37.5434C21.6568 38.1348 22.6157 38.1348 23.2071 37.5434L33.7577 26.9928C34.3492 26.4013 34.3492 25.4424 33.7577 24.851L23.2071 14.3004C22.6157 13.709 21.6568 13.709 21.0653 14.3004L20.2456 15.1202C19.6541 15.7116 19.6541 16.6705 20.2456 17.262L27.8346 24.851Z" fill="#340059"/>
                </g>
                <defs>
                  <filter id="filter0_i_987_3768" x="19.8018" y="13.8564" width="14.3994" height="27.5502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3.41935"/>
                    <feGaussianBlur stdDeviation="1.70968"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.326257 0 0 0 0 0.556971 0 0 0 0 0.73753 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_987_3768"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* 다섯 번째 카드 - 하이브리드 위치 */}
        <div className="absolute top-[31vh] lg:top-[290px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
          <div 
            ref={card5Ref}
            className={`relative transition-all duration-1000 ${
              cardVisibility.card5
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
        <HomeCard3
              mainImgSrc="/assets/home/lineup/5_kiiras.webp"
            />
            
            {/* 다음 버튼 - 다섯 번째 카드에만 */}
            <div className="absolute bottom-6 left-16 z-10 cursor-pointer" onClick={() => handleArtistClick("5")}>
              <svg width="48" height="48" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.36052" y="0.618826" width="52.1452" height="52.1452" rx="26.0726" fill="white" fillOpacity="0.8"/>
                <rect x="1.36052" y="0.618826" width="52.1452" height="52.1452" rx="26.0726" stroke="#F7A400" strokeWidth="0.854839"/>
                <g filter="url(#filter0_i_987_3733)">
                  <path d="M28.7677 25.0424C29.3592 25.6338 29.3592 26.5927 28.7677 27.1842L21.1787 34.7732C20.5872 35.3647 20.5872 36.3236 21.1787 36.915L21.9985 37.7348C22.5899 38.3262 23.5488 38.3262 24.1402 37.7348L34.6908 27.1842C35.2823 26.5927 35.2823 25.6338 34.6908 25.0424L24.1402 14.4918C23.5488 13.9004 22.5899 13.9004 21.9985 14.4918L21.1787 15.3116C20.5872 15.903 20.5872 16.8619 21.1787 17.4534L28.7677 25.0424Z" fill="#F7A400"/>
                </g>
                <defs>
                  <filter id="filter0_i_987_3733" x="20.7349" y="14.0479" width="14.3994" height="27.5502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3.41935"/>
                    <feGaussianBlur stdDeviation="1.70968"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.326257 0 0 0 0 0.556971 0 0 0 0 0.73753 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_987_3733"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* 여섯 번째 카드 - 하이브리드 위치 */}
        <div className="absolute top-[55vh] lg:top-[500px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
          <div 
            ref={card6Ref}
            className={`relative transition-all duration-1000 ${
              cardVisibility.card6
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
        <HomeCard3
              mainImgSrc="/assets/home/lineup/6_carthegarden.webp"
            />
            
            {/* 다음 버튼 - 여섯 번째 카드에만 */}
            <div className="absolute bottom-14 right-12 z-10 cursor-pointer" onClick={() => handleArtistClick("6")}>
              <svg width="48" height="48" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" fill="white" fillOpacity="0.8"/>
                <rect x="0.427419" y="0.427419" width="52.1452" height="52.1452" rx="26.0726" stroke="#F7A400" strokeWidth="0.854839"/>
                <g filter="url(#filter0_i_987_3735)">
                  <path d="M27.8346 24.851C28.426 25.4424 28.426 26.4013 27.8346 26.9928L20.2456 34.5818C19.6541 35.1732 19.6541 36.1322 20.2456 36.7236L21.0653 37.5434C21.6568 38.1348 22.6157 38.1348 23.2071 37.5434L33.7577 26.9928C34.3492 26.4013 34.3492 25.4424 33.7577 24.851L23.2071 14.3004C22.6157 13.709 21.6568 13.709 21.0653 14.3004L20.2456 15.1202C19.6541 15.7116 19.6541 16.6705 20.2456 17.262L27.8346 24.851Z" fill="#F7A400"/>
                </g>
                <defs>
                  <filter id="filter0_i_987_3735" x="19.8018" y="13.8564" width="14.3994" height="27.5502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3.41935"/>
                    <feGaussianBlur stdDeviation="1.70968"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.326257 0 0 0 0 0.556971 0 0 0 0 0.73753 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_987_3735"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="absolute top-[93vh] lg:top-[800px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-[430px]">
          <RefButton
            text="축제 지도 보기"
            backgroundColor="#A0C09A"
            onClick={() => scrollToRef(scroll3Ref)}
          />

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
      </div>
           

      {/* scroll3 시작 */}
      <div
        ref={scroll3Ref}
        className="w-full h-screen min-h-[600px] max-h-[932px] pt-[90px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg4.webp')] bg-cover bg-center overflow-hidden"
      >
        <div 
          ref={card60thRef}
          className={`transition-all duration-1000 ${
            homeCard2Visibility['homecard2-card60th']
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
      >
        <HomeCard2
            title={<svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.25 11.45C0.25 9.9 0.383333 8.50833 0.65 7.275C0.933333 6.025 1.51667 4.94167 2.4 4.025C3.28333 3.09167 4.56667 2.53333 6.25 2.35C6.65 2.31667 6.94167 2.3 7.125 2.3C7.925 2.3 8.69167 2.41667 9.425 2.65C10.1583 2.86667 10.975 3.2 11.875 3.65L10.475 6.1C9.74167 5.71667 9.13333 5.45 8.65 5.3C8.18333 5.13333 7.7 5.05 7.2 5.05C5.88333 5.05 4.93333 5.425 4.35 6.175C3.78333 6.90833 3.43333 7.96667 3.3 9.35C4.41667 8.78333 5.6 8.5 6.85 8.5C8.05 8.5 9.08333 8.76667 9.95 9.3C10.8333 9.81667 11.5 10.5417 11.95 11.475C12.4 12.3917 12.625 13.45 12.625 14.65C12.625 15.8167 12.3667 16.8917 11.85 17.875C11.3333 18.8417 10.6 19.6083 9.65 20.175C8.7 20.7417 7.61667 21.025 6.4 21.025C4.03333 21.025 2.425 20.2 1.575 18.55C0.741667 16.9 0.3 14.8917 0.25 12.525V11.45ZM3.275 12.975C3.325 14.675 3.56667 15.9833 4 16.9C4.45 17.8167 5.25 18.275 6.4 18.275C7.38333 18.275 8.16667 17.9333 8.75 17.25C9.33333 16.5667 9.625 15.7 9.625 14.65C9.625 12.3833 8.7 11.25 6.85 11.25C6.16667 11.25 5.53333 11.3833 4.95 11.65C4.38333 11.9167 3.825 12.3583 3.275 12.975ZM21.2932 18.275C23.4432 18.275 24.5182 16.075 24.5182 11.675V11.5L18.3932 14.9C18.8265 17.15 19.7932 18.275 21.2932 18.275ZM21.2932 21.025C19.2432 21.025 17.7015 20.2083 16.6682 18.575C15.6348 16.925 15.1182 14.625 15.1182 11.675C15.1182 8.74167 15.6348 6.45833 16.6682 4.825C17.7015 3.19167 19.2432 2.375 21.2932 2.375C23.3432 2.375 24.8932 3.19167 25.9432 4.825C26.9932 6.45833 27.5182 8.74167 27.5182 11.675C27.5182 14.625 26.9932 16.925 25.9432 18.575C24.9098 20.2083 23.3598 21.025 21.2932 21.025ZM24.2432 8.45C23.8098 6.23333 22.8265 5.125 21.2932 5.125C20.2765 5.125 19.4932 5.65833 18.9432 6.725C18.3932 7.79167 18.1182 9.44167 18.1182 11.675V11.85L24.2432 8.45ZM31.5357 0.474999H47.6107C46.9274 2.40833 46.1191 4.13333 45.1857 5.65C45.9357 6.08333 46.4857 6.61667 46.8357 7.25C47.1857 7.88333 47.3607 8.56667 47.3607 9.3C47.3607 10.2667 47.1024 11.2 46.5857 12.1H43.1607C43.8941 11.0833 44.2607 10.175 44.2607 9.375C44.2607 8.74167 44.0191 8.24167 43.5357 7.875C41.5691 10.0583 39.1691 11.325 36.3357 11.675C35.9857 11.725 35.6441 11.75 35.3107 11.75C34.4441 11.75 33.6774 11.6083 33.0107 11.325C32.3607 11.0417 31.8524 10.6667 31.4857 10.2C31.1357 9.71667 30.9607 9.20833 30.9607 8.675C30.9607 8.09167 31.1774 7.53333 31.6107 7C32.0441 6.45 32.7107 5.975 33.6107 5.575C34.5107 5.15833 35.6357 4.875 36.9857 4.725C37.9857 4.60833 38.9607 4.55 39.9107 4.55C40.8774 4.55 41.7024 4.60833 42.3857 4.725C42.6524 4.30833 42.9857 3.725 43.3857 2.975H31.5357V0.474999ZM49.6607 16.275H41.0107V23.05H38.0107V16.275H29.3607V13.525H49.6607V16.275ZM35.9857 9.175C37.6691 8.975 39.1691 8.26667 40.4857 7.05C39.5691 7.01667 38.5191 7.075 37.3357 7.225C36.2691 7.34167 35.4441 7.54167 34.8607 7.825C34.2774 8.09167 33.9857 8.36667 33.9857 8.65C33.9857 8.81667 34.0941 8.95833 34.3107 9.075C34.5441 9.175 34.8691 9.225 35.2857 9.225L35.9857 9.175ZM69.4445 22.225C68.1779 22.5417 66.8612 22.7833 65.4945 22.95C64.1445 23.1333 62.8362 23.225 61.5695 23.225C60.0695 23.225 58.7529 23.0833 57.6195 22.8C56.5029 22.5333 55.6779 22.1083 55.1445 21.525C54.6612 20.9917 54.3195 20.3833 54.1195 19.7C53.9195 19.0167 53.8195 18.2417 53.8195 17.375C53.8195 16.6917 53.8779 15.8083 53.9945 14.725L56.9945 15.025C56.8945 15.975 56.8445 16.775 56.8445 17.425C56.8445 18.5583 57.0112 19.2917 57.3445 19.625C57.5945 19.8917 58.0862 20.0917 58.8195 20.225C59.5529 20.375 60.4445 20.45 61.4945 20.45C62.7112 20.45 64.0195 20.3583 65.4195 20.175C66.8362 19.9917 68.1779 19.725 69.4445 19.375V22.225ZM68.8195 0.499999V16.05H65.8195V9.025H60.0445V6.25H65.8195V4.6H60.0445V1.825H65.8195V0.499999H68.8195ZM63.5695 12.35C62.4195 12.5667 61.4112 12.7417 60.5445 12.875C59.6779 12.9917 58.8195 13.05 57.9695 13.05C55.0362 13.05 53.1279 12.1083 52.2445 10.225C51.7112 9.15833 51.4445 7.83333 51.4445 6.25C51.4445 4.9 51.6529 3.2 52.0695 1.15H55.1195C54.6862 3.16667 54.4695 4.88333 54.4695 6.3C54.4695 7.48333 54.6279 8.39167 54.9445 9.025C55.3445 9.89167 56.3445 10.325 57.9445 10.325C58.5612 10.325 59.1945 10.275 59.8445 10.175C60.5112 10.075 61.4779 9.91667 62.7445 9.7L63.5695 9.55V12.35ZM95.3205 0.499999V22.3H92.3205V0.499999H95.3205ZM78.2455 1.15H86.0205C87.0205 1.15 87.8622 1.44167 88.5455 2.025C89.2288 2.60833 89.6038 3.44167 89.6705 4.525C89.7205 7.39167 89.3788 9.825 88.6455 11.825C87.9288 13.825 86.6955 15.475 84.9455 16.775C83.1955 18.075 80.8288 19.0167 77.8455 19.6L77.2955 16.9C79.7122 16.4333 81.6038 15.7 82.9705 14.7C84.3538 13.7 85.3205 12.3917 85.8705 10.775C86.4372 9.15833 86.7038 7.10833 86.6705 4.625C86.6538 4.325 86.5955 4.13333 86.4955 4.05C86.4122 3.95 86.2538 3.9 86.0205 3.9H78.2455V1.15ZM115.817 0.499999V13.55H112.817V9.025H107.042V6.25H112.817V4.6H107.042V1.825H112.817V0.499999H115.817ZM110.567 12.35C109.417 12.5667 108.408 12.7417 107.542 12.875C106.675 12.9917 105.817 13.05 104.967 13.05C102.033 13.05 100.125 12.1083 99.2416 10.225C98.7083 9.15833 98.4416 7.83333 98.4416 6.25C98.4416 4.9 98.6499 3.2 99.0666 1.15H102.117C101.683 3.16667 101.467 4.88333 101.467 6.3C101.467 7.48333 101.625 8.39167 101.942 9.025C102.342 9.89167 103.342 10.325 104.942 10.325C105.558 10.325 106.192 10.275 106.842 10.175C107.508 10.075 108.475 9.91667 109.742 9.7L110.567 9.55V12.35ZM100.217 14.3H115.817V23.25H104.592C103.392 23.25 102.433 22.9417 101.717 22.325C101.017 21.725 100.667 20.8667 100.667 19.75C100.667 19.45 100.692 19.1417 100.742 18.825C100.925 18.175 101.133 17.5833 101.367 17.05H100.217V14.3ZM103.642 19.875C103.642 20.125 103.708 20.2917 103.842 20.375C103.992 20.4583 104.242 20.5 104.592 20.5H112.817V17.05H104.617C104.2 17.8667 103.892 18.6333 103.692 19.35L103.642 19.875ZM137.438 22.625C134.788 23.1083 132.179 23.35 129.613 23.35C128.146 23.35 126.863 23.25 125.763 23.05C124.663 22.85 123.846 22.5417 123.313 22.125C122.779 21.7083 122.396 21.225 122.163 20.675C121.946 20.125 121.838 19.475 121.838 18.725C121.838 18.225 121.896 17.5417 122.013 16.675L124.963 17.075C124.879 17.6083 124.838 18.1583 124.838 18.725C124.838 19.3917 124.946 19.8083 125.163 19.975C125.413 20.175 125.913 20.325 126.663 20.425C127.413 20.5417 128.329 20.6 129.413 20.6C130.613 20.6 131.921 20.5333 133.338 20.4C134.771 20.2667 136.138 20.075 137.438 19.825V22.625ZM136.813 0.499999V5.65H139.213V8.65H136.813V16.05H133.813V13.025C130.729 14.2917 127.121 14.925 122.988 14.925C121.738 14.925 120.254 14.85 118.538 14.7L118.788 11.95C120.438 12.1 121.846 12.175 123.013 12.175V7.05H126.013V12.05C129.013 11.7667 131.613 11.075 133.813 9.975V0.499999H136.813ZM119.738 1.15H127.513C128.529 1.15 129.379 1.44167 130.063 2.025C130.746 2.60833 131.113 3.45 131.163 4.55C131.146 5.5 131.021 6.775 130.788 8.375L130.588 9.7L127.638 9.35L127.863 7.725C128.046 6.275 128.146 5.23333 128.163 4.6C128.146 4.31667 128.088 4.13333 127.988 4.05C127.904 3.95 127.746 3.9 127.513 3.9H119.738V1.15Z" fill="#009A7C"/>
</svg>}
          subtitle="주점, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2Layer60thAnniversaryHall.webp"
          imagePosition="right"
          textAlignment="left"
          marginBottom="0px"
          link="60주년"
        />
        </div>

        <div 
          ref={cardFutureRef}
          className={`transition-all duration-1000 ${
            homeCard2Visibility['homecard2-cardFuture']
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
        <HomeCard2
            title={<svg width="85" height="23" viewBox="0 0 85 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.05 -1.2517e-06V21.8H15.05V-1.2517e-06H18.05ZM0.725 0.674999H12.025V17.725H5.15C3.8 17.725 2.74167 17.35 1.975 16.6C1.225 15.8333 0.875 14.7917 0.925 13.475C1.00833 11.4417 1.125 9.65833 1.275 8.125C1.44167 6.575 1.65833 5.00833 1.925 3.425H0.725V0.674999ZM3.925 13.575C3.90833 14.125 3.98333 14.5 4.15 14.7C4.31667 14.8833 4.65 14.975 5.15 14.975H9.025V3.425H4.95C4.68333 5.00833 4.46667 6.56667 4.3 8.1C4.15 9.61667 4.025 11.4417 3.925 13.575ZM41.0461 -1.2517e-06V21.8H38.0461V11.4H36.5461V20.55H33.5461V0.249999H36.5461V8.4H38.0461V-1.2517e-06H41.0461ZM21.8711 8.375H28.1711C28.6878 8.375 29.0628 8.19167 29.2961 7.825C29.5294 7.44167 29.6461 6.96667 29.6461 6.4C29.6461 5.95 29.5794 5.50833 29.4461 5.075C29.3294 4.64167 29.1711 4.30833 28.9711 4.075C28.5044 3.525 27.8878 3.25 27.1211 3.25C26.1378 3.25 24.9294 3.7 23.4961 4.6L21.8961 2.3C23.7461 1.11667 25.5294 0.524999 27.2461 0.524999C28.9294 0.524999 30.2711 1.10833 31.2711 2.275C31.7044 2.79167 32.0378 3.40833 32.2711 4.125C32.5211 4.825 32.6461 5.55 32.6461 6.3C32.6461 7.15 32.4794 7.94167 32.1461 8.675C31.8294 9.40833 31.3294 10 30.6461 10.45C29.9794 10.9 29.1544 11.125 28.1711 11.125H25.7961C25.2294 12.325 24.9461 13.3083 24.9461 14.075C24.9461 14.7417 25.1378 15.3 25.5211 15.75C25.9044 16.1833 26.5128 16.4 27.3461 16.4C28.1461 16.4 29.0628 16.2167 30.0961 15.85C31.1294 15.4667 32.1378 14.9667 33.1211 14.35V17.55C32.1878 18.0333 31.2044 18.4167 30.1711 18.7C29.1544 18.9833 28.1794 19.125 27.2461 19.125C25.5128 19.125 24.1878 18.6 23.2711 17.55C22.3878 16.55 21.9461 15.3833 21.9461 14.05C21.9461 13.15 22.1461 12.175 22.5461 11.125H21.8711V8.375ZM48.1059 18.9C48.1059 19.0833 48.3059 19.2667 48.7059 19.45C49.1059 19.65 49.6892 19.8 50.4559 19.9C51.5059 20.0167 52.4392 20.075 53.2559 20.075C54.0892 20.075 55.0225 20.0167 56.0559 19.9C56.8225 19.8 57.4059 19.65 57.8059 19.45C58.2059 19.2667 58.4059 19.0833 58.4059 18.9V18.75C58.4059 18.5167 58.2059 18.3 57.8059 18.1C57.4225 17.8833 56.9059 17.775 56.2559 17.775H50.2559C49.6059 17.775 49.0809 17.8833 48.6809 18.1C48.2975 18.3 48.1059 18.5167 48.1059 18.75V18.9ZM45.1059 18.75C45.1059 18.1 45.3142 17.4917 45.7309 16.925C46.1642 16.3417 46.7725 15.8833 47.5559 15.55C48.3392 15.2 49.2392 15.025 50.2559 15.025H56.2559C57.2725 15.025 58.1725 15.2 58.9559 15.55C59.7392 15.8833 60.3392 16.3417 60.7559 16.925C61.1892 17.4917 61.4059 18.1 61.4059 18.75V18.9C61.4059 19.8833 60.9642 20.7 60.0809 21.35C59.1975 22.0167 57.9892 22.45 56.4559 22.65C55.3392 22.7667 54.2725 22.825 53.2559 22.825C52.2725 22.825 51.2059 22.7667 50.0559 22.65C48.5225 22.45 47.3142 22.0167 46.4309 21.35C45.5475 20.7 45.1059 19.8833 45.1059 18.9V18.75ZM61.0559 -1.2517e-06V5.15H63.4559V8.15H61.0559V14.3H58.0559V11.775C54.9725 13.0417 51.3642 13.675 47.2309 13.675C45.9809 13.675 44.4975 13.6 42.7809 13.45L43.0309 10.7C44.6809 10.85 46.0892 10.925 47.2559 10.925V6.55H50.2559V10.8C53.2559 10.5167 55.8559 9.825 58.0559 8.725V-1.2517e-06H61.0559ZM43.9809 0.649999H51.7559C52.7725 0.649999 53.6225 0.941666 54.3059 1.525C54.9892 2.10833 55.3559 2.95 55.4059 4.05C55.3892 5 55.2642 6.275 55.0309 7.875L54.8309 9.2L51.8809 8.85L52.1059 7.225C52.2892 5.775 52.3892 4.73333 52.4059 4.1C52.3892 3.81667 52.3309 3.63333 52.2309 3.55C52.1475 3.45 51.9892 3.4 51.7559 3.4H43.9809V0.649999ZM69.6146 18.125C69.6146 18.5417 69.8146 18.9 70.2146 19.2C70.6146 19.5 71.2146 19.7167 72.0146 19.85C73.1146 20 74.0313 20.075 74.7646 20.075C75.5313 20.075 76.448 20 77.5146 19.85C78.3146 19.7167 78.9146 19.5 79.3146 19.2C79.7146 18.9 79.9146 18.5417 79.9146 18.125V17.925C79.9146 17.4583 79.7146 17.0667 79.3146 16.75C78.9313 16.4167 78.4146 16.25 77.7646 16.25H71.7646C71.1146 16.25 70.5896 16.4167 70.1896 16.75C69.8063 17.0667 69.6146 17.4583 69.6146 17.925V18.125ZM66.6146 17.925C66.6146 17.125 66.8313 16.3917 67.2646 15.725C67.7146 15.0417 68.3313 14.5 69.1146 14.1C69.898 13.7 70.7813 13.5 71.7646 13.5H77.7646C78.748 13.5 79.6313 13.7 80.4146 14.1C81.198 14.5 81.8063 15.0417 82.2396 15.725C82.6896 16.3917 82.9146 17.125 82.9146 17.925V18.125C82.9146 19.3083 82.4563 20.2833 81.5396 21.05C80.623 21.8333 79.448 22.3333 78.0146 22.55C76.848 22.7167 75.7646 22.8 74.7646 22.8C73.7813 22.8 72.698 22.7167 71.5146 22.55C70.0813 22.3333 68.9063 21.8333 67.9896 21.05C67.073 20.2833 66.6146 19.3083 66.6146 18.125V17.925ZM82.5646 -1.2517e-06V5.15H84.9646V8.15H82.5646V13.05H79.5646V-1.2517e-06H82.5646ZM65.7896 0.649999H76.9646C76.5646 2.86667 76.0646 4.75 75.4646 6.3C76.6813 6.96667 77.2896 8.05 77.2896 9.55C77.2896 10.55 77.048 11.5667 76.5646 12.6H73.1396C73.5063 12.0333 73.7896 11.5333 73.9896 11.1C74.2063 10.65 74.3146 10.2333 74.3146 9.85C74.3146 9.55 74.2313 9.29167 74.0646 9.075C72.6146 11.325 70.723 12.55 68.3896 12.75L67.9396 12.775C67.1896 12.775 66.5313 12.6333 65.9646 12.35C65.398 12.0667 64.9646 11.6917 64.6646 11.225C64.3813 10.7417 64.2396 10.225 64.2396 9.675C64.2396 9.05833 64.423 8.46667 64.7896 7.9C65.173 7.33333 65.7563 6.85 66.5396 6.45C67.3396 6.03333 68.3313 5.75833 69.5146 5.625C70.3813 5.54167 71.0813 5.5 71.6146 5.5C71.8813 5.5 72.2313 5.51667 72.6646 5.55C72.9313 4.88333 73.1646 4.16667 73.3646 3.4H65.7896V0.649999ZM67.9146 10C69.098 10 70.1646 9.425 71.1146 8.275L69.8146 8.375C69.0813 8.45833 68.4646 8.64167 67.9646 8.925C67.4646 9.19167 67.2146 9.44167 67.2146 9.675C67.2146 9.89167 67.448 10 67.9146 10Z" fill="#009A7C"/>
</svg>}
            subtitle="부스, 주점,<br/>푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2LayerFutureSquare.webp"
          imagePosition="left"
          textAlignment="right"
          marginBottom="0px"
          link="미래광장"
        />
        </div>
      </div>

      <div className="w-full h-screen min-h-[600px] max-h-[932px] pt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg5.webp')] bg-cover bg-center overflow-hidden">
        <div 
          ref={cardStadiumRef}
          className={`transition-all duration-1000 ${
            homeCard2Visibility['homecard2-cardStadium']
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
        <HomeCard2
            title={<svg width="86" height="24" viewBox="0 0 86 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.05 0.999999V22.8H17.05V12.4H15.55V21.55H12.55V1.25H15.55V9.4H17.05V0.999999H20.05ZM11.825 18.25C9.79167 19.2667 8.09167 19.775 6.725 19.775C4.30833 19.775 2.625 18.3417 1.675 15.475C1.30833 14.375 1.125 13.0667 1.125 11.55C1.125 9.56667 1.45 7.18333 2.1 4.4H0.95V1.65H10.775V4.4H5.2C4.48333 7.3 4.125 9.71667 4.125 11.65C4.125 12.85 4.25833 13.825 4.525 14.575C4.825 15.4583 5.16667 16.0917 5.55 16.475C5.95 16.8583 6.43333 17.05 7 17.05C7.53333 17.05 8.15 16.9 8.85 16.6C9.56667 16.2833 10.5583 15.775 11.825 15.075V18.25ZM40.3098 22.725C39.0431 23.0417 37.7014 23.2833 36.2848 23.45C34.8848 23.6333 33.5264 23.725 32.2098 23.725C30.6264 23.725 29.2431 23.5833 28.0598 23.3C26.8931 23.0333 26.0431 22.6083 25.5098 22.025C25.0264 21.5083 24.6848 20.9167 24.4848 20.25C24.2848 19.6 24.1848 18.8583 24.1848 18.025C24.1848 17.375 24.2431 16.525 24.3598 15.475L27.3598 15.775C27.2598 16.725 27.2098 17.5 27.2098 18.1C27.2098 19.1 27.3764 19.775 27.7098 20.125C27.9598 20.3917 28.4681 20.5917 29.2348 20.725C30.0181 20.875 30.9681 20.95 32.0848 20.95C33.3848 20.95 34.7598 20.8583 36.2098 20.675C37.6764 20.4917 39.0431 20.225 40.3098 19.875V22.725ZM42.4098 13.875H34.5098V18.175H31.5098V13.875H22.1098V11.125H42.4098V13.875ZM27.1098 5.275C27.1098 5.69167 27.2348 6.01667 27.4848 6.25C27.7514 6.46667 28.1764 6.575 28.7598 6.575H35.7598C36.3431 6.575 36.7598 6.46667 37.0098 6.25C37.2764 6.01667 37.4098 5.69167 37.4098 5.275V5.125C37.4098 4.74167 37.2764 4.45 37.0098 4.25C36.7431 4.05 36.2598 3.90833 35.5598 3.825C34.5098 3.65833 33.4098 3.575 32.2598 3.575C31.1264 3.575 30.0264 3.65833 28.9598 3.825C28.2598 3.90833 27.7764 4.05 27.5098 4.25C27.2431 4.45 27.1098 4.74167 27.1098 5.125V5.275ZM24.1098 5.125C24.1098 4.025 24.4931 3.125 25.2598 2.425C26.0264 1.70833 27.1264 1.25833 28.5598 1.075C29.7264 0.908333 30.9598 0.825 32.2598 0.825C33.5764 0.825 34.8098 0.908333 35.9598 1.075C37.3931 1.25833 38.4931 1.70833 39.2598 2.425C40.0264 3.125 40.4098 4.025 40.4098 5.125V5.275C40.4098 5.99167 40.2348 6.65833 39.8848 7.275C39.5348 7.89167 39.0098 8.39167 38.3098 8.775C37.6098 9.14167 36.7598 9.325 35.7598 9.325H28.7598C27.7598 9.325 26.9098 9.14167 26.2098 8.775C25.5098 8.39167 24.9848 7.89167 24.6348 7.275C24.2848 6.65833 24.1098 5.99167 24.1098 5.275V5.125ZM48.6186 19.225C48.6186 19.625 48.8102 19.9667 49.1936 20.25C49.5936 20.5333 50.1936 20.7333 50.9936 20.85C52.0936 21 53.0186 21.075 53.7686 21.075C54.5186 21.075 55.4436 21 56.5436 20.85C57.3436 20.7333 57.9352 20.5333 58.3186 20.25C58.7186 19.9667 58.9186 19.625 58.9186 19.225V19.05C58.9186 18.6 58.7186 18.225 58.3186 17.925C57.9352 17.6083 57.4186 17.45 56.7686 17.45H50.7686C50.1186 17.45 49.5936 17.6083 49.1936 17.925C48.8102 18.225 48.6186 18.6 48.6186 19.05V19.225ZM45.6186 19.05C45.6186 18.2667 45.8352 17.5417 46.2686 16.875C46.7186 16.2083 47.3352 15.6833 48.1186 15.3C48.9019 14.9 49.7852 14.7 50.7686 14.7H56.7686C57.7519 14.7 58.6352 14.9 59.4186 15.3C60.2019 15.6833 60.8102 16.2083 61.2436 16.875C61.6936 17.5417 61.9186 18.2667 61.9186 19.05V19.225C61.9186 20.325 61.4852 21.2667 60.6186 22.05C59.7519 22.8333 58.5436 23.3333 56.9936 23.55C55.8269 23.7167 54.7519 23.8 53.7686 23.8C52.7852 23.8 51.7102 23.7167 50.5436 23.55C48.9936 23.3333 47.7852 22.8333 46.9186 22.05C46.0519 21.2667 45.6186 20.325 45.6186 19.225V19.05ZM61.8186 8.675C60.9019 8.925 59.8602 9.14167 58.6936 9.325C57.5269 9.49167 56.3436 9.6 55.1436 9.65V10.775H63.9186V13.525H43.6186V10.775H52.3936V9.625C51.1936 9.55833 50.1436 9.4 49.2436 9.15C48.3602 8.88333 47.7019 8.525 47.2686 8.075C46.8519 7.625 46.5519 7.16667 46.3686 6.7C46.1852 6.23333 46.0936 5.70833 46.0936 5.125C46.0936 4.775 46.1352 4.325 46.2186 3.775H45.2186V1.025H61.8186V3.775H49.2686C49.1519 4.25833 49.0936 4.69167 49.0936 5.075C49.0936 5.525 49.2186 5.89167 49.4686 6.175C49.7019 6.425 50.1852 6.61667 50.9186 6.75C51.6686 6.86667 52.5686 6.925 53.6186 6.925C55.0352 6.925 56.5019 6.825 58.0186 6.625C59.5519 6.40833 60.8186 6.125 61.8186 5.775V8.675ZM70.1273 19.125C70.1273 19.5417 70.3273 19.9 70.7273 20.2C71.1273 20.5 71.7273 20.7167 72.5273 20.85C73.6273 21 74.544 21.075 75.2773 21.075C76.044 21.075 76.9607 21 78.0273 20.85C78.8273 20.7167 79.4273 20.5 79.8273 20.2C80.2273 19.9 80.4273 19.5417 80.4273 19.125V18.925C80.4273 18.4583 80.2273 18.0667 79.8273 17.75C79.444 17.4167 78.9273 17.25 78.2773 17.25H72.2773C71.6273 17.25 71.1023 17.4167 70.7023 17.75C70.319 18.0667 70.1273 18.4583 70.1273 18.925V19.125ZM67.1273 18.925C67.1273 18.125 67.344 17.3917 67.7773 16.725C68.2273 16.0417 68.844 15.5 69.6273 15.1C70.4107 14.7 71.294 14.5 72.2773 14.5H78.2773C79.2607 14.5 80.144 14.7 80.9273 15.1C81.7107 15.5 82.319 16.0417 82.7523 16.725C83.2023 17.3917 83.4273 18.125 83.4273 18.925V19.125C83.4273 20.3083 82.969 21.2833 82.0523 22.05C81.1357 22.8333 79.9607 23.3333 78.5273 23.55C77.3607 23.7167 76.2773 23.8 75.2773 23.8C74.294 23.8 73.2107 23.7167 72.0273 23.55C70.594 23.3333 69.419 22.8333 68.5023 22.05C67.5857 21.2833 67.1273 20.3083 67.1273 19.125V18.925ZM83.0773 0.999999V6.15H85.4773V9.15H83.0773V14.05H80.0773V0.999999H83.0773ZM66.3023 1.65H77.4773C77.0773 3.86667 76.5773 5.75 75.9773 7.3C77.194 7.96667 77.8023 9.05 77.8023 10.55C77.8023 11.55 77.5607 12.5667 77.0773 13.6H73.6523C74.019 13.0333 74.3023 12.5333 74.5023 12.1C74.719 11.65 74.8273 11.2333 74.8273 10.85C74.8273 10.55 74.744 10.2917 74.5773 10.075C73.1273 12.325 71.2357 13.55 68.9023 13.75L68.4523 13.775C67.7023 13.775 67.044 13.6333 66.4773 13.35C65.9107 13.0667 65.4773 12.6917 65.1773 12.225C64.894 11.7417 64.7523 11.225 64.7523 10.675C64.7523 10.0583 64.9357 9.46667 65.3023 8.9C65.6857 8.33333 66.269 7.85 67.0523 7.45C67.8523 7.03333 68.844 6.75833 70.0273 6.625C70.894 6.54167 71.594 6.5 72.1273 6.5C72.394 6.5 72.744 6.51667 73.1773 6.55C73.444 5.88333 73.6773 5.16667 73.8773 4.4H66.3023V1.65ZM68.4273 11C69.6107 11 70.6773 10.425 71.6273 9.275L70.3273 9.375C69.594 9.45833 68.9773 9.64167 68.4773 9.925C67.9773 10.1917 67.7273 10.4417 67.7273 10.675C67.7273 10.8917 67.9607 11 68.4273 11Z" fill="#009A7C"/>
</svg>}
          subtitle="공연, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2LayerLargeGround.webp"
          imagePosition="right"
          textAlignment="left"
          marginBottom="0px"
          link="대운동장"
        />
        </div>

        <div 
          ref={cardHaminRef}
          className={`transition-all duration-1000 ${
            homeCard2Visibility['homecard2-cardHamin']
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
        <HomeCard2
            title={<svg width="111" height="24" viewBox="0 0 111 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.55 0.999999V6.15H20.95V9.15H18.55V14.05H15.55V0.999999H18.55ZM8.425 0.149999C8.425 0.533333 8.45 0.866666 8.5 1.15C8.55 1.41667 8.66667 1.70833 8.85 2.025H13.8V4.775H0.775V2.025H5.575C5.475 1.525 5.425 0.9 5.425 0.149999H8.425ZM7.3 11.1C8.25 11.1 8.91667 10.975 9.3 10.725C9.7 10.475 9.9 10.125 9.9 9.675C9.9 9.20833 9.7 8.85833 9.3 8.625C8.91667 8.375 8.25 8.25 7.3 8.25C6.35 8.25 5.675 8.375 5.275 8.625C4.89167 8.85833 4.7 9.20833 4.7 9.675C4.7 10.125 4.89167 10.475 5.275 10.725C5.675 10.975 6.35 11.1 7.3 11.1ZM7.3 13.85C6.06667 13.85 5.025 13.6667 4.175 13.3C3.34167 12.9167 2.71667 12.4167 2.3 11.8C1.9 11.1667 1.7 10.4583 1.7 9.675C1.7 8.89167 1.9 8.19167 2.3 7.575C2.71667 6.94167 3.34167 6.44167 4.175 6.075C5.025 5.69167 6.06667 5.5 7.3 5.5C8.53333 5.5 9.56667 5.69167 10.4 6.075C11.25 6.44167 11.875 6.94167 12.275 7.575C12.6917 8.19167 12.9 8.89167 12.9 9.675C12.9 10.4583 12.6917 11.1667 12.275 11.8C11.875 12.4167 11.25 12.9167 10.4 13.3C9.56667 13.6667 8.53333 13.85 7.3 13.85ZM2.95 14.8H18.55V23.75H7.325C6.125 23.75 5.16667 23.4417 4.45 22.825C3.75 22.225 3.4 21.3667 3.4 20.25C3.4 19.95 3.425 19.6417 3.475 19.325C3.65833 18.675 3.86667 18.0833 4.1 17.55H2.95V14.8ZM6.375 20.375C6.375 20.625 6.44167 20.7917 6.575 20.875C6.725 20.9583 6.975 21 7.325 21H15.55V17.55H7.35C6.93333 18.3667 6.625 19.1333 6.425 19.85L6.375 20.375ZM40.4338 22.725C39.1671 23.0417 37.8505 23.2833 36.4838 23.45C35.1338 23.6333 33.8255 23.725 32.5588 23.725C31.0588 23.725 29.7421 23.5833 28.6088 23.3C27.4921 23.0333 26.6671 22.6083 26.1338 22.025C25.6505 21.4917 25.3088 20.8833 25.1088 20.2C24.9088 19.5167 24.8088 18.7417 24.8088 17.875C24.8088 17.1917 24.8671 16.3083 24.9838 15.225L27.9838 15.525C27.8838 16.475 27.8338 17.275 27.8338 17.925C27.8338 19.0583 28.0005 19.7917 28.3338 20.125C28.5838 20.3917 29.0755 20.5917 29.8088 20.725C30.5421 20.875 31.4338 20.95 32.4838 20.95C33.7005 20.95 35.0088 20.8583 36.4088 20.675C37.8255 20.4917 39.1671 20.225 40.4338 19.875V22.725ZM39.8088 0.999999V16.55H36.8088V0.999999H39.8088ZM25.3588 8.1C25.3588 8.83333 25.5921 9.41667 26.0588 9.85C26.5421 10.2833 27.1921 10.5 28.0088 10.5H28.2588C29.0755 10.5 29.7171 10.2833 30.1838 9.85C30.6671 9.41667 30.9088 8.83333 30.9088 8.1V6.8C30.9088 6.05 30.6671 5.46667 30.1838 5.05C29.7171 4.61667 29.0755 4.4 28.2588 4.4H28.0088C27.1921 4.4 26.5421 4.61667 26.0588 5.05C25.5921 5.46667 25.3588 6.05 25.3588 6.8V8.1ZM22.3588 6.8C22.3588 5.78333 22.6005 4.89167 23.0838 4.125C23.5838 3.34167 24.2588 2.73333 25.1088 2.3C25.9755 1.86667 26.9421 1.65 28.0088 1.65H28.2588C29.3255 1.65 30.2838 1.86667 31.1338 2.3C32.0005 2.73333 32.6755 3.34167 33.1588 4.125C33.6588 4.89167 33.9088 5.78333 33.9088 6.8V8.1C33.9088 9.1 33.6588 9.99167 33.1588 10.775C32.6755 11.5583 32.0005 12.1667 31.1338 12.6C30.2838 13.0333 29.3255 13.25 28.2588 13.25H28.0088C26.9421 13.25 25.9755 13.0333 25.1088 12.6C24.2588 12.1667 23.5838 11.5583 23.0838 10.775C22.6005 9.99167 22.3588 9.1 22.3588 8.1V6.8ZM48.2049 19.7C48.2049 20.1833 48.6382 20.55 49.5049 20.8C50.3882 21.05 51.4799 21.175 52.7799 21.175C53.0799 21.175 53.5465 21.1583 54.1799 21.125C55.3799 21.0583 56.2632 20.8917 56.8299 20.625C57.3966 20.375 57.7132 20.0083 57.7799 19.525C56.6632 19.275 55.4966 19.0667 54.2799 18.9C53.0632 18.7333 51.9882 18.65 51.0549 18.65C49.1549 18.65 48.2049 19 48.2049 19.7ZM60.8049 0.999999V14.05H57.8049V7.475H55.2549C55.6549 8.10833 55.8549 8.85833 55.8549 9.725C55.8549 10.3583 55.7466 11.0083 55.5299 11.675C55.3132 12.3417 55.0299 12.9583 54.6799 13.525H50.9049C51.4215 12.975 51.8632 12.375 52.2299 11.725C52.6132 11.0583 52.8049 10.4583 52.8049 9.925C52.8049 9.24167 52.4799 8.75 51.8299 8.45C51.5966 9.81667 51.0299 10.9167 50.1299 11.75C49.2299 12.5667 47.9382 12.975 46.2549 12.975C45.4882 12.975 44.8132 12.825 44.2299 12.525C43.6632 12.225 43.2215 11.825 42.9049 11.325C42.6049 10.8083 42.4549 10.2583 42.4549 9.675C42.4549 9.04167 42.6465 8.425 43.0299 7.825C43.4132 7.225 43.9965 6.70833 44.7799 6.275C45.5799 5.84167 46.5632 5.55833 47.7299 5.425L48.9299 5.325V1.65H51.9299V5.5C53.1632 5.73333 54.1299 6.20833 54.8299 6.925V4.475H57.8049V0.999999H60.8049ZM45.2049 14.525H48.2049V16.275C49.0715 16.0417 50.1049 15.925 51.3049 15.925C53.2382 15.925 55.4049 16.1917 57.8049 16.725V14.775H60.8049V19.3C60.8049 20.7333 60.2299 21.8167 59.0799 22.55C57.9466 23.3 56.3799 23.7417 54.3799 23.875C53.6799 23.9083 53.1632 23.925 52.8299 23.925C50.6632 23.925 48.8465 23.5917 47.3799 22.925C45.9299 22.2583 45.2049 21.1833 45.2049 19.7V14.525ZM46.2799 10.225C47.0965 10.225 47.7049 10.0583 48.1049 9.725C48.5049 9.375 48.7549 8.83333 48.8549 8.1L48.0799 8.175C47.2465 8.25833 46.5965 8.45 46.1299 8.75C45.6632 9.05 45.4299 9.35 45.4299 9.65C45.4299 9.81667 45.5049 9.95833 45.6549 10.075C45.8049 10.175 46.0132 10.225 46.2799 10.225ZM74.1059 19.9C74.1059 20.0833 74.3059 20.2667 74.7059 20.45C75.1059 20.65 75.6892 20.8 76.4559 20.9C77.5059 21.0167 78.4392 21.075 79.2559 21.075C80.0892 21.075 81.0225 21.0167 82.0559 20.9C82.8225 20.8 83.4059 20.65 83.8059 20.45C84.2059 20.2667 84.4059 20.0833 84.4059 19.9V19.75C84.4059 19.5167 84.2059 19.3 83.8059 19.1C83.4225 18.8833 82.9059 18.775 82.2559 18.775H76.2559C75.6059 18.775 75.0809 18.8833 74.6809 19.1C74.2975 19.3 74.1059 19.5167 74.1059 19.75V19.9ZM71.1059 19.75C71.1059 19.1 71.3142 18.4917 71.7309 17.925C72.1642 17.3417 72.7725 16.8833 73.5559 16.55C74.3392 16.2 75.2392 16.025 76.2559 16.025H82.2559C83.2725 16.025 84.1725 16.2 84.9559 16.55C85.7392 16.8833 86.3392 17.3417 86.7559 17.925C87.1892 18.4917 87.4059 19.1 87.4059 19.75V19.9C87.4059 20.8833 86.9642 21.7 86.0809 22.35C85.1975 23.0167 83.9892 23.45 82.4559 23.65C81.3392 23.7667 80.2725 23.825 79.2559 23.825C78.2725 23.825 77.2059 23.7667 76.0559 23.65C74.5225 23.45 73.3142 23.0167 72.4309 22.35C71.5475 21.7 71.1059 20.8833 71.1059 19.9V19.75ZM87.0559 0.999999V6.15H89.4559V9.15H87.0559V15.3H84.0559V12.775C80.9725 14.0417 77.3642 14.675 73.2309 14.675C71.9809 14.675 70.4975 14.6 68.7809 14.45L69.0309 11.7C70.6809 11.85 72.0892 11.925 73.2559 11.925V7.55H76.2559V11.8C79.2559 11.5167 81.8559 10.825 84.0559 9.725V0.999999H87.0559ZM69.9809 1.65H77.7559C78.7725 1.65 79.6225 1.94167 80.3059 2.525C80.9892 3.10833 81.3559 3.95 81.4059 5.05C81.3892 6 81.2642 7.275 81.0309 8.875L80.8309 10.2L77.8809 9.85L78.1059 8.225C78.2892 6.775 78.3892 5.73333 78.4059 5.1C78.3892 4.81667 78.3309 4.63333 78.2309 4.55C78.1475 4.45 77.9892 4.4 77.7559 4.4H69.9809V1.65ZM95.6146 19.125C95.6146 19.5417 95.8146 19.9 96.2146 20.2C96.6146 20.5 97.2146 20.7167 98.0146 20.85C99.1146 21 100.031 21.075 100.765 21.075C101.531 21.075 102.448 21 103.515 20.85C104.315 20.7167 104.915 20.5 105.315 20.2C105.715 19.9 105.915 19.5417 105.915 19.125V18.925C105.915 18.4583 105.715 18.0667 105.315 17.75C104.931 17.4167 104.415 17.25 103.765 17.25H97.7646C97.1146 17.25 96.5896 17.4167 96.1896 17.75C95.8063 18.0667 95.6146 18.4583 95.6146 18.925V19.125ZM92.6146 18.925C92.6146 18.125 92.8313 17.3917 93.2646 16.725C93.7146 16.0417 94.3313 15.5 95.1146 15.1C95.898 14.7 96.7813 14.5 97.7646 14.5H103.765C104.748 14.5 105.631 14.7 106.415 15.1C107.198 15.5 107.806 16.0417 108.24 16.725C108.69 17.3917 108.915 18.125 108.915 18.925V19.125C108.915 20.3083 108.456 21.2833 107.54 22.05C106.623 22.8333 105.448 23.3333 104.015 23.55C102.848 23.7167 101.765 23.8 100.765 23.8C99.7813 23.8 98.698 23.7167 97.5146 23.55C96.0813 23.3333 94.9063 22.8333 93.9896 22.05C93.073 21.2833 92.6146 20.3083 92.6146 19.125V18.925ZM108.565 0.999999V6.15H110.965V9.15H108.565V14.05H105.565V0.999999H108.565ZM91.7896 1.65H102.965C102.565 3.86667 102.065 5.75 101.465 7.3C102.681 7.96667 103.29 9.05 103.29 10.55C103.29 11.55 103.048 12.5667 102.565 13.6H99.1396C99.5063 13.0333 99.7896 12.5333 99.9896 12.1C100.206 11.65 100.315 11.2333 100.315 10.85C100.315 10.55 100.231 10.2917 100.065 10.075C98.6146 12.325 96.723 13.55 94.3896 13.75L93.9396 13.775C93.1896 13.775 92.5313 13.6333 91.9646 13.35C91.398 13.0667 90.9646 12.6917 90.6646 12.225C90.3813 11.7417 90.2396 11.225 90.2396 10.675C90.2396 10.0583 90.423 9.46667 90.7896 8.9C91.173 8.33333 91.7563 7.85 92.5396 7.45C93.3396 7.03333 94.3313 6.75833 95.5146 6.625C96.3813 6.54167 97.0813 6.5 97.6146 6.5C97.8813 6.5 98.2313 6.51667 98.6646 6.55C98.9313 5.88333 99.1646 5.16667 99.3646 4.4H91.7896V1.65ZM93.9146 11C95.098 11 96.1646 10.425 97.1146 9.275L95.8146 9.375C95.0813 9.45833 94.4646 9.64167 93.9646 9.925C93.4646 10.1917 93.2146 10.4417 93.2146 10.675C93.2146 10.8917 93.448 11 93.9146 11Z" fill="#009A7C"/>
</svg>}
          subtitle="부스, 푸드트럭"
          details="자세히 보기"
          imageSrc="/assets/home/LayerFrame2/2LayerHaminSquare.webp"
          imagePosition="left"
          textAlignment="right"
          marginBottom="0px"
          link="함인섭광장"
        />
        </div>

        <div className="mt-8 text-center">
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
        className="w-full h-screen min-h-[600px] max-h-[932px] bg-cover bg-center bg-no-repeat bg-[url('/assets/home/BGimg/BackImg6.webp')] flex justify-center items-center overflow-hidden"
      >
        <div className="flex flex-col w-[343.699px] h-[364px]">
          <div 
            ref={designerRef}
            className={`transition-all duration-1000 ${
              developerVisibility.designer
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
          <p className="text-[#009A7C] font-hssantokki text-[20px] font-normal leading-normal">
            디자이너
          </p>

          <p className="text-black font-school text-[16px] font-bold leading-[32px]">
            최혜선 <br />
            AI융합학과 23
          </p>
          </div>

          <div 
            className={`transition-all duration-1000 ${
              developerVisibility.frontend
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
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
          </div>

          <div 
            className={`transition-all duration-1000 ${
              developerVisibility.backend
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
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
      </div>

      {/* 최상단으로 이동 버튼 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
          style={{
            right: "max(20px, calc(50% - 215px + 45px))", // 최소 20px 여백 보장
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
