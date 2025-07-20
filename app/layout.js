import { Geist, Geist_Mono, Poppins, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const BeVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // حسب الأوزان اللي هتستخدمها
  display: "swap",
  variable: "--font-BeVietnam", // ده اختياري لو عايز تستخدمه كـ CSS Variable
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // حسب الأوزان اللي هتستخدمها
  display: "swap",
  variable: "--font-poppins", // ده اختياري لو عايز تستخدمه كـ CSS Variable
});

export const metadata = {
  title: "Hatch Sanitary",
  description: "Proposals Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="antialiased bg-gray-50">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
