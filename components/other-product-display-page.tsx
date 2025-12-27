'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { Download, CheckSquare, Square, X } from 'lucide-react'
import { DialogClose } from '@/components/ui/dialog'
import { getProductTypeDisplayName, getProductSubTypeDisplayName } from '@/lib/data/product-types'

interface ProductImage {
  url: string
  id: string
  is_hidden?: boolean
}

interface OtherProduct {
  id: string
  categoryName: string
  productType: string
  subType: string | null
  images: ProductImage[]
  createdAt: Date
  updatedAt: Date
}

interface OtherProductDisplayPageProps {
  initialProducts: OtherProduct[]
  initialTotal: number
  category: string | null
  productType: string | null
  subType: string | null
}

// Helper function to filter visible images
function getVisibleImages(product: OtherProduct): ProductImage[] {
  if (!product.images || !Array.isArray(product.images)) {
    return []
  }

  return product.images.filter((img: any) => {
    // Handle both object format {url, id, is_hidden} and any other format
    if (typeof img === 'object' && img !== null && 'url' in img && img.url) {
      // If it has is_hidden property, respect it (only include if not hidden)
      if ('is_hidden' in img) {
        return !img.is_hidden
      }
      // If no is_hidden property, include it if it has a valid url
      return true
    }
    return false
  }) as ProductImage[]
}

// Helper function to get file extension from URL
function getFileExtensionFromUrl(url: string): string {
  try {
    // Remove query parameters and hash
    const urlWithoutParams = url.split('?')[0].split('#')[0]
    // Get the last part after the last dot
    const lastDotIndex = urlWithoutParams.lastIndexOf('.')
    if (lastDotIndex !== -1 && lastDotIndex < urlWithoutParams.length - 1) {
      const ext = urlWithoutParams.substring(lastDotIndex + 1).toLowerCase()
      // Validate it's a common image extension
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg']
      if (validExtensions.includes(ext)) {
        return ext === 'jpeg' ? 'jpg' : ext // Normalize jpeg to jpg
      }
    }
  } catch (error) {
    console.error('Error parsing URL extension:', error)
  }
  return 'jpg' // Default fallback
}

// Helper function to get extension from MIME type
function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/svg+xml': 'svg',
  }
  return mimeMap[mimeType.toLowerCase()] || 'jpg'
}

// Utility function to download a single image
async function downloadImage(url: string, filename: string) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    
    // Get extension from MIME type (more accurate than URL)
    const mimeType = blob.type || response.headers.get('content-type') || ''
    const extensionFromMime = getExtensionFromMimeType(mimeType)
    
    // Remove any existing extension and add the correct one from MIME type
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
    const finalFilename = `${nameWithoutExt}.${extensionFromMime}`
    
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = finalFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Error downloading image:', error)
    alert('Failed to download image. Please try again.')
  }
}

// Utility function to download multiple images as a zip
async function downloadMultipleImages(urls: Array<{ url: string; filename: string }>) {
  try {
    // For multiple downloads, we'll download them sequentially with a small delay
    // Note: For better UX with many images, you might want to use a library like JSZip
    // but for simplicity, we'll download them one by one
    for (let i = 0; i < urls.length; i++) {
      await downloadImage(urls[i].url, urls[i].filename)
      // Small delay between downloads to avoid overwhelming the browser
      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    }
  } catch (error) {
    console.error('Error downloading images:', error)
    alert('Failed to download some images. Please try again.')
  }
}

