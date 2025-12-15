"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/providers/auth-provider";

// --- Mock Initial Cart Data ---
const INITIAL_CART = [
  {
    id: 101,
    name: "แหวนเพชรบ่าข้าง 1.2 กะรัต",
    price: 285000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1649651860000-b847e2cb5386?w=400&h=400&fit=crop",
    customization: {
      shape: "ทรงไข่",
      metal: "ทองคำ 18K",
      size: "53",
    },
  },
  {
    id: 202,
    name: "ต่างหูห้อยเพชร 1.0 กะรัต",
    price: 185000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?w=400&h=400&fit=crop",
  },
];

export default function CartPage() {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // --- Calculations ---
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // --- Handlers ---
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Render: Not Logged In ---
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          เพื่อดูรายการสินค้าในตะกร้าของคุณ กรุณาเข้าสู่ระบบบัญชีสมาชิก
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

  // --- Render: Empty Cart ---
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold mb-4">ตะกร้าสินค้าว่างเปล่า</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          คุณยังไม่มีสินค้าในตะกร้า เริ่มเลือกซื้อเพชรและเครื่องประดับที่คุณถูกใจกันเลย
        </p>
        <Button asChild className="bg-black hover:bg-gray-800 px-8">
          <Link href="/jewelry">เลือกซื้อสินค้า</Link>
        </Button>
      </div>
    );
  }

  // --- Render: Cart Content ---
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        ตะกร้าสินค้า <span className="text-lg font-normal text-gray-500">({cartItems.length} รายการ)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="w-full sm:w-40 h-40 bg-gray-50 relative shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <div className="text-sm text-gray-500 space-y-1">
                          {item.customization?.shape && <p>ทรง: {item.customization.shape}</p>}
                          {item.customization?.metal && <p>โลหะ: {item.customization.metal}</p>}
                          {item.customization?.size && <p>ไซส์: {item.customization.size}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="ลบสินค้า"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      {/* Quantity Input */}
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 text-gray-500"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-lg">฿{(item.price * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            ฿{item.price.toLocaleString()} / ชิ้น
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-gray-100 shadow-md">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-6">สรุปคำสั่งซื้อ</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>ราคาสินค้า</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600 font-medium">ฟรี</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">รวมทั้งหมด</span>
                  <span className="font-bold text-2xl text-black">฿{total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 text-right">(รวมภาษีมูลค่าเพิ่มแล้ว)</p>
              </div>

              <Button asChild className="w-full bg-black hover:bg-gray-800 text-white h-12 text-lg shadow-lg">
                <Link href="/checkout">
                  ดำเนินการชำระเงิน <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <div className="mt-4 text-center">
                <Link href="/jewelry" className="text-sm text-gray-500 hover:text-black underline-offset-4 hover:underline">
                  เลือกซื้อสินค้าเพิ่ม
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}