// utils/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  accessToken: string | null;
  nickname: string | null;
  setAuth: (token: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  nickname: null,
  setAuth: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  // 초기 로딩 시 sessionStorage에서 불러오기
  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");
    const storedName = sessionStorage.getItem("nickname");
    if (storedToken) setToken(storedToken);
    if (storedName) setNickname(storedName);
  }, []);

  const setAuth = (token: string, name?: string) => {
    setToken(token);
    setNickname(name || null);
    sessionStorage.setItem("accessToken", token);
    if (name) sessionStorage.setItem("nickname", name);
  };

  const logout = () => {
    setToken(null);
    setNickname(null);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("nickname");
  };

  return (
    <AuthContext.Provider value={{ accessToken, nickname, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
