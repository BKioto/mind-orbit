import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mind-orbit-lyart.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // ربات‌ها نباید روت‌های API را ایندکس کنند
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}