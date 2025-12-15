'use client'
import React from 'react';
import { 
  LayoutDashboard, 
  Gem, 
  ShoppingCart, 
  FileText, 
  Users, 
  Star, 
  Settings, 
  LogOut, 
  Bell, 
  Plus, 
  ArrowUpRight, 
  Eye
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Sidebar } from '../../../components/sidebar';

// --- Types & Interfaces ---
// ใน Next.js จริง ส่วนนี้อาจจะแยกเป็น file types.ts
interface MenuItem {
  label: string;
  icon: any;
  href: string;
}

// --- Mock Data ---
const salesData = [
  { name: 'ม.ค.', total: 400000 },
  { name: 'ก.พ.', total: 300000 },
  { name: 'มี.ค.', total: 500000 },
  { name: 'เม.ย.', total: 450000 },
  { name: 'พ.ค.', total: 700000 },
  { name: 'มิ.ย.', total: 650000 },
];

const categoryData = [
  { name: 'เพชร', value: 35, color: '#1f2937' },
  { name: 'แหวนเพชร', value: 25, color: '#4b5563' },
  { name: 'ต่างหู', value: 18, color: '#9ca3af' },
  { name: 'สร้อยคอ', value: 12, color: '#d1d5db' },
  { name: 'กำไล', value: 10, color: '#e5e7eb' },
];

const topProducts = [
  { rank: 1, name: 'แหวนเพชรเม็ดเดี่ยว 1 กะรัต', category: 'แหวน', sold: 25, image: '💍' },
  { rank: 2, name: 'สร้อยคอทองคำขาว 18k', category: 'สร้อยคอ', sold: 20, image: '📿' },
  { rank: 3, name: 'ต่างหูเพชรล้อม', category: 'ต่างหู', sold: 18, image: '💎' },
  { rank: 4, name: 'สร้อยข้อมือทองชมพู', category: 'สร้อยข้อมือ', sold: 15, image: '⛓️' },
  { rank: 5, name: 'จี้เพชรหยดน้ำ', category: 'จี้', sold: 12, image: '💧' },
];

const stockAlerts = [
  { id: 1, name: 'แหวนเพชรเม็ดเดี่ยว เหลือในสต็อก 2 ชิ้น', time: '1 ชั่วโมงที่แล้ว', image: '💍', urgent: true },
  { id: 2, name: 'สร้อยคอทองคำ 18k หมดสต็อก', time: '3 ชั่วโมงที่แล้ว', image: '📿', urgent: true },
  { id: 3, name: 'ต่างหูเพชรล้อม เหลือในสต็อก 3 ชิ้น', time: '5 ชั่วโมงที่แล้ว', image: '💎', urgent: true },
];

// --- Components ---

// 2. Stat Card Component
const StatCard = ({ title, value, growth, trend, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
      </div>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1
        ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : null}
        {growth}
      </span>
      <span className="text-xs text-gray-400">จากเดือนที่แล้ว</span>
    </div>
  </div>
);

// 3. Dashboard Page Content
// นี่คือโค้ดที่จะอยู่ใน app/dashboard/page.tsx
const DashboardContent = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">แดชบอร์ด</h2>
          <p className="text-gray-500 text-sm mt-1">ภาพรวมข้อมูลสำคัญของร้าน</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                <Plus className="w-4 h-4" />
                เพิ่มคำสั่งซื้อ
            </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="คำสั่งซื้อทั้งหมด" 
          value="245" 
          growth="+20%" 
          trend="up" 
          icon={ShoppingCart}
          colorClass="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="รายได้รวม" 
          value="฿2,850,000" 
          growth="+15%" 
          trend="up" 
          icon={BarChart} 
          colorClass="bg-indigo-50 text-indigo-600"
        />
        <StatCard 
          title="ลูกค้าใหม่" 
          value="48" 
          growth="+8%" 
          trend="up" 
          icon={Users}
          colorClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-100 rounded-md"><BarChart className="w-4 h-4 text-gray-600" /></div>
                <h3 className="font-semibold text-gray-800">ยอดขายรายเดือน</h3>
            </div>
            <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
                {['รายวัน', 'รายสัปดาห์', 'รายเดือน', '5 เดือน'].map((filter, idx) => (
                    <button key={idx} className={`text-xs px-3 py-1.5 rounded-md transition-all ${filter === 'รายเดือน' ? 'bg-white shadow-sm text-gray-800 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
                        {filter}
                    </button>
                ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="total" fill="#374151" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-gray-100 rounded-md"><PieChart className="w-4 h-4 text-gray-600" /></div>
                <h3 className="font-semibold text-gray-800">สัดส่วนสินค้าแต่ละหมวด</h3>
            </div>
          <div className="h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-800">35%</span>
                <span className="text-xs text-gray-500">เพชร</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{item.value}%</span>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
             <div className="p-1.5 bg-orange-100 rounded-md"><Star className="w-4 h-4 text-orange-600" /></div>
            <h3 className="font-semibold text-gray-800">สินค้าขายดี Top 5</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topProducts.map((product) => (
            <div key={product.rank} className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                {product.rank}
              </div>
              <div className="mt-2 w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                {product.image}
              </div>
              <h4 className="font-medium text-gray-800 text-sm line-clamp-1 mb-1 text-center">{product.name}</h4>
              <p className="text-xs text-gray-400 text-center mb-3">{product.category}</p>
              <div className="flex justify-center">
                 <span className="bg-gray-900 text-white text-xs px-2.5 py-1 rounded-full">{product.sold} ชิ้น</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
        <div className="flex items-center gap-2 mb-4">
             <div className="p-1.5 bg-red-100 rounded-md"><Bell className="w-4 h-4 text-red-600" /></div>
            <h3 className="font-semibold text-gray-800">แจ้งเตือนสต็อกสินค้า</h3>
        </div>
        <div className="space-y-3">
          {stockAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl border border-gray-100">
                        {alert.image}
                    </div>
                    <div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <h4 className="font-medium text-gray-800 text-sm">{alert.name}</h4>
                         </div>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
               </div>
               <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Main Layout (Simulating app/layout.tsx + app/dashboard/page.tsx)
export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-gray-900 flex">
      {/* Fixed Sidebar with Real Links */}
      <Sidebar/>
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen overflow-x-hidden">
        {/* Render only Dashboard content directly */}
        <DashboardContent />
      </main>
    </div>
  );
}