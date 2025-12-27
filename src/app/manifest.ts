import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Indian Wear Gallery - Premium Wholesale Kurtis',
    short_name: 'Indian Wear Gallery',
    description: 'Premium wholesale Kurtis, Anarkali, Palazzo Sets, and ethnic wear for retailers and resellers',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F0F',
    theme_color: '#8B3A3A',
    icons: [
      {
        src: '/placeholder-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}

