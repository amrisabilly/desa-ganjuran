import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ganjuran.web.id'

  const umkmSlugs = [
    'slondok-bu-nuryani',
    'gula-jawa-organik',
    'kopi-robusta-ganjuran',
  ]

  const umkmUrls: MetadataRoute.Sitemap = umkmSlugs.map((slug) => ({
    url: `${baseUrl}/umkm/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/kkn`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...umkmUrls,
  ]
}