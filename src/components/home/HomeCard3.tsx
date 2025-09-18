import React from 'react';

interface HomeCard3Props {
  mainImgSrc: string;   // 메인 이미지 (텍스트 포함)
}

export const HomeCard3: React.FC<HomeCard3Props> = ({
  mainImgSrc
}) => {

  return (
    <div className="w-full max-w-[340px] min-w-[280px] mx-auto px-4">
      <img
        src={mainImgSrc}
        alt=""
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};
