import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeCard3Props {
  logoSrc: string;      // 상단 로고 이미지
  mainImgSrc: string;   // 메인 이미지
  dayText: string;      // DAY1, DAY2 등
  dateText: string;     // 날짜
  nameText: string;     // 이름
  imagePosition?: 'left' | 'right'; // 이미지 위치 (기본 left)
  number: string;       // 이동할 번호
}

export const HomeCard3: React.FC<HomeCard3Props> = ({
  logoSrc,
  mainImgSrc,
  dayText,
  dateText,
  nameText,
  imagePosition = 'left',
  number
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artist/${number}`);
  };

  const textBlock = (
    <div className="flex flex-col justify-center min-w-[30%]">
      <p className="text-[#2F86E9] font-Pretendard font-bold text-[1.1em] leading-[1.3em]">{dayText}</p>
      <p className="text-black font-Pretendard font-bold text-[1.1em] leading-[1.2em]">{dateText}</p>
      <p className="text-black font-Pretendard font-bold text-[1.1em] leading-[1.3em]">{nameText}</p>
      <img src="assets/home/ArrowMove.svg" alt="" className="mt-[2%] w-[20%] h-auto" />
    </div>
  );

  return (
    <div className="w-full max-w-[330px] mx-auto cursor-pointer relative" onClick={handleClick}>
      {/* 로고 */}
      <img
        src={logoSrc}
        alt=""
        className={`absolute top-[5%] w-[35%] ${
          imagePosition === 'left'
            ? 'left-[50%] -translate-x-1/2 rotate-[12deg]'
            : 'right-[50%] translate-x-1/2 -rotate-[12deg]'
        }`}
      />

      {/* 카드 내용 */}
      <div className="flex mt-[20%] gap-[5%] items-center">
        {imagePosition === 'left' ? (
          <>
            <img
              src={mainImgSrc}
              alt=""
              className="w-[70%] h-auto rounded-lg shadow-md"
            />
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            <img
              src={mainImgSrc}
              alt=""
              className="w-[70%] h-auto rounded-lg shadow-md"
            />
          </>
        )}
      </div>
    </div>
  );
};
