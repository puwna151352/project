"use client";

import { useState, use } from 'react'; // use ใช้สำหรับแกะ params ใน Next.js 15
import Link from 'next/link';
import { Heart, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // ใช้สำหรับ Filter บนมือถือ
import { getJewelryByCategory, getCategoryName } from '@/lib/mock-data';

// --- CONSTANTS ---
const RING_STYLES = [
  { value: 'solitaire', label: 'เม็ดเดี่ยว' },
  { value: 'side', label: 'บ่าข้าง' },
  { value: 'halo', label: 'ล้อมเพชร' },
  { value: 'hidden', label: 'ล้อมซ่อนฐาน' },
  { value: 'nature', label: 'ดีไซน์ธรรมชาติ' },
];

const EARRING_STYLES = [
  { value: 'stud', label: 'สตั๊ด' },
  { value: 'drop', label: 'ห้อย' },
  { value: 'hoop', label: 'ฮูป' },
];

const BRACELET_STYLES = [
  { value: 'tennis', label: 'เทนนิส' },
  { value: 'bangle', label: 'กำไล' },
  { value: 'chain', label: 'โซ่' },
];

const NECKLACE_STYLES = [
  { value: 'pendant', label: 'จี้' },
  { value: 'chain', label: 'โซ่' },
];

const SHAPES = [
  { value: 'round', label: 'ทรงกลม' },
  { value: 'oval', label: 'ทรงไข่' },
  { value: 'pear', label: 'ทรงหยดน้ำ' },
  { value: 'princess', label: 'ทรงพรินเซส' },
  { value: 'emerald', label: 'ทรงเอเมอรัลด์' },
];

const METALS = [
  { value: 'white-gold', label: 'ทองขาว' },
  { value: 'yellow-gold', label: 'ทองคำ' },
  { value: 'rose-gold', label: 'ทองชมพู' },
];

const PURITIES = [
  { value: '18k', label: '18K' },
  { value: '14k', label: '14K' },
  { value: '9k', label: '9K' },
];

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function JewelryPage({ params }: PageProps) {
  // แกะ params ด้วย React.use() (Next.js 15 pattern)
  const resolvedParams = use(params);
  const category = resolvedParams.category;

  // State
  const [favorites, setFavorites] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedPurities, setSelectedPurities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  // Logic
  const allProducts = getJewelryByCategory(category);
  const pageTitle = getCategoryName(category);

  // Helper to toggle array state
  const toggleSelection = (item: string, current: string[], setFn: any) => {
    setFn(current.includes(item) ? current.filter(i => i !== item) : [...current, item]);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getStyles = () => {
    switch (category) {
      case 'rings': return RING_STYLES;
      case 'earrings': return EARRING_STYLES;
      case 'bracelets': return BRACELET_STYLES;
      case 'necklaces': return NECKLACE_STYLES;
      default: return [];
    }
  };

  // Filter Logic
  const filteredProducts = allProducts.filter((product) => {
    if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) return false;
    if (selectedShapes.length > 0 && !selectedShapes.includes(product.shape)) return false;
    if (selectedMetals.length > 0 && !selectedMetals.includes(product.metal)) return false;
    if (selectedPurities.length > 0 && !selectedPurities.includes(product.purity)) return false;
    if (minPrice && product.price < parseInt(minPrice)) return false;
    if (maxPrice && product.price > parseInt(maxPrice)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const showShapeFilter = category === 'rings';

  // --- Filter Component (แยกออกมาเพื่อให้ใช้ซ้ำใน Mobile Sheet ได้) ---
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Styles */}
      <div>
        <Label className="text-base font-semibold mb-3 block">รูปแบบ</Label>
        <div className="grid grid-cols-2 gap-3">
          {getStyles().map((style) => (
            <div key={style.value} className="flex items-center space-x-2">
              <Checkbox 
                id={style.value} 
                checked={selectedStyles.includes(style.value)}
                onCheckedChange={() => toggleSelection(style.value, selectedStyles, setSelectedStyles)}
              />
              <label htmlFor={style.value} className="text-sm cursor-pointer text-gray-600">{style.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <Label className="text-base font-semibold mb-3 block">ช่วงราคา (บาท)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input type="number" placeholder="ต่ำสุด" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <Input type="number" placeholder="สูงสุด" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
      </div>

      {/* Shapes (Only Rings) */}
      {showShapeFilter && (
        <div>
          <Label className="text-base font-semibold mb-3 block">ทรงเพชร</Label>
          <div className="grid grid-cols-2 gap-3">
            {SHAPES.map((shape) => (
              <div key={shape.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={shape.value}
                  checked={selectedShapes.includes(shape.value)}
                  onCheckedChange={() => toggleSelection(shape.value, selectedShapes, setSelectedShapes)}
                />
                <label htmlFor={shape.value} className="text-sm cursor-pointer text-gray-600">{shape.label}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metal */}
      <div>
        <Label className="text-base font-semibold mb-3 block">สีตัวเรือน</Label>
        <div className="space-y-2">
          {METALS.map((metal) => (
            <div key={metal.value} className="flex items-center space-x-2">
              <Checkbox 
                id={metal.value}
                checked={selectedMetals.includes(metal.value)}
                onCheckedChange={() => toggleSelection(metal.value, selectedMetals, setSelectedMetals)}
              />
              <label htmlFor={metal.value} className="text-sm cursor-pointer text-gray-600">{metal.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Purity */}
      <div>
        <Label className="text-base font-semibold mb-3 block">ความบริสุทธิ์ทอง</Label>
        <div className="grid grid-cols-2 gap-3">
          {PURITIES.map((purity) => (
            <div key={purity.value} className="flex items-center space-x-2">
              <Checkbox 
                id={purity.value}
                checked={selectedPurities.includes(purity.value)}
                onCheckedChange={() => toggleSelection(purity.value, selectedPurities, setSelectedPurities)}
              />
              <label htmlFor={purity.value} className="text-sm cursor-pointer text-gray-600">{purity.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-gray-500">เลือกเครื่องประดับที่สะท้อนความเป็นคุณ</p>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Mobile Filter Button */}
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> ตัวกรอง
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="py-6">
                <h3 className="text-lg font-bold mb-6">ตัวกรองสินค้า</h3>
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <div className="w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                <SelectItem value="price-asc">ราคา: น้อย - มาก</SelectItem>
                <SelectItem value="price-desc">ราคา: มาก - น้อย</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <FilterContent />
            </CardContent>
          </Card>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-6">พบสินค้า {sortedProducts.length} รายการ</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group block">
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // ป้องกัน Link ทำงานเมื่อกดปุ่มหัวใจ
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white hover:scale-110 transition-all shadow-sm"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="font-medium text-lg mb-2 line-clamp-1 group-hover:text-accent-foreground/80 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-1">{product.description}</p>
                      <p className="font-bold text-lg">฿{product.price.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-32 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-400">ไม่พบสินค้าที่คุณค้นหา</p>
              <Button 
                variant="link" 
                onClick={() => {
                   setSelectedStyles([]);
                   setSelectedShapes([]);
                   setMinPrice('');
                   setMaxPrice('');
                }}
              >
                ล้างตัวกรองทั้งหมด
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}