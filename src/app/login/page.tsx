"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers/auth-provider';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {login} = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // จำลองการส่งข้อมูลไปเช็คกับ Server
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (formData.email && formData.password) {
      // Login สำเร็จ (ในอนาคตต้องเก็บ Token เข้า Cookies/Storage)
      login();
      
      toast.success('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับมาค่ะ');
      
      // Redirect ไปหน้าแรก หรือหน้า Account
      router.push('/'); 
    } else {
      toast.error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex">
      <div className="hidden lg:block lg:w-1/2 relative bg-black">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Jewelry Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Nudee Lucky Gems</h2>
          <p className="text-lg opacity-80 max-w-md font-light leading-relaxed">
            สัมผัสความงามอันเลอค่า ที่คัดสรรมาเพื่อคุณโดยเฉพาะ <br />
            เครื่องประดับเพชรแท้ ดีไซน์ระดับเวิลด์คลาส
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">ยินดีต้อนรับกลับมา</h1>
            <p className="text-gray-500">
              กรุณาเข้าสู่ระบบเพื่อจัดการบัญชีและติดตามคำสั่งซื้อ
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
                
                <div className="relative">
                  <div className="space-y-2">
                  <Label htmlFor="password">รหัสผ่าน</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/12 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                </div>
                <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-gray-500 hover:text-black underline-offset-4 hover:underline"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-black hover:bg-gray-800 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </Button>

            {/* Social Login (Mock) */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">หรือเข้าสู่ระบบด้วย</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" type="button" 
                className="h-11 w-112 hover:bg-black hover:text-white transition">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Google
              </Button>
             </div>
        </form>

          <div className="text-center mt-8 text-sm">
            <span className="text-gray-500">ยังไม่มีบัญชีสมาชิก? </span>
            <Link
              href="/register"
              className="font-semibold text-black hover:text-accent-foreground underline-offset-4 hover:underline"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}