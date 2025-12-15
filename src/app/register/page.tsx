"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    lineId: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!formData.acceptTerms) {
      toast.error('กรุณายอมรับเงื่อนไขการให้บริการ');
      return;
    }

    setIsLoading(true);

    // จำลองการสมัครสมาชิก (Mock API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
    
    // ส่งไปหน้า Login หลังจากสมัครเสร็จ
    router.push('/login');
    
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex">
      {/* --- Left Side: Image (Hidden on Mobile) --- */}
      <div className="hidden lg:block lg:w-1/2 relative bg-black">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop" 
          alt="Jewelry Making Process"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">เริ่มต้นความเลอค่า</h2>
          <p className="text-lg opacity-80 max-w-md font-light leading-relaxed">
            สมัครสมาชิกวันนี้เพื่อรับข่าวสารคอลเลคชั่นใหม่ <br />
            และติดตามสถานะคำสั่งซื้อของคุณได้ตลอด 24 ชม.
          </p>
        </div>
      </div>

      {/* --- Right Side: Register Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        {/* Decorative Element */}
        <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">สร้างบัญชีผู้ใช้</h1>
            <p className="text-gray-500">
              กรอกข้อมูลเพื่อสมัครสมาชิก Nudee Lucky Gems & Jewelry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder=""
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder=""
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
            </div>

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

            <div className="space-y-2">
                <Label htmlFor="lineId">ไอดีไลน์</Label>
                    <Input
                        id="lineId"
                        name="lineId"
                        placeholder=""
                        value={formData.lineId}
                        onChange={handleChange}
                        className="h-12"
                        />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <div className="relative">
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                }
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ฉันยอมรับ <Link href="/terms" className="underline hover:text-black">เงื่อนไขการให้บริการ</Link> และ <Link href="/privacy" className="underline hover:text-black">นโยบายความเป็นส่วนตัว</Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-black hover:bg-gray-800 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  กำลังสร้างบัญชี...
                </>
              ) : (
                'สมัครสมาชิก'
              )}
            </Button>
          </form>

          <div className="text-center mt-8 text-sm">
            <span className="text-gray-500">มีบัญชีอยู่แล้ว? </span>
            <Link
              href="/login"
              className="font-semibold text-black hover:text-accent-foreground underline-offset-4 hover:underline"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}