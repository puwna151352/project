"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { Upload, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { toast } from 'sonner';

// --- Constants ---
const JEWELRY_TYPES = [
  { value: 'ring', label: 'แหวน' },
  { value: 'earring', label: 'ต่างหู' },
  { value: 'necklace', label: 'สร้อยคอ' },
  { value: 'bracelet', label: 'สร้อยข้อมือ' },
  { value: 'pendant', label: 'จี้' },
  { value: 'diamond', label: 'เพชรเปล่า' },
];

const SHAPES = [
  { value: 'round', label: 'ทรงกลม' },
  { value: 'oval', label: 'ทรงไข่' },
  { value: 'pear', label: 'ทรงหยดน้ำ' },
  { value: 'emerald', label: 'ทรงเอเมอรัลด์' },
  { value: 'princess', label: 'ทรงพรินเซส' },
  { value: 'marquise', label: 'ทรงมาร์คีส์' },
  { value: 'radiant', label: 'ทรงเรเดียนท์' },
  { value: 'cushion', label: 'ทรงคุชชั่น' },
];

// สินค้าแนะนำ
const RECOMMENDED_PRODUCTS = [
  {
    id: 101,
    name: 'แหวนเพชรเม็ดเดี่ยว 1.5 กะรัต',
    price: 325000,
    image: 'https://images.unsplash.com/photo-1748023593753-4949fdc19045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'D Color, VVS1, Excellent Cut',
  },
  {
    id: 102,
    name: 'แหวนเพชรบ่าข้าง 1.2 กะรัต',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1649651860000-b847e2cb5386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'E Color, VS1, Very Good Cut',
  },
  {
    id: 103,
    name: 'แหวนเพชรล้อม 1.0 กะรัต',
    price: 265000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'F Color, VS2, Excellent Cut',
  },
  {
    id: 201,
    name: 'ต่างหูเพชร 0.8 กะรัต',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1590156118368-607652ab307a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'G Color, VS1, Very Good Cut',
  },
];

