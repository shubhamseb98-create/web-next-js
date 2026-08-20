export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://thewebtycoons.com').replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
