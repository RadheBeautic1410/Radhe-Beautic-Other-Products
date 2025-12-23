import type { Metadata } from "next"

/**
 * SEO Metadata Configuration
 * 
 * This file provides reusable SEO metadata configurations for different pages.
 * Import and use these configurations in your page metadata exports.
 */

interface PageSEO {
  title: string
  description: string
  keywords?: string[]
  path?: string
  image?: string
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = "/",
  image = "/radhey-beautic-shop-storefront-welcoming-entrance-.jpg",
}: PageSEO): Metadata {
  const baseUrl = "https://radhebeautic.com" // Update with your actual domain
  const fullUrl = `${baseUrl}${path}`

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Radhe Beautic",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

/**
 * Generate structured data for a specific page
 */
export function generateStructuredData(
  type: "product" | "article" | "faq",
  data: Record<string, any>
) {
  const base = {
    "@context": "https://schema.org",
    "@type": type === "product" ? "Product" : type === "article" ? "Article" : "FAQPage",
  }

  return {
    ...base,
    ...data,
  }
}

