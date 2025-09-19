import React, { useState, useEffect } from 'react';
import TimelineCard from '../components/TimelineCard';

// 실제 일정 데이터
const scheduleData = {
  1: [ // 9월 22일 (월) - 1일차
    { time: "13:00 ~ 17:00", title: "무대 및 부스 설치", description: "축제 준비 작업" },
    { time: "17:00 ~", title: "무대 및 부스 설치", description: "축제 준비 작업 (계속)" },
    { time: "18:00 ~ 20:30", title: "전야제", description: "축제 전야 행사" }
  ],
  2: [ // 9월 23일 (화) - 2일차
    { time: "13:00 ~ 17:00", title: "리허설", description: "공연 리허설" },
    { time: "17:00 ~", title: "재학생존 입장", description: "학생 전용 구역 입장" },
    { time: "18:00 ~ 18:30", title: "티저 영상 상영, 개막 선언 및 초청 축하 공연", description: "축제 개막식" },
    { time: "18:30 ~ 20:30", title: "재학생 무대 공연(KNU Artist)", description: "밴드제 7팀" },
    { time: "21:00 ~ 21:30", title: "초청 인사 소개 및 말씀", description: "초청 인사 인사말" },
    { time: "21:30 ~ 22:00", title: "초청 아티스트 공연", description: "초청 아티스트 1팀" }
  ],
  3: [ // 9월 24일 (수) - 3일차
    { time: "13:00 ~ 17:00", title: "리허설", description: "공연 리허설" },
    { time: "17:00 ~", title: "재학생존 입장", description: "학생 전용 구역 입장" },
    { time: "18:00 ~ 18:30", title: "보이는 라디오", description: "특별 라디오 프로그램" },
    { time: "18:30 ~ 20:30", title: "재학생 무대 공연(KNU Artist)", description: "댄스제 3팀" },
    { time: "21:00 ~ 21:30", title: "초청 아티스트 공연", description: "초청 아티스트 3팀" }
  ],
  4: [ // 9월 25일 (목) - 4일차
    { time: "13:00 ~ 17:00", title: "리허설", description: "공연 리허설" },
    { time: "17:00 ~", title: "재학생존 입장", description: "학생 전용 구역 입장" },
    { time: "18:00 ~ 19:30", title: "재학생 무대 공연(KNU Artist)", description: "가요제 8팀" },
    { time: "19:30 ~ 20:30", title: "총장님 프로그램", description: "총장님 특별 프로그램" },
    { time: "20:30 ~ 21:00", title: "폐막식", description: "축제 폐막식" },
    { time: "21:00 ~ 21:30", title: "초청 아티스트 공연", description: "초청 아티스트 2팀" },
    { time: "22:00 ~ 23:00", title: "축제 스케치 사진 상영회", description: "축제 추억 사진 상영" }
  ]
};

const Timetable: React.FC = () => {
  // 현재 날짜에 맞는 일차 계산
  const getCurrentDay = (): number => {
    const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth() + 1; // 0-based month
    
    // 2025년 9월 22일부터 시작
    if (currentMonth === 9) {
      if (currentDate >= 22 && currentDate <= 25) {
        return currentDate - 21; // 22일 = 1일차, 23일 = 2일차, ...
      }
    }
    
    // 실제 날짜가 아닌 경우 1일차로 설정
    return 1;
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [visibleCards, setVisibleCards] = useState<number[] | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  


  // 시간 문자열을 분으로 변환하는 함수
  const timeToMinutes = (timeStr: string): number => {
    const [time] = timeStr.split(' ~');
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // 현재 시간이 해당 이벤트 시간 범위에 있는지 확인하는 함수
  const isCurrentEvent = (timeStr: string): boolean => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentDay = getCurrentDay();
    
    // 현재 선택된 일차가 실제 현재 일차와 다르면 false 반환
    if (selectedDay !== currentDay) {
      return false;
    }
    
    // "~"로 시작하는 경우 (예: "17:00 ~") - 18:00까지로 제한
    if (timeStr.includes('~') && timeStr.endsWith('~')) {
      const startTime = timeToMinutes(timeStr);
      const endTime = 18 * 60; // 18:00 = 1080분
      return currentMinutes >= startTime && currentMinutes <= endTime;
    }
    
    // 시간 범위가 있는 경우 (예: "13:00 ~ 17:00")
    if (timeStr.includes(' ~ ')) {
      const [start, end] = timeStr.split(' ~ ');
      const startMinutes = timeToMinutes(start);
      const endMinutes = timeToMinutes(end);
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    }
    
    return false;
  };

  // 일차 변경 시 애니메이션 효과
  useEffect(() => {
    const currentSchedule = scheduleData[selectedDay as keyof typeof scheduleData];
    
    // 먼저 모든 카드를 숨김 (null로 설정)
    setVisibleCards(null);
    
    // 순차적으로 카드들을 나타나게 함
    currentSchedule.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => {
          if (prev === null) return [index];
          return [...prev, index];
        });
      }, index * 150 + (isInitialLoad ? 300 : 50)); // 초기 로드 시 더 긴 지연
    });
    
    // 애니메이션 완료 후 상태 리셋
    setTimeout(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }, currentSchedule.length * 150 + (isInitialLoad ? 400 : 150));
  }, [selectedDay]);
  
  return (
    <div className="w-full min-h-screen py-4">
      <div className="space-y-4 px-4">
        {/* 날짜 선택 */}
        <div className="bg-white/80 font-bold rounded-full p-1 shadow-lg">
          <div className="flex">
            {[1, 2, 3, 4].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex-1 text-center py-2 border-r border-gray-200 last:border-r-0"
              >
                <span className={`text-sm ${
                  selectedDay === day 
                    ? 'font-semibold text-[#285100]' 
                    : 'text-gray-400'
                }`}>
                  {day === 1 ? "전야제" : `${day - 1}일차`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 시간표 */}
        <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto px-2 -mx-2 pb-4">
          {scheduleData[selectedDay as keyof typeof scheduleData].map((event, index) => (
            <div
              key={`${selectedDay}-${index}`}
              className={`transition-all duration-300 ease-out ${
                visibleCards && visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                opacity: visibleCards && visibleCards.includes(index) ? 1 : 0
              }}
            >
              <TimelineCard
                time={event.time}
                title={event.title}
                description={event.description}
                isCurrent={isCurrentEvent(event.time)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
