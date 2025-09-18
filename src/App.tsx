import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "./components/Header";
import MenuModal from "./components/MenuModal"; // ✅ 메뉴 모달 import
import LoginModal from "./components/LoginModal"; // ✅ 로그인 모달 import

import Home from "./pages/Home";
import BoothRecommendLoading from "./pages/BoothRecommend/BoothRecommendLoading";
import BoothRecommend from "./pages/BoothRecommend/BoothRecommend";
import BoothAndFoodTruck from "./pages/BoothAndFoodTruck";
import PhotoFestival from "./pages/PhotoFestival";
import Timetable from "./pages/Timetable";
import FAQAndGuestbook from "./pages/FAQAndGuestbook";
import GuestbookWrite from "./pages/GuestbookWrite";
import BoothRecommendResult from "./pages/BoothRecommend/BoothRecommendResult";
import Artist from "./pages/Artist/Artist";
import PhotoUpload from "./pages/PhotoUpload";
import LoginCallback from "./components/LoginCallback";
import { AuthProvider } from "./utils/AuthContext";

function AppContent() {
  //const location = useLocation();
  //const isHome = location.pathname === '/';

  // ✅ 상태 관리
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex justify-center">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div
        className="w-full sm:max-w-[402px] shadow-lg relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/home/BGimg/BackImg1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* ✅ Header: 버튼 참조 + 메뉴 열기 핸들러 전달 */}
        <Header buttonRef={buttonRef} onMenuClick={() => setMenuOpen(true)} />

        {/* ✅ 메뉴 모달 */}
        <MenuModal
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onLoginClick={() => setLoginOpen(true)}
        />


        {/* ✅ 로그인 모달 */}
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="boothRecommendLoading"
              element={<BoothRecommendLoading />}
            />
            <Route path="/booth-recommend" element={<BoothRecommend />} />
            <Route
              path="/BoothRecommendResult"
              element={<BoothRecommendResult />}
            />
            <Route
              path="/booth-foodtruck/:number"
              element={<BoothAndFoodTruck />}
            />
            <Route path="/photo-festival" element={<PhotoFestival />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/faq" element={<FAQAndGuestbook />} />
            <Route path="/guestbook/write" element={<GuestbookWrite />} />
            <Route path="/guestbook" element={<FAQAndGuestbook />} />
            <Route path="/artist/:number" element={<Artist />} />
            <Route path="/photo-upload" element={<PhotoUpload />} />

            <Route path="/login" element={<LoginCallback />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
