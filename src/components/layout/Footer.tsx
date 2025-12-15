import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 text-black mt-20 border-t border-gray-200">
      <div className="container mx-auto px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-80">

          
          
          <div>
            <h3 className="font-bold text-lg mb-6">เครื่องประดับ</h3>
            <ul className="space-y-3 text-base text-gray-600">
              <li><Link href="/jewelry/rings" className="hover:text-black transition-colors">แหวน</Link></li>
              <li><Link href="/jewelry/earrings" className="hover:text-black transition-colors">ต่างหู</Link></li>
              <li><Link href="/jewelry/bracelets" className="hover:text-black transition-colors">สร้อยข้อมือ</Link></li>
              <li><Link href="/jewelry/necklaces" className="hover:text-black transition-colors">สร้อยคอ</Link></li>
              <li><Link href="/diamond-prices" className="hover:text-black transition-colors">ราคาเพชร</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">เกี่ยวกับเรา</h3>
            <ul className="space-y-3 text-base text-gray-600">
              <li><Link href="/learn" className="hover:text-black transition-colors">ความรู้เรื่องเพชร</Link></li>
              <li><Link href="/appraisal" className="hover:text-black transition-colors">ประเมินราคา</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-7 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Nudee Lucky Gems & Jewelry
          </p>
        </div>
      </div>
    </footer>
  );
}