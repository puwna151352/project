"use client";

import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Eye, Palette, Weight, Scissors, ArrowRight } from 'lucide-react';

const FOUR_CS = [
  {
    id: 'cut',
    title: 'Cut (การเจียระไน)',
    icon: Scissors,
    description: 'การเจียระไนเป็นปัจจัยที่สำคัญที่สุดในการกำหนดความสวยงามของเพชร การเจียระไนที่ดีจะทำให้เพชรสะท้อนแสงได้อย่างสมบูรณ์แบบ',
    image: 'https://images.unsplash.com/photo-1737072406733-da72655671a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    details: [
      'Excellent - เพชรสะท้อนแสงได้ดีที่สุด ประมาณ 98% ของแสงที่เข้าสู่เพชร',
      'Very Good - สะท้อนแสงได้ดีมาก คุ้มค่าและมีความงามใกล้เคียง Excellent',
      'Good - สะท้อนแสงได้ดี เหมาะสำหรับผู้ที่มีงบประมาณจำกัด',
    ],
  },
  {
    id: 'clarity',
    title: 'Clarity (ความใส)',
    icon: Eye,
    description: 'ความใสของเพชรวัดจากตำหนิภายในและภายนอก เพชรที่มีตำหนิน้อยจะมีราคาสูงกว่า ตำหนิเหล่านี้เกิดขึ้นตามธรรมชาติระหว่างการก่อตัว',
    image: 'https://images.unsplash.com/photo-1747409020038-f1e1a7060906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    details: [
      'FL/IF - ไร้ตำหนิ (Flawless/Internally Flawless) หายากมาก',
      'VVS1/VVS2 - ตำหนิน้อยมาก มองด้วยกล้องขยาย 10 เท่ายากมาก',
      'VS1/VS2 - ตำหนิน้อย มองเห็นได้ยากด้วยกล้องขยาย 10 เท่า',
    ],
  },
  {
    id: 'color',
    title: 'Color (สี)',
    icon: Palette,
    description: 'เพชรจะถูกจัดอันดับตามสี โดย D เป็นเพชรใสไร้สีที่มีค่าสูงสุด และลดลงไปตามตัวอักษร การจัดอันดับนี้ใช้โดยสถาบัน GIA',
    image: 'https://images.unsplash.com/photo-1743761678588-3ba5d21586fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    details: [
      'D-F - ไร้สี (Colorless) เพชรเกรดสูงสุด หายากและมีราคาแพง',
      'G-J - เกือบไร้สี (Near Colorless) ดูไร้สีเมื่อติดตั้ง คุ้มค่าที่สุด',
      'K-M - มีสีเล็กน้อย (Faint) เห็นสีเหลืองอ่อนๆ',
    ],
  },
  {
    id: 'carat',
    title: 'Carat (น้ำหนัก)',
    icon: Weight,
    description: 'กะรัตคือหน่วยวัดน้ำหนักของเพชร 1 กะรัต = 0.2 กรัม เพชรที่มีน้ำหนักมากกว่าจะมีราคาสูงกว่า แต่ต้องพิจารณา 4Cs ร่วมกัน',
    image: 'https://images.unsplash.com/photo-1645201233154-80125533a32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    details: [
      '0.25-0.49 ct - เพชรขนาดเล็ก เหมาะสำหรับต่างหูและจี้',
      '0.50-0.99 ct - เพชรขนาดกลาง นิยมสำหรับแหวนหมั้น',
      '1.00-1.99 ct - เพชรขนาดใหญ่ สวยงามและโดดเด่น',
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">เรียนรู้เรื่องเพชร</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 text-gray-200">
            ทำความรู้จักกับมาตรฐาน 4Cs ในการประเมินคุณภาพเพชร <br className="hidden md:block" />
            เพื่อช่วยคุณเลือกเพชรที่สมบูรณ์แบบ
          </p>
        </div>
      </section>

      {/* 4Cs Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">4Cs ของเพชร</h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            มาตรฐานสากลในการประเมินคุณภาพและมูลค่าของเพชร โดยสถาบัน GIA (Gemological Institute of America)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOUR_CS.map((item) => (
            <Link key={item.id} href={`/learn/${item.id}`} className="block group">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border-none shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4">
                      <div className="inline-flex p-3 rounded-full bg-accent text-accent-foreground shadow-lg">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="mb-6 text-gray-600 leading-relaxed text-lg">{item.description}</p>
                  <div className="space-y-3">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-accent" />
                        <p className="text-sm text-gray-700 font-medium">{detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <span className="text-sm font-semibold text-accent-foreground group-hover:underline flex items-center gap-1">
                      อ่านเพิ่มเติม <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Natural vs Lab-Grown Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">เพชรธรรมชาติ vs เพชรแล็บ</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              ทำความเข้าใจความแตกต่างระหว่างเพชรธรรมชาติและเพชรที่สร้างในห้องปฏิบัติการ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Natural Diamond Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-black">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-accent/20">
                    <Sparkles className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">เพชรธรรมชาติ</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">(Natural Diamond)</p>
                </div>
                <ul className="space-y-4">
                  {[
                    'เกิดขึ้นตามธรรมชาติใต้พื้นโลก ใช้เวลานับพันล้านปี',
                    'หายาก มีมูลค่าสูง และถือเป็นการลงทุน',
                    'มีใบรับรองจากสถาบันชั้นนำ เช่น GIA, AGS',
                    'ราคาสูงกว่าเพชรแล็บ ประมาณ 30-50%'
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-black" />
                      <span className="text-gray-700">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lab-Grown Diamond Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-accent">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-accent/20">
                    <Eye className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">เพชรแล็บ</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">(Lab-Grown Diamond)</p>
                </div>
                <ul className="space-y-4">
                  {[
                    'สร้างในห้องปฏิบัติการ ใช้เวลาเพียง 2-3 สัปดาห์',
                    'มีคุณสมบัติทางเคมีและกายภาพเหมือนเพชรธรรมชาติ',
                    'เป็นมิตรกับสิ่งแวดล้อม ไม่ทำลายระบบนิเวศ',
                    'ราคาถูกกว่าเพชรธรรมชาติ คุ้มค่าสำหรับงบจำกัด'
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-accent" />
                      <span className="text-gray-700">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">พร้อมเลือกเพชรแล้วใช่ไหม?</h2>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto font-light">
            เรามีเพชรคุณภาพสูงหลากหลายทรงและขนาดให้คุณเลือก <br className="hidden sm:block" />
            พร้อมใบรับรองจากสถาบันชั้นนำและบริการปรึกษาฟรีจากผู้เชี่ยวชาญ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-semibold">
              <Link href="/diamond-prices">ดูราคาเพชร</Link>
            </Button>
            <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg rounded-full font-semibold">
              <Link href="/jewelry">ดูเครื่องประดับ</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full font-semibold">
              <Link href="/appraisal">ประเมินราคาเพชร</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}