import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistModel } from './ArtistModel';

const Artist: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const artist = ArtistModel[number || "1"]; // 기본 1번 아티스트

  if (!artist) return <div>아티스트 정보를 찾을 수 없습니다.</div>;
  
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className='min-h-screen'>


<div
  className="
    mt-20 
    mx-auto 
    w-[90%] max-w-[400px] 
    sm:w-[90%] md:w-[354px] 
    aspect-[354/711] 
    flex flex-col 
    rounded-[17px] 
    bg-[linear-gradient(0deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.6)_100%),rgba(69,130,68,0.17)] 
    shadow-[0_0_19.4px_7px_rgba(255,255,255,0.26)_inset,-1px_3px_13.1px_-4px_rgba(56,63,41,0.67)]
    p-4
    
  "
>
    <div className=" w-full flex justify-center px-4 ">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
        {/* 메인 이미지 */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={artist.mainImg}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 이름/서브텍스트 */}
        <div className="w-full flex items-center gap-2 relative">
          <div className="flex flex-col items-center flex h-16 justify-end w-3/4 bg-white rounded-full p-3 relative">
            <p className="text-[#012500] font-hahmlet text-lg font-semibold">{artist.name}</p>
            <p className="text-[#012D00] font-hahmlet text-sm font-normal">{artist.subText}</p>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                padding: '1px',
                background: 'linear-gradient(to right, #012D00 0%, #A3BD5FBD 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />
          </div>
          <div className="flex justify-center items-center h-16 w-1/4 bg-white/60 p-3 rounded-full">
            <p className="text-[#285100] font-pretendard font-bold text-base text-center">✨🎶</p>
          </div>
        </div>

        {/* 아티스트 소개 */}
        <p className="text-[#285100] font-hahmlet font-bold text-base text-center mt-4">아티스트 소개</p>
        <div className="w-5/6 h-[2px] bg-white/70 rounded-full" />

        <p className="w-5/6 text-[#586552] font-pretendard text-sm text-justify line-clamp-3 mt-2">
          {artist.intro}
        </p>

        {/* 주요 곡 */}
        <p className="text-[#285100] font-hahmlet font-bold text-base text-center mt-4">아티스트 주요 곡</p>
        <div className="w-5/6 h-[2px] bg-white/70 rounded-full" />

        {/* extraInfo 카드 */}
<div className="w-full flex flex-wrap justify-between gap-3 mt-4">
  {artist.extraInfo.map((item: any, idx: number) => (
    <div
      key={idx}
      className="flex-1 min-w-[30%] max-w-[32%] aspect-[4/5] flex flex-col items-center rounded-lg overflow-hidden"
      style={{
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.6) 0%, rgba(69,130,68,0.17) 100%)",
        boxShadow: "0 0 21px 7px rgba(255,255,255,0.26) inset, -1px 3px 14px -4px rgba(56,63,41,0.67)"
      }}
    >
      {/* 곡 이미지 */}
      <div className="w-3/4 h-2/3 bg-white rounded-t-lg mt-2 overflow-hidden">
        {item.img && (
          <img 
            src={item.img} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 곡 이름 */}
      <p className="truncate text-[#285100] font-Pretendard text-sm font-normal text-center mt-1">
        {item.title}
      </p>

      {/* 발매년도 */}
      <p className="truncate text-[#4E5B2C] font-Pretendard text-xs font-light text-center">
        {item.desc}
      </p>
    </div>
  ))}
</div>
      </div>
    </div>
        </div>
    </div>
  );
};

export default Artist;
