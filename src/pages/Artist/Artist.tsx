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
    <div className="min-h-screen flex justify-center items-center">
<div
  className="
    mx-auto 
    w-[90%] max-w-[400px] 
    sm:w-[90%] md:w-[354px] 
    justify-center items-center
    flex flex-col 
    rounded-[17px]
    shadow-[0_0_19.4px_7px_rgba(255,255,255,0.26)_inset,-1px_3px_13.1px_-4px_rgba(56,63,41,0.67)]
  "
  style={{
    background: "linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 100%), rgba(69,130,68,0.05)"
  }}
>
  

    <div className=" w-full flex justify-center">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-1">
        {/* 메인 이미지 */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden"
        style={{ width: artist.imgWidth, height: artist.imgHeight }}>
          <img
            src={artist.mainImg}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 이름/서브텍스트 */}
        <div className="w-full flex items-center gap-1 px-6 relative items-stretch">
          <div className="flex flex-col items-center justify-center w-8/11 bg-white rounded-full  relative min-h-[50px]">
            <p
            className={`text-[#012500] font-hahmlet font-semibold leading-[28px] ${
              artist.name.length > 12 ? "text-[20px]" : "text-[25px]"
            }`}
          >{artist.name}</p>
          <p className="text-gray-500 font-hahmlet text-[10px] font-normal leading-[14px]">{artist.subText}</p>

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
          <div className="flex justify-center items-center w-3/11 bg-white/60 rounded-full min-h-[50px]">
            <p className="text-[#285100] font-pretendard font-bold text-base text-center">{artist.performanceDate}</p>
          </div>
        </div>

        {/* 아티스트 소개 */}
        <p className="mt-4 text-[#285100] font-hahmlet font-bold text-base ">아티스트 소개</p>
      
        <div className="w-5/6 h-[2px] bg-white/70 rounded-full mt-1" />
          <div className='w-full flex text-center items-center'>
              <p className="mx-auto w-5/6 text-[#586552] mt-1 font-pretendard text-[10px] text-justify line-clamp-9 ">
          {artist.intro}
        </p>
          </div>
      

        {/* 주요 곡 */}
        <p className="text-[#285100] font-hahmlet font-bold text-base text-center mt-4 ">아티스트 주요 곡</p>
        <div className="w-5/6 h-[2px] bg-white/70 rounded-full" />

        {/* extraInfo 카드 */}
<div className="w-full flex flex-wrap justify-between px-4 gap-3 mt-4 mb-4">
  {artist.extraInfo.map((item: any, idx: number) => (
    <a
      key={idx}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 min-w-[30%] max-w-[32%] aspect-[4/5] flex flex-col items-center rounded-lg overflow-hidden transition-transform hover:scale-105"
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
      <p className="truncate text-[#285100] font-Pretendard text-center mt-1 text-[10px]">
        {item.title}
      </p>

      {/* 발매년도 */}
      <p className="truncate text-[#4E5B2C] font-Pretendard text-[10px] font-light text-center">
        {item.desc}
      </p>
    </a>
  ))}
</div>

      </div>
    </div>
        </div>
    </div>
  );
};

export default Artist;
