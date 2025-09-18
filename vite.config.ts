// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
import { VitePluginRadar } from 'vite-plugin-radar'


// Vite는 dotenv 자동 로딩
const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePluginRadar({
      // Google Analytics 태그 삽입
      analytics: {
        id: ga4Id as string,
      },
    })
  ],
  server: {
    host: true,   
  },
})
