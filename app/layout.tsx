import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  // 👇 این خط برای سئو بسیار مهم است (آدرس پایه سایت)
  metadataBase: new URL('https://mind-orbit-lyart.vercel.app'),

  title: "MindOrbit | هوش مصنوعی و چت بات پیشرفته مایند اوربیت",
  description: "Advanced AI Chatbot built by KiyaDev",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  // تاییدیه گوگل
  verification: {
    google: "sLK4JJOaw4XxKgoHn42-ry2fAMpI17zKnAUyLjKI6mk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}