export default function AppraisalPage() {
  // State (จำลองว่า Login แล้ว)
  const isLoggedIn = true; 
  
  const [images, setImages] = useState<string[]>([]);
  const [jewelryType, setJewelryType] = useState('');
  const [shape, setShape] = useState('');
  const [carat, setCarat] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [appraisalResult, setAppraisalResult] = useState<any>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            if (newImages.length === files.length) {
              setImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const calculateAppraisal = () => {
    const caratValue = parseFloat(carat) || 0;
    let basePrice = 0;

    if (caratValue < 0.5) basePrice = caratValue * 80000;
    else if (caratValue < 1.0) basePrice = caratValue * 150000;
    else if (caratValue < 2.0) basePrice = caratValue * 220000;
    else basePrice = caratValue * 280000;

    const shapeMultiplier: Record<string, number> = {
      round: 1.0, oval: 0.85, pear: 0.8, emerald: 0.75,
      princess: 0.9, marquise: 0.8, radiant: 0.85, cushion: 0.85,
    };

    const multiplier = shapeMultiplier[shape] || 0.8;
    const estimatedPrice = Math.round(basePrice * multiplier);

    return {
      estimatedPrice,
      minPrice: Math.round(estimatedPrice * 0.85),
      maxPrice: Math.round(estimatedPrice * 1.15),
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('กรุณาเข้าสู่ระบบก่อนใช้บริการประเมินราคา');
      // ใน Next.js จริงๆ ควร redirect ไปหน้า login
      return;
    }

    if (images.length === 0) {
      toast.error('กรุณาอัปโหลดรูปภาพอย่างน้อย 1 รูป');
      return;
    }
    if (!jewelryType || !shape || !carat) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const prices = calculateAppraisal();
    const result = {
      id: Date.now(),
      date: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      images,
      jewelryType,
      jewelryTypeName: JEWELRY_TYPES.find((t) => t.value === jewelryType)?.label || jewelryType,
      shape,
      shapeName: SHAPES.find((s) => s.value === shape)?.label || shape,
      carat,
      description,
      ...prices,
      status: 'completed',
    };

    setAppraisalResult(result);
    setSubmitted(true);
    toast.success('ประเมินราคาสำเร็จ!');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setSubmitted(false);
    setAppraisalResult(null);
    setImages([]);
    setJewelryType('');
    setShape('');
    setCarat('');
    setDescription('');
    window.scrollTo(0, 0);
  };

  if (submitted && appraisalResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>ประเมินราคาใหม่</span>
        </button>

        {/* Result Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#FFD4F8' }}
            >
              <Sparkles className="w-10 h-10 text-black" />
            </div>
            <h1 className="mb-4 font-bold text-3xl">ผลการประเมินราคา</h1>
            <p className="opacity-60">
              นี่คือราคาประเมินเบื้องต้นของเครื่องประดับของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Images and Details */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>รายละเอียดเครื่องประดับ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-4">
                    {appraisalResult.images.map((img: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <ImageWithFallback
                          src={img}
                          alt={`รูปที่ ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="opacity-60">ประเภท</span>
                      <span>{appraisalResult.jewelryTypeName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="opacity-60">ทรงเพชร</span>
                      <span>{appraisalResult.shapeName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="opacity-60">น้ำหนัก</span>
                      <span>{appraisalResult.carat} กะรัต</span>
                    </div>
                    {appraisalResult.description && (
                      <div className="py-2">
                        <p className="opacity-60 mb-2">รายละเอียดเพิ่มเติม</p>
                        <p className="text-sm">{appraisalResult.description}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Price */}
            <div>
              <Card className="bg-gradient-to-br from-black to-gray-900 text-white border-none">
                <CardHeader>
                  <CardTitle className="text-white">ราคาประเมิน</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-sm opacity-80 mb-2">ราคาประมาณ</p>
                    <p className="text-5xl mb-2 font-bold" style={{ color: '#FFD4F8' }}>
                      ฿{appraisalResult.estimatedPrice.toLocaleString()}
                    </p>
                    <p className="text-sm opacity-60">
                      (ช่วงราคา: ฿{appraisalResult.minPrice.toLocaleString()} - ฿
                      {appraisalResult.maxPrice.toLocaleString()})
                    </p>
                  </div>

                  <div className="p-4 bg-white/10 rounded-lg">
                    <h4 className="mb-3 text-white font-semibold">หมายเหตุ</h4>
                    <ul className="text-sm space-y-2 opacity-80">
                      <li>• ราคานี้เป็นการประเมินเบื้องต้นจากข้อมูลที่ให้มา</li>
                      <li>• ราคาจริงอาจแตกต่างขึ้นอยู่กับคุณภาพและสภาพจริง</li>
                      <li>• แนะนำให้นำมาตรวจสอบโดยผู้เชี่ยวชาญเพื่อราคาที่แม่นยำ</li>
                      <li>• สามารถนำเครื่องประดับมาขายหรือแลกเปลี่ยนที่ร้านได้</li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-white text-black hover:bg-white/90">
                      <Link href="/contact">ติดต่อเรา</Link>
                    </Button>
                    {/* สมมติว่ามีหน้า Account */}
                    <Button asChild variant="outline" className="flex-1 border-white text-white hover:bg-white/10">
                         <Link href="#">ดูประวัติ</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommended Products */}
          <div>
            <h2 className="mb-6 text-center font-bold text-2xl">สินค้าแนะนำจากร้าน</h2>
            <p className="text-center opacity-60 mb-8">
              คุณอาจสนใจเครื่องประดับเหล่านี้จากคอลเลคชั่นของเรา
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {RECOMMENDED_PRODUCTS.map((product) => (
                <Link href={`/jewelry-detail/${product.id}`} key={product.id}>
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                    <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h4 className="mb-2 font-medium">{product.name}</h4>
                        <p className="text-sm opacity-60 mb-2">{product.description}</p>
                        <p className="text-black font-bold">฿{product.price.toLocaleString()}</p>
                    </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Button onClick={handleReset} size="lg" className="bg-black hover:bg-black/90 text-white">
              ประเมินราคาเครื่องประดับชิ้นอื่น
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-3xl">ประเมินราคา</h1>
          <p className="opacity-60">
            ส่งรูปภาพและรายละเอียดเพชรหรือเครื่องประดับของคุณ เพื่อรับการประเมินราคาฟรี
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ฟอร์มประเมินราคา</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label className="mb-3 block">รูปภาพเพชร/เครื่องประดับ *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8">
                  {images.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={img}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setImages(images.filter((_, i) => i !== index))}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <label htmlFor="image-upload" className="block">
                        <Button type="button" variant="outline" size="sm" asChild>
                          <span className="cursor-pointer">เพิ่มรูปภาพ</span>
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="cursor-pointer block text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">คลิกเพื่ออัปโหลดรูปภาพ</p>
                      <p className="text-sm opacity-60">
                        รองรับไฟล์ JPG, PNG (สามารถเลือกได้หลายรูป)
                      </p>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Jewelry Type */}
              <div className="space-y-2">
                <Label htmlFor="jewelryType">ประเภทเครื่องประดับ *</Label>
                <Select value={jewelryType} onValueChange={setJewelryType} required>
                  <SelectTrigger id="jewelryType">
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    {JEWELRY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Diamond Shape */}
              <div className="space-y-2">
                <Label htmlFor="shape">ทรงเพชร *</Label>
                <Select value={shape} onValueChange={setShape} required>
                  <SelectTrigger id="shape">
                    <SelectValue placeholder="เลือกทรงเพชร" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHAPES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Carat Weight */}
              <div className="space-y-2">
                <Label htmlFor="carat">จำนวนกะรัต (โดยประมาณ) *</Label>
                <Input
                  id="carat"
                  type="number"
                  step="0.01"
                  placeholder="เช่น 1.5"
                  value={carat}
                  onChange={(e) => setCarat(e.target.value)}
                  required
                />
                <p className="text-xs opacity-60">
                  หากไม่แน่ใจเกี่ยวกับน้ำหนัก สามารถใส่ค่าประมาณได้
                </p>
              </div>

               {/* Description - เพิ่ม textarea ให้เหมือนต้นฉบับ (แม้ในโค้ดต้นฉบับจะไม่มี input นี้ใน form แต่มี state มารองรับ) */}
               <div className="space-y-2">
                <Label htmlFor="description">รายละเอียดเพิ่มเติม</Label>
                <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="ระบุรายละเอียดเพิ่มเติม เช่น มีใบเซอร์ ตำหนิ..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Additional Info Box */}
              <div className="p-4 bg-accent/30 rounded-lg">
                <h4 className="mb-2 font-medium">ข้อมูลเพิ่มเติม</h4>
                <ul className="text-sm opacity-70 space-y-1">
                  <li>• รูปภาพควรชัดเจนและมีแสงเพียงพอ</li>
                  <li>• ถ่ายรูปจากหลายมุมเพื่อการประเมินที่แม่นยำ</li>
                  <li>• การประเมินราคาเป็นเพียงค่าประมาณเบื้องต้น</li>
                  <li>• ราคาจริงขึ้นอยู่กับการตรวจสอบโดยผู้เชี่ยวชาญ</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white">
                ประเมินราคาทันที
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section (Black Box) */}
        <div className="mt-8 p-6 bg-black text-white rounded-lg">
          <h3 className="mb-4 font-bold" style={{ color: '#FFD4F8' }}>
            ทำไมต้องประเมินราคากับเรา?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-2xl mb-2">💎</div>
              <h4 className="mb-2 font-bold">ผู้เชี่ยวชาญ</h4>
              <p className="opacity-80">ทีมผู้เชี่ยวชาญด้านเพชรและอัญมณีที่ได้รับการรับรอง</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="mb-2 font-bold">รวดเร็ว</h4>
              <p className="opacity-80">ประเมินและตอบกลับทันที ไม่ต้องรอ</p>
            </div>
            <div>
              <div className="text-2xl mb-2">✓</div>
              <h4 className="mb-2 font-bold">ฟรี</h4>
              <p className="opacity-80">บริการประเมินราคาฟรี ไม่มีค่าใช้จ่าย</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}