// Component for individual image card - each image gets its own card
function ImageCard({ 
  product, 
  image, 
  imageIndex, 
  cardKey,
  isSelected,
  onSelect,
  onDownload,
  onImageClick
}: { 
  product: OtherProduct
  image: ProductImage
  imageIndex: number
  cardKey: string
  isSelected: boolean
  onSelect: (key: string) => void
  onDownload: (url: string, filename: string) => void
  onImageClick: (product: OtherProduct, image: ProductImage, imageIndex: number) => void
}) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    const extension = getFileExtensionFromUrl(image.url)
    const filename = `${product.categoryName}_${product.productType}_${imageIndex + 1}.${extension}`
    onDownload(image.url, filename)
  }

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(cardKey)
  }

  const handleCardClick = () => {
    onImageClick(product, image, imageIndex)
  }

  return (
    <Card 
      className={`group relative overflow-hidden bg-white dark:bg-gray-800 border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 rounded-2xl cursor-pointer ${
        isSelected 
          ? 'border-purple-500 dark:border-purple-400 ring-2 ring-purple-500/50' 
          : 'border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
      }`}
      onClick={handleCardClick}
    >
      {/* Checkbox overlay */}
      <div className="absolute top-2 left-2 z-10" onClick={handleCheckboxChange}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(cardKey)}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
        />
      </div>
      
      {/* Download button overlay */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon-sm"
          variant="secondary"
          onClick={handleDownload}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
          title="Download image"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative h-96 sm:h-80 md:h-64 w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <Image
          src={image.url}
          alt={`${product.categoryName} - ${product.productType} - Image ${imageIndex + 1}`}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="space-y-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {getProductTypeDisplayName(product.productType)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{product.categoryName}</p>
            {product.subType && (
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-semibold">
                Type: {getProductSubTypeDisplayName(product.subType, product.productType)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function OtherProductDisplayPage({
  initialProducts,
  initialTotal,
  category,
  productType,
  subType,
}: OtherProductDisplayPageProps) {
  const [products, setProducts] = useState<OtherProduct[]>(initialProducts)
  const [allImageCards, setAllImageCards] = useState<Array<{ product: OtherProduct; image: ProductImage; imageIndex: number; key: string }>>(() => {
    // Flatten initial products into image cards
    const cards: Array<{ product: OtherProduct; image: ProductImage; imageIndex: number; key: string }> = []
    initialProducts.forEach((product) => {
      const visibleImages = getVisibleImages(product)
      visibleImages.forEach((image, index) => {
        cards.push({
          product,
          image,
          imageIndex: index,
          key: `${product.id}-${image.id || index}`,
        })
      })
    })
    return cards
  })
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialProducts.length < initialTotal)
  const [skip, setSkip] = useState(initialProducts.length)
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())
  const [viewingImage, setViewingImage] = useState<{ product: OtherProduct; image: ProductImage; imageIndex: number } | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Reset state when filters change
  const filterKey = `${category || ''}-${productType || ''}-${subType || ''}`
  useEffect(() => {
    setProducts(initialProducts)
    const cards: Array<{ product: OtherProduct; image: ProductImage; imageIndex: number; key: string }> = []
    initialProducts.forEach((product) => {
      const visibleImages = getVisibleImages(product)
      visibleImages.forEach((image, index) => {
        cards.push({
          product,
          image,
          imageIndex: index,
          key: `${product.id}-${image.id || index}`,
        })
      })
    })
    setAllImageCards(cards)
    setHasMore(initialProducts.length < initialTotal)
    setSkip(initialProducts.length)
    setSelectedImages(new Set()) // Reset selection when filters change
  }, [filterKey, initialProducts, initialTotal])

  // Function to load more products
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (productType) params.append('productType', productType)
      if (subType) params.append('subType', subType)
      params.append('skip', skip.toString())
      params.append('take', '20')

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()

      if (data.products && data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products])
        
        // Flatten new products into image cards
        const newCards: Array<{ product: OtherProduct; image: ProductImage; imageIndex: number; key: string }> = []
        data.products.forEach((product: OtherProduct) => {
          const visibleImages = getVisibleImages(product)
          visibleImages.forEach((image, index) => {
            newCards.push({
              product,
              image,
              imageIndex: index,
              key: `${product.id}-${image.id || index}`,
            })
          })
        })

        setAllImageCards((prev) => [...prev, ...newCards])
        setSkip((prev) => prev + data.products.length)
        setHasMore(data.hasMore)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more products:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [category, productType, subType, skip, loading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, loading, loadMoreProducts])

  // Handle image selection
  const handleSelectImage = useCallback((key: string) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }, [])

  // Handle select all/deselect all
  const handleSelectAll = useCallback(() => {
    if (selectedImages.size === allImageCards.length) {
      setSelectedImages(new Set())
    } else {
      setSelectedImages(new Set(allImageCards.map(card => card.key)))
    }
  }, [selectedImages.size, allImageCards])

  // Handle individual download
  const handleIndividualDownload = useCallback((url: string, filename: string) => {
    downloadImage(url, filename)
  }, [])

  // Handle bulk download
  const handleBulkDownload = useCallback(async () => {
    if (selectedImages.size === 0) {
      alert('Please select at least one image to download.')
      return
    }

    const selectedCards = allImageCards.filter(card => selectedImages.has(card.key))
    const downloadUrls = selectedCards.map(({ product, image, imageIndex }) => {
      const extension = getFileExtensionFromUrl(image.url)
      const filename = `${product.categoryName}_${product.productType}_${imageIndex + 1}.${extension}`
      return { url: image.url, filename }
    })

    await downloadMultipleImages(downloadUrls)
  }, [selectedImages, allImageCards])

  // Handle image click to open fullscreen
  const handleImageClick = useCallback((product: OtherProduct, image: ProductImage, imageIndex: number) => {
    setViewingImage({ product, image, imageIndex })
  }, [])

  // Handle close fullscreen viewer
  const handleCloseViewer = useCallback(() => {
    setViewingImage(null)
  }, [])


  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
        {/* Header Section */}
        <div className="border-b-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-blue-100/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                {category || "All Products"}
              </h1>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 flex-wrap">
                {productType && (
                  <>
                    <span className="text-lg font-semibold">{getProductTypeDisplayName(productType)}</span>
                    {subType && (
                      <>
                        <span className="text-purple-500">/</span>
                        <span className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                          {getProductSubTypeDisplayName(subType, productType)}
                        </span>
                      </>
                    )}
                  </>
                )}
                {!productType && subType && (
                  <span className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                    {getProductSubTypeDisplayName(subType)}
                  </span>
                )}
                {!productType && !subType && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">Browse all products</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Images Grid - Each image is a separate card */}
        <div className="container mx-auto px-4 py-8">
          {allImageCards.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">No images found</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800">
                    {allImageCards.length} {allImageCards.length === 1 ? 'image' : 'images'} found
                    {initialTotal > allImageCards.length && ` of ${initialTotal}`}
                  </p>
                  {selectedImages.size > 0 && (
                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100/60 dark:bg-purple-900/60 px-4 py-2 rounded-full border border-purple-300 dark:border-purple-700">
                      {selectedImages.size} selected
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="gap-2"
                  >
                    {selectedImages.size === allImageCards.length ? (
                      <>
                        <Square className="h-4 w-4" />
                        Deselect All
                      </>
                    ) : (
                      <>
                        <CheckSquare className="h-4 w-4" />
                        Select All
                      </>
                    )}
                  </Button>
                  {selectedImages.size > 0 && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleBulkDownload}
                      className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Download className="h-4 w-4" />
                      Download Selected ({selectedImages.size})
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allImageCards.map(({ product, image, imageIndex, key }) => (
                  <ImageCard
                    key={key}
                    cardKey={key}
                    product={product}
                    image={image}
                    imageIndex={imageIndex}
                    isSelected={selectedImages.has(key)}
                    onSelect={handleSelectImage}
                    onDownload={handleIndividualDownload}
                    onImageClick={handleImageClick}
                  />
                ))}
              </div>

              {/* Loading indicator and infinite scroll trigger */}
              <div ref={observerTarget} className="py-8">
                {loading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                )}
                {!hasMore && allImageCards.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No more images to load
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Fullscreen Image Viewer Dialog */}
      <Dialog open={!!viewingImage} onOpenChange={(open) => !open && handleCloseViewer()}>
        <DialogContent 
          className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 bg-black border-none rounded-none translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
          showCloseButton={false}
        >
          {viewingImage && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <Image
                src={viewingImage.image.url}
                alt={`${viewingImage.product.categoryName} - ${viewingImage.product.productType} - Image ${viewingImage.imageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              {/* Custom Close Button */}
              <DialogClose className="absolute top-4 right-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white p-2 opacity-80 hover:opacity-100 transition-opacity backdrop-blur-sm">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

