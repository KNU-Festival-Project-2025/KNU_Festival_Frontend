import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setAccessToken } from '../utils/auth';

const PhotoUpload: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');

  // 순차적 필드 표시 상태
  const [showImageSelect, setShowImageSelect] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  // 페이지 로드 시 첫 번째 필드 표시
  useEffect(() => {
    const timer = setTimeout(() => setShowImageSelect(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 이미지 선택 완료 시 내용 입력 표시
  useEffect(() => {
    if (selectedImage) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [selectedImage]);

  // 내용 입력 완료 시 제출 버튼 표시
  useEffect(() => {
    if (content.trim().length > 0) {
      const timer = setTimeout(() => setShowSubmit(true), 200);
      return () => clearTimeout(timer);
    }
  }, [content]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async () => {
  if (!selectedImage) {
    alert('사진을 선택해주세요.');
    return;
  }
  if (!content.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
    const formData = new FormData();

    // 파일
    formData.append('file', selectedImage);

    // JSON 요청을 Blob으로 만들어 multipart 안에 추가
    const jsonBlob = new Blob([JSON.stringify({ content })], { type: 'application/json' });
    formData.append('request', jsonBlob);

    // axios에서 Content-Type 제거 → 브라우저가 boundary 포함 multipart/form-data 자동 설정
    const response = await api.post('/api/photo', formData);

    // accessToken 갱신
    const newAccessToken = response.headers['accesstoken'];
    if (newAccessToken) setAccessToken(newAccessToken);

    if (response.status === 200 && response.data?.code === 0) {
      alert(response.data.message || '사진 업로드 성공!');
      navigate('/photo-festival');
    } else {
      alert(response.data?.message || '업로드 실패');
    }
  } catch (err: any) {
    console.error('사진 업로드 오류:', err);
    if (err.response?.status === 401) {
      alert('유효하지 않은 토큰입니다. 로그인 후 다시 시도해주세요.');
    } else {
      alert('사진 업로드 중 오류가 발생했습니다.');
    }
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 pt-20 px-6 pb-8">
        {/* 이미지 선택 */}
        <div className={`mb-6 transition-all duration-700 ease-out ${
          showImageSelect ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <label className="block text-green-800 font-semibold mb-2 text-sm">사진 선택</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full px-4 py-3 bg-white/80 rounded-2xl text-gray-700 cursor-pointer hover:bg-white/80 focus-within:ring-2 focus-within:ring-green-400 transition-all duration-300 text-sm flex items-center justify-center">
              {imagePreview ? (
                <div className="flex items-center space-x-3">
                  <img src={imagePreview} alt="미리보기" className="w-12 h-12 object-cover rounded-lg" />
                  <span className="text-green-600">사진이 선택되었습니다</span>
                </div>
              ) : (
                <span className="text-gray-500">사진 선택하기</span>
              )}
            </div>
          </div>
        </div>

        {/* 내용 입력 */}
        <div className={`mb-8 transition-all duration-700 ease-out ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <label className="block text-green-800 font-semibold mb-2 text-sm">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="사진에 대한 설명을 50자 이내로 입력해주세요"
            rows={4}
            maxLength={50}
            className="w-full px-4 py-3 bg-white/60 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 resize-none text-sm"
          />
        </div>

        {/* 등록 버튼 */}
        <div className={`transition-all duration-700 ease-out ${
          showSubmit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-white/80 rounded-2xl text-green-800 font-semibold hover:bg-green-200 transition-colors text-sm"
          >
            사진 업로드
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
