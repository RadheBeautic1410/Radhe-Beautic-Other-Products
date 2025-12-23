import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { PageLoader } from "@/components/page-loader"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    default: "Radhe Beautic - Premium Wholesale Kurtis & Ethnic Wear",
    template: "%s | Radhe Beautic",
  },
  description: "Premium wholesale Kurtis, Anarkali, Palazzo Sets, and ethnic wear for retailers and resellers. High-quality fabrics, competitive prices, exclusive designs. Contact us for bulk orders.",
  keywords: [
    "wholesale kurtis",
    "wholesale ethnic wear",
    "bulk kurtis",
    "kurtis manufacturer",
    "ethnic wear supplier",
    "anarkali kurtis wholesale",
    "palazzo sets wholesale",
    "embroidered kurtis",
    "printed kurtis",
    "cotton kurtis wholesale",
    "party wear kurtis",
    "daily wear kurtis",
    "designer kurtis wholesale",
    "kurtis supplier",
    "ethnic clothing wholesale",
  ],
  authors: [{ name: "Radhe Beautic" }],
  creator: "Radhe Beautic",
  publisher: "Radhe Beautic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://radhebeautic.com"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://radhebeautic.com", // Update with your actual domain
    siteName: "Radhe Beautic",
    title: "Radhe Beautic - Premium Wholesale Kurtis & Ethnic Wear",
    description: "Premium wholesale Kurtis, Anarkali, Palazzo Sets, and ethnic wear for retailers and resellers. High-quality fabrics, competitive prices, exclusive designs.",
    images: [
      {
        url: "/radhey-beautic-shop-storefront-welcoming-entrance-.jpg",
        width: 1200,
        height: 630,
        alt: "Radhe Beautic - Premium Wholesale Kurtis Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radhe Beautic - Premium Wholesale Kurtis & Ethnic Wear",
    description: "Premium wholesale Kurtis, Anarkali, Palazzo Sets, and ethnic wear for retailers and resellers.",
    images: ["/radhey-beautic-shop-storefront-welcoming-entrance-.jpg"],
    creator: "@radhebeautic", // Update with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/placeholder-logo.png",
    shortcut: "/placeholder-logo.png",
    apple: "/placeholder-logo.png",
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "fashion",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Radhe Beautic",
    description: "Premium wholesale Kurtis, Anarkali, Palazzo Sets, and ethnic wear for retailers and resellers",
    url: "https://radhebeautic.com",
    logo: "https://radhebeautic.com/placeholder-logo.png",
    image: "https://radhebeautic.com/radhey-beautic-shop-storefront-welcoming-entrance-.jpg",
    address: {
      "@type": "PostalAddress",
      // Update with your actual address
      addressLocality: "City",
      addressRegion: "State",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      // Update with your actual contact information
      telephone: "+91-XXXXX-XXXXX",
      email: "sales@radhebeautic.com",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Kurtis and Ethnic Wear",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Wholesale Kurtis",
            description: "Premium quality wholesale kurtis",
            category: "Clothing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Anarkali Kurtis",
            description: "Elegant Anarkali kurtis wholesale",
            category: "Clothing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Palazzo Sets",
            description: "Modern palazzo sets wholesale",
            category: "Clothing",
          },
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the minimum order quantity for wholesale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For wholesale orders, the minimum quantity is 10 pieces per design. We offer attractive bulk discounts for larger orders.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer customization for bulk orders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We provide customization options for bulk orders including color variations, embroidery, and printing. Contact us for details.",
        },
      },
      {
        "@type": "Question",
        name: "What are the shipping charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shipping is free for retail orders above ₹500. For wholesale orders, we offer special shipping rates based on quantity and location.",
        },
      },
      {
        "@type": "Question",
        name: "What is your return policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 7-day returns for defective items. Retail customers can return unused items within 14 days. Wholesale returns are subject to terms.",
        },
      },
      {
        "@type": "Question",
        name: "Do you ship internationally?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently, we ship within India. For international inquiries, please contact us directly via WhatsApp or phone.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods do you accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept UPI, bank transfer, credit/debit cards, and cash on delivery for retail orders. Wholesale customers can arrange payment terms.",
        },
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`antialiased scroll-smooth ${poppins.variable} ${playfair.variable}`}
      style={
        {
          ["--background" as any]: "#0F0F0F",
          ["--foreground" as any]: "#F5F5F5",
          ["--card" as any]: "#1A1A1A",
          ["--border" as any]: "#2D2D2D",
          ["--muted" as any]: "#A0A0A0",

          // Brand - Deep Burgundy + Rose Gold
          ["--primary" as any]: "#8B3A3A",
          ["--primary-foreground" as any]: "#F5F5F5",
          ["--accent" as any]: "#D4A574",
          ["--accent-foreground" as any]: "#0F0F0F",
        } as React.CSSProperties
      }
    >
      <head>
        {/* Structured Data for SEO - Store Information */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
        {/* Structured Data for SEO - FAQ Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* Performance optimization: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body className={`font-sans ${poppins.variable}`}>
        <Suspense fallback={<PageLoader message="Loading Radhe Beautic..." />}>
          {children}
          <Analytics />
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
