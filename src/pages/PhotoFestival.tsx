import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import api from "../utils/api";

interface PhotoPost {
  id: number;
  username: string;
  uploadTime: string;
  likes: number;
  image: string;
  caption: string;
  height: number;
}

interface PhotoCardProps {
  post: PhotoPost;
  isVisible: boolean;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  showDeleteMenu: number | null;
  onToggleDeleteMenu: (id: number) => void;
}

const PhotoCard = memo<PhotoCardProps>(({
  post,
  isVisible,
  onLike,
  onDelete,
  showDeleteMenu,
  onToggleDeleteMenu
}) => {
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const handleToggleMenu = () => {
    if (showDeleteMenu === post.id) {
      setIsMenuAnimating(true);
      setTimeout(() => {
        onToggleDeleteMenu(post.id);
        setShouldShowMenu(false);
        setIsMenuAnimating(false);
      }, 200);
    } else {
      setShouldShowMenu(true);
      onToggleDeleteMenu(post.id);
    }
  };

  useEffect(() => {
    if (showDeleteMenu === post.id && shouldShowMenu) {
      const timer = setTimeout(() => setIsMenuAnimating(false), 10);
      return () => clearTimeout(timer);
    }
  }, [showDeleteMenu, post.id, shouldShowMenu]);

  return (
    <div
      className={`mb-4 bg-white/60 rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="p-3 pb-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {post.username.charAt(0)}
          </div>
          <div className="ml-2">
            <p className="text-[13px] font-semibold text-gray-800">{post.username}</p>
            <p className="text-[10px] text-gray-500">{post.uploadTime}</p>
          </div>
        </div>
        <div className="relative -mr-1">
          <button
            data-menu-button
            onClick={handleToggleMenu}
            className={`p-1 transition-colors ${
              showDeleteMenu === post.id ? 'text-gray-600 bg-gray-100 rounded-full' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          {showDeleteMenu === post.id && (
            <div
              data-delete-menu
              className={`absolute -right-2 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-2 px-3 z-10 min-w-[80px] transition-all duration-200 ease-out ${
                isMenuAnimating ? 'opacity-0 translate-y-[-8px] scale-95' : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              <button
                onClick={() => onDelete(post.id)}
                className="w-full text-center text-red-600 hover:bg-red-50 text-sm font-medium py-1 px-2 rounded transition-colors"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative aspect-[3/4]">
        <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
        <button
          onClick={() => onLike(post.id)}
          className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 flex items-center space-x-1 text-white hover:bg-black/70 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="text-xs font-medium">{post.likes}</span>
        </button>
      </div>

      <div className="p-3 pt-2">
        <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">{post.caption}</p>
      </div>
    </div>
  );
});

const fetchPhotos = async () => {
  const res = await api.get("/api/photo"); // interceptors가 자동으로 토큰 붙여줌
  return res.data;
};

const PhotoFestival: React.FC = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isUploadButtonVisible, setIsUploadButtonVisible] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<PhotoPost[]>([]);

  // API 호출
    useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos(); // axios로 데이터 받음

        if (data.code === 0) {
          const mappedPosts: PhotoPost[] = data.data.map((item: any) => ({
            id: item.id,
            username: item.nickname,
            uploadTime: new Date(item.createdAt).toLocaleString(),
            likes: item.likeCount,
            image: item.imgUrl,
            caption: item.content,
            height: 200 + Math.floor(Math.random() * 200),
          }));
          setPosts(mappedPosts);
        } else {
          console.error("사진 조회 실패:", data.message);
        }
      } catch (error) {
        console.error("사진 API 호출 에러:", error);
      }
    };

    loadPhotos();
  }, []);

  // 페이지 로드 애니메이션
  useEffect(() => {
    window.scrollTo(0, 0);
    setVisibleCards(new Set());
    setIsDescriptionVisible(false);
    setIsUploadButtonVisible(false);
    setShowDeleteMenu(null);

    const descriptionTimer = setTimeout(() => setIsDescriptionVisible(true), 200);

    const cardsTimer = setTimeout(() => {
      posts.forEach((post, index) => {
        setTimeout(() => setVisibleCards(prev => new Set([...prev, post.id])), index * 150);
      });
    }, 600);

    const uploadButtonTimer = setTimeout(() => setIsUploadButtonVisible(true), 1200);

    return () => {
      clearTimeout(descriptionTimer);
      clearTimeout(cardsTimer);
      clearTimeout(uploadButtonTimer);
    };
  }, [posts]);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDeleteMenu !== null) {
        const target = event.target as HTMLElement;
        const isMenuButton = target.closest('[data-menu-button]');
        const isMenu = target.closest('[data-delete-menu]');
        if (!isMenuButton && !isMenu) setShowDeleteMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDeleteMenu]);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

 const handleLike = useCallback(async (id: number) => {
  try {
    const res = await api.post(`/api/photo/like/${id}`);

    setPosts(prevPosts => prevPosts.map(p => {
      if (p.id !== id) return p;

      // 서버 메시지에 따라 좋아요 수 변경
      if (res.data.message.includes("정상적으로 처리")) {
        return { ...p, likes: p.likes + 1 };
      } else if (res.data.message.includes("취소되었습니다")) {
        return { ...p, likes: p.likes - 1 };
      }
      return p;
    }));

    console.log(res.data.message);

  } catch (err: any) {
    console.error("좋아요 API 에러:", err);
  }
}, []);


  const handleDelete = useCallback(async (id: number) => {
  try {
    const res = await api.delete(`/api/photo/${id}`);
    if (res.data?.code === 0) {
      // 삭제 성공 시 로컬 상태에서도 제거
      setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
      setShowDeleteMenu(null);
      alert(res.data.message || '삭제되었습니다.');
    } else {
      alert(res.data?.message || '삭제 실패');
    }
  } catch (err: any) {
    console.error('삭제 API 오류:', err);
    if (err.response?.status === 401) {
      alert('유효하지 않은 토큰입니다. 다시 로그인 해주세요.');
    } else if (err.response?.status === 404) {
      alert('삭제할 게시글을 찾을 수 없습니다.');
    } else {
      alert('삭제 중 오류가 발생했습니다.');
    }
  }
}, []);


  const toggleDeleteMenu = useCallback((id: number) => {
    setShowDeleteMenu(prev => (prev === id ? null : id));
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Description */}
      <div className={`px-4 py-4 text-center flex-shrink-0 transition-all duration-800 ease-out ${
        isDescriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <p className="text-sm text-gray-700 leading-relaxed">
          맘에 드는 사진을 두 번 터치하여 <br />
          <span className="text-[#76A1EA] text-lg font-semibold">백령대동제의 베스트 사진</span>을 투표해주세요!
        </p>
      </div>

      {/* Masonry Layout */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 pb-20">
        <Masonry
          breakpointCols={2}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {posts.map(post => (
            <PhotoCard
              key={post.id}
              post={post}
              isVisible={visibleCards.has(post.id)}
              onLike={handleLike}
              onDelete={handleDelete}
              showDeleteMenu={showDeleteMenu}
              onToggleDeleteMenu={toggleDeleteMenu}
            />
          ))}
        </Masonry>
      </div>

      {/* Upload Button */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-[80%] max-w-[344px] transition-all duration-700 ease-out ${
        isUploadButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <button
          onClick={() => navigate('/photo-upload')}
          className="w-full bg-white/80 rounded-3xl px-6 py-4 shadow-2xl flex items-center justify-center space-x-3 hover:shadow-3xl transition-all duration-300"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className="text-gray-700 font-semibold">사진 업로드하기</span>
        </button>
      </div>

      {/* ScrollTop Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-25 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default PhotoFestival;
