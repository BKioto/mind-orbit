import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // آدرس دامنه اصلی سایت شما
  const baseUrl = 'https://mind-orbit-lyart.vercel.app'

  return [
    {
      url: baseUrl, // صفحه اصلی (چت)
      lastModified: new Date(),
      changeFrequency: 'daily', // چون چت‌بات است و محتوا زنده است
      priority: 1,
    },
    {
      url: `${baseUrl}/partners`, // صفحه همکاران
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}