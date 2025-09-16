import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
