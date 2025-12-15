"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Package, Heart, MapPin, Settings, LogOut,
    User as UserIcon, FileText, ChevronRight, Edit2,
    Trash2, Star, MessageSquare, Phone // <--- เพิ่ม Phone ตรงนี้ครับ
} from 'lucide-react';

// UI Components
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog';

// Custom Components & Libs
import { ReviewDialog } from '@/components/shared/ReviewDialog';
import { useAuth } from '@/components/providers/auth-provider';
import { toast } from 'sonner';

// --- Simplified Mock Data ---
const MOCK_ORDERS = [
    {
        id: 'ORD-001',
        date: '28 ม.ค. 2025',
        status: 'shipping',
        total: 325000,
        items: [
            { id: 101, name: 'แหวนเพชรเม็ดเดี่ยว 1.5 กะรัต', price: 325000, image: 'https://images.unsplash.com/photo-1748023593753-4949fdc19045?w=200', reviewed: false }
        ]
    },
    {
        id: 'ORD-002',
        date: '15 ม.ค. 2025',
        status: 'completed',
        total: 145000,
        items: [
            { id: 201, name: 'ต่างหูเพชร 0.8 กะรัต', price: 145000, image: 'https://images.unsplash.com/photo-1590156118368-607652ab307a?w=200', reviewed: true }
        ]
    }
];

const MOCK_ADDRESS = {
    id: 1,
    name: 'สมหญิง รักดี',
    phone: '081-234-5678',
    address: '123/45 คอนโดหรู ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110',
    isDefault: true
};

