import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shosha-laundry.com'

    // In a real app, you might fetch products/pages from a CMS or DB
    // For now, we only have one main page.

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Add other pages if they exist
        // {
        //   url: `${baseUrl}/profil`,
        //   lastModified: new Date(),
        //   changeFrequency: 'monthly',
        //   priority: 0.8,
        // },
    ]
}
