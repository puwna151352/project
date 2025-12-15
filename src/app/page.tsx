import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const categories = [
    {
      title: 'แหวนเพชร',
      image: 'https://images.unsplash.com/photo-1629201690245-fa87a9c6598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      path: '/jewelry/rings', // เปลี่ยน path ให้ตรงกับโฟลเดอร์ Next.js
    },
    {
      title: 'ต่างหูเพชร',
      image: 'https://images.unsplash.com/photo-1590156118368-607652ab307a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      path: '/jewelry/earrings',
    },
    {
      title: 'สร้อยข้อมือเพชร',
      image: 'https://images.unsplash.com/photo-1655707063513-a08dad26440e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      path: '/jewelry/bracelets',
    },
    {
      title: 'สร้อยคอเพชร',
      image: 'https://images.unsplash.com/photo-1758995115518-26f90aa61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      path: '/jewelry/necklaces',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'แหวนเพชรเม็ดเดี่ยว 1.5 กะรัต',
      price: '฿285,000',
      image: 'https://images.unsplash.com/photo-1629201690245-fa87a9c6598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      href: '/product/1' // สมมติ path สินค้า
    },
    {
      id: 2,
      name: 'ต่างหูเพชร 0.8 กะรัต',
      price: '฿145,000',
      image: 'https://images.unsplash.com/photo-1590156118368-607652ab307a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      href: '/product/2'
    },
    {
      id: 3,
      name: 'สร้อยข้อมือเพชร',
      price: '฿195,000',
      image: 'https://images.unsplash.com/photo-1655707063513-a08dad26440e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      href: '/product/3'
    },
    {
      id: 4,
      name: 'สร้อยคอเพชร',
      price: '฿325,000',
      image: 'https://images.unsplash.com/photo-1758995115518-26f90aa61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      href: '/product/4'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1667013829921-b1c1719a0cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            alt="Luxury jewelry background"
            fill
            priority
            className="object-cover"
          />
          {/* Dark Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-accent font-medium tracking-wide">ความหรูหราระดับเวิลด์คลาส</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nudee Lucky <br /> Gems & Jewelry
            </h1>
            <p className="text-xl mb-8 opacity-90 font-light">
              เครื่องประดับเพชรชั้นเลิศ ออกแบบพิเศษเฉพาะคุณ <br />
              สะท้อนตัวตนอันสง่างามในทุกโอกาส
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg rounded-full">
                <Link href="/diamond-prices">
                  ดูราคาเพชร
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-black/40 border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full backdrop-blur-sm">
                <Link href="/jewelry">
                  เลือกซื้อเครื่องประดับ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">ประเภทเครื่องประดับ</h2>
          <p className="text-gray-500">เลือกเครื่องประดับที่เหมาะกับสไตล์ของคุณ</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.path} className="group">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg group-hover:text-accent-foreground/70 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">สินค้าขายดี</h2>
              <p className="text-gray-500">คอลเลคชั่นยอดนิยมที่ลูกค้าไว้วางใจ</p>
            </div>
            <Button asChild variant="link" className="text-black hidden md:inline-flex">
              <Link href="/jewelry">ดูทั้งหมด <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={product.href} className="group block">
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-80 overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Badge (Optional) */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                        Best Seller
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-medium text-lg mb-2 line-clamp-1 group-hover:text-gray-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xl font-bold">{product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="w-full">
               <Link href="/jewelry">ดูสินค้าทั้งหมด</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-8 animate-pulse">
            <span className="text-4xl">💎</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">เรียนรู้เรื่องเพชร</h2>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            ก่อนตัดสินใจซื้อเพชร มาทำความรู้จักกับ <strong>4Cs</strong> ของเพชร <br/>
            Cut (การเจียระไน), Clarity (ความใส), Color (สี), และ Carat (น้ำหนัก) 
            เพื่อให้คุณได้เพชรที่สวยและคุ้มค่าที่สุด
          </p>
          <Button asChild className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105">
            <Link href="/learn">
              เรียนรู้เพิ่มเติม
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">ต้องการประเมินราคาเพชร?</h2>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto font-light">
            เรามีบริการประเมินราคาเพชรและเครื่องประดับฟรี โดยผู้เชี่ยวชาญ <br/>
            เพียงส่งรูปภาพและรายละเอียดมาให้เรา
          </p>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg rounded-full transition-all">
            <Link href="/appraisal">
              ประเมินราคาเลย
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}