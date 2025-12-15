"use client";

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { diamonds, allJewelry } from '@/lib/mock-data';
import { useAuth } from '@/components/providers/auth-provider'; // ดึง Context มาใช้

export default function FavoritesPage() {
  const { isLoggedIn, favoritesCount } = useAuth(); // ใช้ Context แทน Props

  // รวมสินค้าทั้งหมดเพื่อค้นหา
  const allProducts = [...allJewelry, ...diamonds];

  // สมมติ: รายการ ID ที่ User กด Favorite ไว้ (Mock)
  // ในความจริงต้องดึงจาก Database ของ User
  const mockFavoriteIds = [101, 103, 201, 1]; // แหวน 2, ต่างหู 1, เพชร 1

  // กรองสินค้าเฉพาะที่มี ID ตรงกับ Favorites
  const favoriteProducts = allProducts.filter((product) => 
    mockFavoriteIds.includes(product.id)
  ).map((product) => {
    // เช็คว่าเป็นเพชรหรือเครื่องประดับ เพื่อสร้าง description และ link ที่ถูกต้อง
    const isDiamond = 'carat' in product;
    return {
      ...product,
      type: isDiamond ? 'diamond' : 'jewelry',
      href: isDiamond ? `/diamond/${product.id}` : `/product/${product.id}`,
      description: isDiamond 
        ? `${(product as any).carat} กะรัต | ${(product as any).color} | ${(product as any).clarity}`
        : `${(product as any).metal} ${(product as any).purity}`,
    };
  });

  // --- กรณีไม่ได้ Login ---
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          เพื่อดูรายการโปรดของคุณ กรุณาเข้าสู่ระบบบัญชีสมาชิก หรือสมัครสมาชิกใหม่
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">เข้าสู่ระบบ</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">สมัครสมาชิก</Link>
          </Button>
        </div>
      </div>
    );
  }

  // --- กรณีไม่มีสินค้าใน Favorites ---
  if (favoriteProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <Heart className="w-24 h-24 mx-auto mb-6 text-gray-200" />
        <h2 className="text-2xl font-bold mb-4">ยังไม่มีรายการโปรด</h2>
        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
          คุณยังไม่ได้เพิ่มสินค้าในรายการโปรด กดไอคอนหัวใจที่สินค้าเพื่อบันทึกรายการที่คุณสนใจ
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-black hover:bg-gray-800">
            <Link href="/jewelry">เลือกซื้อเครื่องประดับ</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/diamond-prices">ดูราคาเพชร</Link>
          </Button>
        </div>
      </div>
    );
  }

  // --- แสดงรายการ Favorites ---
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">รายการโปรดของฉัน</h1>
        <p className="text-gray-500">{favoriteProducts.length} รายการ</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
          <Link href={product.href} key={product.id} className="group">
            <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // ในที่นี้เราไม่ได้ทำฟังก์ชันลบจริง เพราะเป็น Mock Data
                    // แต่ UI ควรมีปุ่มให้กด
                    alert('ลบออกจากรายการโปรด (Mock Action)');
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-red-50 text-red-500 shadow-sm transition-colors"
                  title="ลบออกจากรายการโปรด"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                {/* Add to Cart Button (Optional) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('เพิ่มลงตะกร้า (Mock Action)');
                  }}
                  className="absolute bottom-3 right-3 p-3 bg-black text-white rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-accent hover:text-black"
                  title="เพิ่มลงตะกร้า"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-1 text-xs text-gray-400 uppercase tracking-wider">
                  {product.type === 'diamond' ? 'Diamond' : 'Jewelry'}
                </div>
                <h4 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-accent-foreground transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500 mb-3 line-clamp-1">{product.description}</p>
                <p className="font-bold text-lg">฿{product.price.toLocaleString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}