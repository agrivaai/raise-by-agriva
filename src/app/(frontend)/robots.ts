import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/account/', '/my-farm/', '/search/', '/preview/'] }],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agriva.com.bd'}/sitemap.xml`,
  }
}
