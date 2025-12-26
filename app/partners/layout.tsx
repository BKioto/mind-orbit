import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شبکه همکاران تجاری | MindOrbit AI",
  description: "معرفی کسب‌وکارهای همکار و پروژه‌های تحت حمایت مایند اوربیت. دریافت خدمات ویژه از تیوان اکس، کیادو و سایر شرکای تجاری.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}