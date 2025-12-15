"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  cartCount: number; // แถมให้: จัดการจำนวนตะกร้าตรงนี้ได้ด้วย
  favoritesCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // เริ่มต้นเป็น false (ยังไม่ล็อกอิน)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock Data จำนวนสินค้า
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const login = () => {
    setIsLoggedIn(true);
    // พอ Login ปุ๊บ สมมติว่ามีของในตะกร้าเลย
    setCartCount(2);
    setFavoritesCount(4);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCartCount(0);
    setFavoritesCount(0);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, cartCount, favoritesCount }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook สำหรับเรียกใช้ในหน้าอื่น
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}