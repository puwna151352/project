"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'ที่อยู่',
      details: [
        '123 ถนนเยาวราช แขวงสัมพันธวงศ์',
        'เขตสัมพันธวงศ์ กรุงเทพมหานคร 10100',
      ],
    },
    {
      icon: Phone,
      title: 'โทรศัพท์',
      details: ['02-123-4567', '081-234-5678'],
    },
    {
      icon: Mail,
      title: 'อีเมล',
      details: ['info@nudeelucky.com', 'sales@nudeelucky.com'],
    },
    {
      icon: Clock,
      title: 'เวลาทำการ',
      details: [
        'จันทร์ - ศุกร์: 10:00 - 20:00 น.',
        'เสาร์ - อาทิตย์: 10:00 - 19:00 น.',
      ],
    },
  ];

  const branches = [
    {
      name: 'สาขาเยาวราช (สำนักงานใหญ่)',
      address: '123 ถนนเยาวราช แขวงสัมพันธวงศ์ เขตสัมพันธวงศ์ กรุงเทพฯ 10100',
      phone: '02-123-4567',
      hours: 'จันทร์-ศุกร์ 10:00-20:00 น., เสาร์-อาทิตย์ 10:00-19:00 น.',
    },
    {
      name: 'สาขาสยามพารากอน',
      address: '991 ชั้น 1 ห้าง Siam Paragon ถนนพระราม 1 ปทุมวัน กรุงเทพฯ 10330',
      phone: '02-234-5678',
      hours: 'ทุกวัน 10:00-22:00 น.',
    },
    {
      name: 'สาขาวอร์เนอร์ สีลม',
      address: 'อาคาร Bis (วอร์เนอร์) ตรงข้ามถนนมเหสักข์ 2 สีลม ชั้น 3 ห้อง 3E7A, ชั้น 1 บู๊ธ K84',
      phone: '02-345-6789',
      hours: 'ทุกวัน 10:00-21:00 น.',
    },
  ];

  const socialMedia = [
    { icon: Facebook, label: 'Facebook', url: '#', handle: '@nudeelucky' },
    { icon: Instagram, label: 'Instagram', url: '#', handle: '@nudeelucky' },
    { icon: MessageCircle, label: 'LINE', url: '#', handle: '@nudeelucky' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
             <Sparkles className="w-16 h-16 text-accent animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ติดต่อเรา</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 text-gray-300 font-light">
            ยินดีให้คำปรึกษาและตอบคำถามทุกข้อสงสัย <br className="hidden sm:block" />
            ทีมงานของเราพร้อมให้บริการคุณ
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-white">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 bg-accent/20">
                  <info.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold text-lg mb-3">{info.title}</h3>
                <div className="space-y-1 text-gray-500 text-sm">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Branches Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-8 text-center">สาขาของเรา</h2>
              <div className="space-y-8">
                {branches.map((branch, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-8 bg-gray-100" />}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                      {/* Branch Name */}
                      <div className="md:col-span-1">
                        <h4 className="font-bold text-lg text-accent-foreground mb-2 md:mb-0">
                          {branch.name}
                        </h4>
                      </div>
                      
                      {/* Branch Details */}
                      <div className="md:col-span-2 space-y-3 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-black">{branch.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <span>{branch.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Media */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-2">ติดตามข่าวสาร Social Media</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {socialMedia.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 group-hover:bg-accent/30 transition-colors">
                  <social.icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-bold text-lg">{social.label}</p>
                  <p className="text-sm text-gray-500">{social.handle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-black text-white rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
           {/* Background Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
           
           <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
            <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto font-light">
              เลือกซื้อเครื่องประดับเพชรคุณภาพสูง หรือปรึกษาการออกแบบพิเศษ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-semibold">
                <Link href="/jewelry/rings">เลือกซื้อเครื่องประดับ</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full font-semibold bg-transparent">
                <Link href="/appraisal">ประเมินราคาเพชร</Link>
              </Button>
            </div>
           </div>
        </div>
      </section>
    </div>
  );
}