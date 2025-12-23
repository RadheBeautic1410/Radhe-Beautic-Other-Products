'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SiteHeader } from '@/components/site-header'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getKurtiTypeDisplayName } from '@/lib/data/kurti-types'

interface KurtiImage {
  url: string
  id: string
  is_hidden?: boolean
}

interface Kurti {
  id: string
  code: string
  category: string
  kurtiTypeName?: string | null
  party: string
  sellingPrice: string
  actualPrice: string
  customerPrice: number | null
  images: KurtiImage[]
  sizes: any[]
  countOfPiece: number
  lastUpdatedTime: Date
}

interface Category {
  code: string | null
  name: string
  normalizedLowerCase: string
}

interface KurtiType {
  key: string
  value: string
}

interface KurtiDisplayPageProps {
  kurtis: Kurti[]
  categories: Category[]
  kurtiTypes?: KurtiType[]
  sizes: string[]
  selectedCategory: string
  selectedSize: string
}

export function KurtiDisplayPage({
  kurtis,
  categories,
  kurtiTypes = [],
  sizes,
  selectedCategory,
  selectedSize,
}: KurtiDisplayPageProps) {
  const router = useRouter()

  // Check if selectedCategory is a kurtiType (from catalog) or a category code
  const isKurtiTypeFilter = kurtiTypes.some(
    (type) => type.key.toLowerCase() === selectedCategory.toLowerCase()
  )

  // Find the matching category code or kurtiType (case-insensitive) to use as Select value
  const getCategorySelectValue = () => {
    if (selectedCategory === 'all') return 'all'
    
    // If it's a kurtiType, return it as-is
    if (isKurtiTypeFilter) {
      const matchingType = kurtiTypes.find(
        (type) => type.key.toLowerCase() === selectedCategory.toLowerCase()
      )
      return matchingType?.key || selectedCategory
    }
    
    // Otherwise, it's a category code
    const matchingCategory = categories.find(
      (cat) =>
        cat.code?.toLowerCase() === selectedCategory.toLowerCase() ||
        cat.normalizedLowerCase === selectedCategory.toLowerCase()
    )
    // Use the database code if found, otherwise preserve original URL case
    return matchingCategory?.code || selectedCategory
  }

  // Find the matching size (case-insensitive) to use as Select value
  const getSizeSelectValue = () => {
    if (selectedSize === 'all') return 'all'
    const matchingSize = sizes.find(
      (s) => s.toLowerCase() === selectedSize.toLowerCase()
    )
    // Use the database size if found, otherwise preserve original URL case
    return matchingSize || selectedSize
  }

  const handleCategoryChange = (category: string) => {
    const categoryParam = category === 'all' ? undefined : category
    const params = new URLSearchParams()
    if (categoryParam) params.set('category', categoryParam)
    if (selectedSize !== 'all') params.set('size', selectedSize)
    const queryString = params.toString()
    router.push(`/kurtis${queryString ? `?${queryString}` : ''}`)
  }

  const handleSizeChange = (size: string) => {
    const sizeParam = size === 'all' ? undefined : size
    const params = new URLSearchParams()
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (sizeParam) params.set('size', sizeParam)
    const queryString = params.toString()
    router.push(`/kurtis${queryString ? `?${queryString}` : ''}`)
  }

  // Get visible images for a kurti
  const getVisibleImages = (kurti: Kurti): KurtiImage[] => {
    if (!Array.isArray(kurti.images)) return []
    return kurti.images.filter((img) => !img.is_hidden)
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Kurti Collection
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our complete collection of kurtis with photos
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">
                {kurtiTypes.length > 0 ? 'Kurti Type:' : 'Category:'}
              </label>
              <Select value={getCategorySelectValue()} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={kurtiTypes.length > 0 ? "Select kurti type" : "Select category"} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="bg-card hover:bg-accent/10">
                    {kurtiTypes.length > 0 ? 'All Types' : 'All Categories'}
                  </SelectItem>
                  {kurtiTypes.length > 0 ? (
                    // Show kurti types if available
                    kurtiTypes.map((type) => (
                      <SelectItem
                        key={type.key}
                        value={type.key}
                        className="bg-card hover:bg-accent/10"
                      >
                        {type.value}
                      </SelectItem>
                    ))
                  ) : (
                    // Otherwise show categories
                    categories.map((cat) => (
                      <SelectItem
                        key={cat.normalizedLowerCase}
                        value={cat.code || cat.normalizedLowerCase}
                        className="bg-card hover:bg-accent/10"
                      >
                        {cat.name} {cat.code && `(${cat.code})`}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Size:</label>
              <Select value={getSizeSelectValue()} onValueChange={handleSizeChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="bg-card hover:bg-accent/10">
                    All Sizes
                  </SelectItem>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size} className="bg-card hover:bg-accent/10">
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto text-sm text-muted-foreground">
              {kurtis.length} {kurtis.length === 1 ? 'kurti' : 'kurtis'} found
            </div>
          </div>

          {/* Kurtis Grid */}
          {kurtis.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No kurtis found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {kurtis.map((kurti) => {
                const visibleImages = getVisibleImages(kurti)
                return (
                  <KurtiCard key={kurti.id} kurti={kurti} visibleImages={visibleImages} />
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground">
            <p className="text-center">
              © {new Date().getFullYear()} Radhe Beautic · Wholesale & Retail Kurtis · Ethnic Wear
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

// Separate component for Kurti Card with image carousel
function KurtiCard({ kurti, visibleImages }: { kurti: Kurti; visibleImages: KurtiImage[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = visibleImages.length > 1

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % visibleImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (visibleImages.length === 0) {
    return (
      <Link href={`/kurtis/${kurti.id}`}>
        <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 cursor-pointer">
          <div className="relative h-96 sm:h-80 md:h-64 w-full overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
            <Image
              src="/placeholder.svg"
              alt={kurti.code}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  {kurti.kurtiTypeName ? getKurtiTypeDisplayName(kurti.kurtiTypeName) : kurti.category}
                </h3>
                <p className="text-sm text-muted-foreground">{kurti.category}</p>
              </div>
              {kurti.customerPrice && (
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div>
                    <span className="text-lg font-bold text-accent">₹{kurti.customerPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/kurtis/${kurti.id}`}>
      <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 cursor-pointer">
        <div className="relative h-96 sm:h-80 md:h-64 w-full overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
        {/* Image Carousel */}
        <div className="relative w-full h-full">
          {visibleImages.map((image, index) => (
            <div
              key={image.id || index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.url}
                alt={`${kurti.code} - Image ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-foreground p-2 rounded-full transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-foreground p-2 rounded-full transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
              {visibleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    goToImage(index)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'bg-accent w-6'
                      : 'bg-background/60 w-1.5 hover:bg-background/80'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Image Count Badge */}
            <div className="absolute top-2 right-2 bg-accent/90 text-background px-2 py-1 rounded-full text-xs font-semibold z-10">
              {currentImageIndex + 1}/{visibleImages.length}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              {kurti.kurtiTypeName ? getKurtiTypeDisplayName(kurti.kurtiTypeName) : kurti.category}
            </h3>
            <p className="text-sm text-muted-foreground">{kurti.category}</p>
          </div>
          {kurti.customerPrice && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div>
                <span className="text-lg font-bold text-accent">₹{kurti.customerPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      </Card>
    </Link>
  )
}