const MOCK_APPRAISALS = [
    { id: 1, date: '10 ม.ค. 2025', item: 'แหวนทองคำขาว', status: 'completed', price: 45000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200' },
    { id: 2, date: '5 ก.พ. 2025', item: 'สร้อยคอเพชร', status: 'pending', price: null, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200' },
];

export default function AccountPage() {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

    // State
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profile, setProfile] = useState({
        firstName: 'สมหญิง',
        lastName: 'รักดี',
        email: 'somying@example.com',
        phone: '081-234-5678'
    });

    // Dialog States
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [selectedProductForReview, setSelectedProductForReview] = useState<any>(null);
    const [cancelOrderDialogOpen, setCancelOrderDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    // Check Auth
    if (!isLoggedIn) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h2>
                <p className="text-gray-500 mb-8">เข้าสู่ระบบเพื่อดูข้อมูลการสั่งซื้อและจัดการบัญชีของคุณ</p>
                <Button onClick={() => router.push('/login')} className="bg-black text-white">ไปหน้าเข้าสู่ระบบ</Button>
            </div>
        );
    }

    // Handlers
    const handleLogout = () => {
        logout();
        toast.success('ออกจากระบบสำเร็จ');
        router.push('/login');
    };

    const handleSaveProfile = () => {
        setIsEditingProfile(false);
        toast.success('บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว');
    };

    const handleOpenReview = (product: any) => {
        setSelectedProductForReview(product);
        setReviewDialogOpen(true);
    };

    const handleSubmitReview = (reviewData: any) => {
        console.log('Review Submitted:', reviewData);
        toast.success('ส่งรีวิวเรียบร้อยแล้ว ขอบคุณสำหรับความคิดเห็นค่ะ');
        setReviewDialogOpen(false);
    };

    const handleCancelOrder = () => {
        toast.success(`ยกเลิกคำสั่งซื้อ ${selectedOrderId} เรียบร้อยแล้ว`);
        setCancelOrderDialogOpen(false);
    };

    // Helper render status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed': return <Badge className="bg-green-500 hover:bg-green-600">สำเร็จ</Badge>;
            case 'shipping': return <Badge className="bg-blue-500 hover:bg-blue-600">กำลังจัดส่ง</Badge>;
            case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-600 bg-yellow-50">รอตรวจสอบ</Badge>;
            case 'cancelled': return <Badge variant="destructive">ยกเลิกแล้ว</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* --- Sidebar Menu --- */}
                <div className="w-full lg:w-72 flex-shrink-0">
                    <Card className="border-none shadow-md mb-6 bg-white">
                        <CardContent className="p-6 text-center">
                            <div className="w-24 h-24 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-accent-foreground border-4 border-white shadow-sm">
                                {profile.firstName[0]}
                            </div>
                            <h3 className="font-bold text-xl mb-1">{profile.firstName} {profile.lastName}</h3>
                            <p className="text-sm text-gray-500 mb-4">{profile.email}</p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => setIsEditingProfile(true)}>
                                <Edit2 className="w-4 h-4 mr-2" /> แก้ไขโปรไฟล์
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm overflow-hidden">
                        <Tabs
                            orientation="vertical"
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="w-full"
                        >
                            <TabsList className="flex flex-col h-auto bg-white p-0 space-y-0 w-full">
                                {[
                                    { id: 'overview', icon: UserIcon, label: 'ข้อมูลส่วนตัว' },
                                    { id: 'orders', icon: Package, label: 'ประวัติคำสั่งซื้อ' },
                                    { id: 'wishlist', icon: Heart, label: 'รายการโปรด' },
                                    { id: 'addresses', icon: MapPin, label: 'ที่อยู่จัดส่ง' },
                                    { id: 'appraisals', icon: FileText, label: 'ประวัติประเมินราคา' },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="w-full justify-start px-6 py-4 text-base font-medium data-[state=active]:bg-gray-50 data-[state=active]:text-black data-[state=active]:border-l-4 data-[state=active]:border-black border-l-4 border-transparent rounded-none transition-all hover:bg-gray-50"
                                    >
                                        <tab.icon className="w-5 h-5 mr-3 opacity-70" /> {tab.label}
                                    </TabsTrigger>
                                ))}
                                <Separator />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-6 py-4 text-base text-red-500 hover:bg-red-50 transition-colors font-medium"
                                >
                                    <LogOut className="w-5 h-5 mr-3" /> ออกจากระบบ
                                </button>
                            </TabsList>
                        </Tabs>
                    </Card>
                </div>

                {/* --- Main Content --- */}
                <div className="flex-1">

                    {/* 1. Overview (Profile View) */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">ข้อมูลส่วนตัว</h2>
                            <Card>
                                <CardContent className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <Label className="text-gray-500 mb-1 block">ชื่อ-นามสกุล</Label>
                                            <p className="text-lg font-medium">{profile.firstName} {profile.lastName}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-500 mb-1 block">เบอร์โทรศัพท์</Label>
                                            <p className="text-lg font-medium">{profile.phone}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label className="text-gray-500 mb-1 block">อีเมล</Label>
                                            <p className="text-lg font-medium">{profile.email}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* 2. Orders */}
                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">ประวัติคำสั่งซื้อ</h2>
                            {MOCK_ORDERS.length > 0 ? (
                                <div className="space-y-4">
                                    {MOCK_ORDERS.map((order) => (
                                        <Card key={order.id} className="overflow-hidden border-gray-200">
                                            <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center text-sm border-b border-gray-100">
                                                <div className="flex gap-4 items-center">
                                                    <span className="font-bold text-base">#{order.id}</span>
                                                    <span className="text-gray-500 hidden sm:inline">|</span>
                                                    <span className="text-gray-500">{order.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                                                    <span className="font-bold text-lg">฿{order.total.toLocaleString()}</span>
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                {order.items.map((item: any, idx) => (
                                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 first:pt-0">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                                                                <ImageWithFallback src={item.image} alt={item.name} fill className="object-cover" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm md:text-base">{item.name}</p>
                                                                <p className="text-xs text-gray-500 mt-1">฿{item.price.toLocaleString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 self-end sm:self-center">
                                                            {!item.reviewed && order.status === 'completed' && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleOpenReview(item)}
                                                                    className="text-xs"
                                                                >
                                                                    <Star className="w-3 h-3 mr-1" /> เขียนรีวิว
                                                                </Button>
                                                            )}
                                                            <Button variant="ghost" size="sm" asChild className="text-xs">
                                                                <Link href={`/product/${item.id}`}>ซื้อซ้ำ</Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                            {order.status === 'shipping' && (
                                                <CardFooter className="bg-gray-50/50 p-3 flex justify-end">
                                                    <Button
                                                        variant="link"
                                                        className="text-red-500 text-xs h-auto p-0 hover:text-red-600 hover:no-underline"
                                                        onClick={() => {
                                                            setSelectedOrderId(order.id);
                                                            setCancelOrderDialogOpen(true);
                                                        }}
                                                    >
                                                        แจ้งปัญหา / ยกเลิกคำสั่งซื้อ
                                                    </Button>
                                                </CardFooter>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">ยังไม่มีรายการคำสั่งซื้อ</p>
                                    <Button variant="link" asChild><Link href="/jewelry/rings">เริ่มช้อปปิ้งเลย</Link></Button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 3. Wishlist */}
                    {activeTab === 'wishlist' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">รายการโปรด</h2>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/favorites">ดูทั้งหมด <ChevronRight className="w-4 h-4 ml-1" /></Link>
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Mock Favorites */}
                                <Card className="flex flex-row overflow-hidden h-32 hover:shadow-md transition-shadow">
                                    <div className="w-32 relative bg-gray-100 shrink-0">
                                        <ImageWithFallback src="https://images.unsplash.com/photo-1629201690245-fa87a9c6598e?w=300" alt="Ring" fill className="object-cover" />
                                    </div>
                                    <div className="p-4 flex flex-col justify-center w-full">
                                        <h4 className="font-medium line-clamp-1 mb-1">แหวนเพชรเม็ดเดี่ยว</h4>
                                        <p className="text-sm text-gray-500 mb-3">฿285,000</p>
                                        <div className="flex gap-2 mt-auto">
                                            <Button size="sm" className="w-full bg-black h-8 text-xs">ใส่ตะกร้า</Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* 4. Addresses */}
                    {activeTab === 'addresses' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">ที่อยู่จัดส่ง</h2>
                                <Button size="sm" className="bg-black text-white">+ เพิ่มที่อยู่ใหม่</Button>
                            </div>
                            <Card className="border-black border-2 relative">
                                <CardContent className="p-6">
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="w-4 h-4" /></Button>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="font-bold text-lg">{MOCK_ADDRESS.name}</span>
                                        {MOCK_ADDRESS.isDefault && <Badge variant="secondary" className="text-xs font-normal">ค่าเริ่มต้น</Badge>}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> {MOCK_ADDRESS.phone}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-1 shrink-0" /> {MOCK_ADDRESS.address}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* 5. Appraisals History */}
                    {activeTab === 'appraisals' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">ประวัติประเมินราคา</h2>
                            <div className="space-y-4">
                                {MOCK_APPRAISALS.map((item) => (
                                    <Card key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                        <CardContent className="p-4 flex gap-4 items-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                                                <ImageWithFallback src={item.image} alt={item.item} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold">{item.item}</h4>
                                                    {getStatusBadge(item.status)}
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <p className="text-xs text-gray-500">วันที่ส่ง: {item.date}</p>
                                                    {item.price && (
                                                        <p className="font-bold text-accent-foreground">฿{item.price.toLocaleString()}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* --- Dialogs --- */}

            {/* 1. Edit Profile Dialog */}
            <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>แก้ไขข้อมูลส่วนตัว</DialogTitle>
                        <DialogDescription>
                            แก้ไขข้อมูลของคุณและกดบันทึกเพื่อยืนยัน
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstName" className="text-right">ชื่อ</Label>
                            <Input id="firstName" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastName" className="text-right">นามสกุล</Label>
                            <Input id="lastName" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">เบอร์โทร</Label>
                            <Input id="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSaveProfile} className="bg-black text-white">บันทึก</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 2. Review Dialog */}
            {selectedProductForReview && (
                <ReviewDialog
                    open={reviewDialogOpen}
                    onClose={() => setReviewDialogOpen(false)}
                    onSubmit={handleSubmitReview}
                    productName={selectedProductForReview.name}
                />
            )}

            {/* 3. Cancel Order Alert Dialog */}
            <AlertDialog open={cancelOrderDialogOpen} onOpenChange={setCancelOrderDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>ยืนยันการยกเลิกคำสั่งซื้อ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            คำสั่งซื้อ #{selectedOrderId} จะถูกยกเลิก การกระทำนี้ไม่สามารถย้อนกลับได้
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>ปิด</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelOrder} className="bg-red-600 hover:bg-red-700 text-white">
                            ยืนยันการยกเลิก
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}