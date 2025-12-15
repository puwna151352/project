import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/auth-provider"; // <-- นำเข้า

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nudee Lucky Gems & Jewelry",
  description: "เครื่องประดับเพชรแท้ คุณภาพระดับเวิลด์คลาส",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <AuthProvider> {/* <-- หุ้มตรงนี้ */}
          <div className="flex flex-col min-h-screen">
            
            {/* Navbar ไม่ต้องส่ง Props แล้ว เพราะมันจะไปดึงจาก useAuth เอง */}
            <Navbar /> 

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}