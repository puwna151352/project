import { redirect } from 'next/navigation';

export default function JewelryRootPage() {
  // เมื่อใครเข้ามาที่ /jewelry ให้ดีดไปที่ /jewelry/rings ทันที
  redirect('/jewelry/rings');
}