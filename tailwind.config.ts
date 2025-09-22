import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'ise': '376px', // iPhone SE (376px) 초과
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      height: {
        'screen-dynamic': '100dvh', // 동적 뷰포트 높이
        'screen-safe': '100svh', // 안전한 뷰포트 높이
        'screen-fallback': 'calc(var(--vh, 1vh) * 100)', // JavaScript 폴백
        'screen-hybrid': '100dvh', // 하이브리드 높이 (932px 제한)
      },
      minHeight: {
        'screen-dynamic': '100dvh',
        'screen-safe': '100svh',
        'screen-fallback': 'calc(var(--vh, 1vh) * 100)',
        'screen-hybrid': '100dvh',
      },
      maxHeight: {
        'screen-dynamic': '100dvh',
        'screen-safe': '100svh',
        'screen-fallback': 'calc(var(--vh, 1vh) * 100)',
        'screen-hybrid': '932px', // 932px 제한
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"], // FAQItem 전용
        hssantokki: ["HS산토끼체", "HS-Santokki"],
        ownglyph: ["Ownglyph-PDH", "sans-serif"],
        school: ["school", "HakgyoansimJeomsimsiganB"],
        mbc1961: ["mbc1961", "mbc1961"],
      },
      blur: {
        custom: "12.65px",
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;
