"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, LogOut } from 'lucide-react'; // เพิ่ม LogOut
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/components/ui/utils';
import { useAuth } from '@/components/providers/auth-provider'; // <-- เรียกใช้

// ลบ Interface Props ทิ้งได้เลย เพราะเราดึงจาก Context แทน
export function Navbar() {
  const { isLoggedIn, cartCount, favoritesCount, logout } = useAuth(); // <-- ดึงค่ามาใช้
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/diamond-prices', label: 'ราคาเพชร' },
    { href: '/jewelry/rings', label: 'เครื่องประดับ' },
    { href: '/learn', label: 'เรียนรู้เรื่องเพชร' },
    { href: '/appraisal', label: 'ประเมินราคา' },
    { href: '/contact', label: 'ติดต่อเรา' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl text-accent group-hover:scale-110 transition-transform">💎</div>
            <div>
              <div className="font-medium text-lg text-black leading-tight">Nudee Lucky</div>
              <div className="text-xs text-accent-foreground/60">Gems & Jewelry</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black",
                  isActive(link.href) ? "text-black" : "text-gray-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons Action Area */}
          <div className="flex items-center gap-4">
            <button className="hover:opacity-70 transition-opacity hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Logic: ถ้า Login แล้วไป Favorites, ถ้ายัง ให้ไป Login */}
            <Link href={isLoggedIn ? "/favorites" : "/login"} className="relative hover:opacity-70 transition-opacity hidden md:block">
              <Heart className="w-5 h-5" />
              {isLoggedIn && favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link href={isLoggedIn ? "/cart" : "/login"} className="relative hover:opacity-70 transition-opacity">
              <ShoppingBag className="w-5 h-5" />
              {isLoggedIn && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Icon: ถ้า Login แล้วไป Account, ถ้ายังไป Login */}
            <Link href={isLoggedIn ? "/account" : "/login"} className="hover:opacity-70 transition-opacity">
              <User className="w-5 h-5" />
            </Link>

            {/* (แถม) ปุ่ม Logout เล็กๆ ถ้าล็อกอินอยู่ */}
            {isLoggedIn && (
               <button onClick={logout} className="hover:opacity-70 text-red-500 hidden md:block" title="ออกจากระบบ">
                 <LogOut className="w-5 h-5" />
               </button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button>
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium",
                        isActive(link.href) ? "text-black" : "text-gray-500"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="border-gray-100" />
                  {isLoggedIn ? (
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 text-left font-medium">
                      ออกจากระบบ
                    </button>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-black font-medium">
                      เข้าสู่ระบบ
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}