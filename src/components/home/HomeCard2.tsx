// src/components/home/HomeCard2.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeCard2Props {
  title: string;
  subtitle: string;
  details: string;
  imageSrc?: string;
  imagePosition?: 'left' | 'right';
  textAlignment?: 'left' | 'right';
  marginBottom?: string;
  link: string; // 이동할 경로
}

export const HomeCard2: React.FC<HomeCard2Props> = ({
  title,
  subtitle,
  details,
  imageSrc,
  imagePosition,
  textAlignment,
  marginBottom = '0px',
  link,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      // ✅ URL 파라미터 형식으로 수정
      navigate(`/booth-foodtruck/${link}`); 
    }
  };

  return (
    <div
      className="w-full relative overflow-hidden flex items-center justify-between mx-0 cursor-pointer"
      style={{ marginBottom }}
      onClick={handleClick}
    >
      {/* 이미지가 왼쪽에 있는 경우 */}
      {imagePosition === 'left' && imageSrc && (
        <div className="flex-shrink-0 relative">
          <img  
            src={imageSrc} 
            className="w-48 h-[375px] object-contain" 
            alt={title} 
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
              animation: 'floating 4s ease-in-out infinite'
            }}
          />
        </div>
      )}
      
      {/* 텍스트 영역 */}
      <div className={`flex-1 px-4 ${textAlignment === 'right' ? 'text-right pr-10' : 'pl-10'}`}>
        <p className="text-[#009A7C] font-['HS산토끼체_2.0'] text-[25px] not-italic font-normal leading-normal">
          {title}
        </p>
        <p className="text-[#565346] font-hahmlet text-[20px] not-italic font-normal leading-normal">
          {subtitle}
        </p>
        <p className="text-[#565346] font-hahmlet text-[14px] not-italic font-light leading-normal">
          {details}
        </p>
      </div>
      
      {/* 이미지가 오른쪽에 있는 경우 */}
      {imagePosition === 'right' && imageSrc && (
        <div className="flex-shrink-0 relative">
          <img 
            src={imageSrc} 
            className="w-48 h-[375px] object-contain" 
            alt={title} 
            style={{
              maskImage: 'linear-gradient(to left, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 30%, black 100%)',
              animation: 'floating 4s ease-in-out infinite'
            }}
          />
        </div>
      )}
    </div>
  );
};
