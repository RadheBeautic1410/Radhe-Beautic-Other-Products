'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SiteHeader } from '@/components/site-header'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowLeft } from 'lucide-react'
import { getKurtiTypeDisplayName } from '@/lib/data/kurti-types'
import { sortSizesByOrder } from '@/lib/data/size-order'
import { addToCart } from '@/src/action/cart-actions'
import { useToast } from '@/hooks/use-toast'
import { KurtiResult } from '@/src/action/kurti-actions'

interface KurtiImage {
  url: string
  id: string
  is_hidden?: boolean
}

interface KurtiDetailPageProps {
  kurti: KurtiResult
}

/**
 * Extract available sizes from a kurti
 */
function getAvailableSizes(kurti: KurtiResult): string[] {
  const sizes = new Set<string>()
  if (!Array.isArray(kurti.sizes)) return []
  
  kurti.sizes.forEach((s: any) => {
    if (typeof s === 'string') {
      sizes.add(s)
    } else if (s && typeof s === 'object') {
      if (s.size) sizes.add(String(s.size))
      if (s.name) sizes.add(String(s.name))
    } else {
      sizes.add(String(s))
    }
  })
  
  return sortSizesByOrder(Array.from(sizes))
}

/**
 * Get available quantity for a specific size
 */
function getAvailableQuantityForSize(kurti: KurtiResult, size: string): number {
  if (!Array.isArray(kurti.sizes)) {
    return kurti.countOfPiece || 0
  }
  
  for (const s of kurti.sizes) {
    if (typeof s === 'string') {
      if (s.toLowerCase() === size.toLowerCase()) {
        return kurti.countOfPiece || 0
      }
    } else if (s && typeof s === 'object') {
      const sizeValue = s.size || s.name
      if (sizeValue && String(sizeValue).toLowerCase() === size.toLowerCase()) {
        if (s.quantity !== undefined) return Number(s.quantity) || 0
        if (s.count !== undefined) return Number(s.count) || 0
        if (s.qty !== undefined) return Number(s.qty) || 0
        return kurti.countOfPiece || 0
      }
    }
  }
  
  return kurti.countOfPiece || 0
}

export function KurtiDetailPage({ kurti }: KurtiDetailPageProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [quantityError, setQuantityError] = useState<string | null>(null)
  const { toast } = useToast()

  // Get visible images
  const visibleImages: KurtiImage[] = Array.isArray(kurti.images)
    ? kurti.images.filter((img: any) => !img.is_hidden)
    : []

  const hasMultipleImages = visibleImages.length > 1
  const availableSizes = getAvailableSizes(kurti)
  const availableQuantity = selectedSize 
    ? getAvailableQuantityForSize(kurti, selectedSize)
    : 0

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % visibleImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleSizeClick = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize(null)
      setQuantity(1)
      setQuantityError(null)
    } else {
      setSelectedSize(size)
      setQuantity(1)
      setQuantityError(null)
    }
  }

  const handleQuantityChange = (value: string) => {
    const val = parseInt(value) || 0
    const maxQty = availableQuantity
    
    if (val < 1) {
      setQuantity(1)
      setQuantityError(null)
      return
    }
    
    if (val > maxQty) {
      setQuantity(maxQty)
      setQuantityError(`Maximum available quantity is ${maxQty}`)
      toast({
        title: 'Quantity limit exceeded',
        description: `Only ${maxQty} pieces available for size ${selectedSize}`,
        variant: 'destructive',
      })
    } else {
      setQuantity(val)
      setQuantityError(null)
    }
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        description: 'Choose a size before adding to cart',
        variant: 'destructive',
      })
      return
    }

    if (quantity < 1) {
      toast({
        title: 'Invalid quantity',
        description: 'Quantity must be at least 1',
        variant: 'destructive',
      })
      return
    }

    if (quantity > availableQuantity) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${availableQuantity} pieces available for size ${selectedSize}. Please reduce quantity.`,
        variant: 'destructive',
      })
      setQuantityError(`Maximum available quantity is ${availableQuantity}`)
      return
    }

    setIsAddingToCart(true)
    try {
      const result = await addToCart(kurti.id, selectedSize, quantity)
      if (result.success) {
        toast({
          title: 'Added to cart',
          description: `${kurti.kurtiTypeName || kurti.category} (${selectedSize}) x${quantity} added to cart`,
        })
        setSelectedSize(null)
        setQuantity(1)
      } else {
        // Check if redirect is needed
        if (result.redirect) {
          router.push(result.redirect)
          return
        }
        toast({
          title: 'Failed to add to cart',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className="relative h-[500px] sm:h-[600px] w-full overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
                  {visibleImages.length === 0 ? (
                    <Image
                      src="/placeholder.svg"
                      alt={kurti.code}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <>
                      {/* Main Image */}
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
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Navigation Buttons */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-foreground p-3 rounded-full transition-all duration-200 shadow-lg"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-foreground p-3 rounded-full transition-all duration-200 shadow-lg"
                            aria-label="Next image"
                          >
                            <ChevronRight size={24} />
                          </button>

                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                            {visibleImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => goToImage(index)}
                                className={`h-2 rounded-full transition-all duration-200 ${
                                  index === currentImageIndex
                                    ? 'bg-accent w-8'
                                    : 'bg-background/60 w-2 hover:bg-background/80'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>

                          {/* Image Count Badge */}
                          <div className="absolute top-4 right-4 bg-accent/90 text-background px-3 py-1.5 rounded-full text-sm font-semibold z-10">
                            {currentImageIndex + 1}/{visibleImages.length}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </Card>

              {/* Thumbnail Images */}
              {visibleImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {visibleImages.map((image, index) => (
                    <button
                      key={image.id || index}
                      onClick={() => goToImage(index)}
                      className={`relative h-20 sm:h-24 overflow-hidden rounded-md border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-accent'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${kurti.code} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                  {kurti.kurtiTypeName ? getKurtiTypeDisplayName(kurti.kurtiTypeName) : kurti.category}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">Code: {kurti.code}</p>
                {kurti.customerPrice && (
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-accent">₹{kurti.customerPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Category</h3>
                    <p className="text-base">{kurti.category}</p>
                  </div>
                  {kurti.party && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-1">Party</h3>
                      <p className="text-base">{kurti.party}</p>
                    </div>
                  )}
                  {kurti.countOfPiece > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-1">Total Pieces</h3>
                      <p className="text-base">{kurti.countOfPiece}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Sizes */}
              {availableSizes.length > 0 && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold mb-3">Available Sizes</h3>
                    <div className="flex flex-wrap gap-3">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                            selectedSize === size
                              ? 'bg-accent text-background shadow-lg shadow-accent/30 scale-105 ring-2 ring-accent/50'
                              : 'bg-background text-foreground border-2 border-primary/30 hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-md'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quantity Input and Add to Cart */}
              {selectedSize && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold">Quantity</label>
                        {availableQuantity > 0 && (
                          <span className="text-sm text-muted-foreground">
                            Available: {availableQuantity}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          min="1"
                          max={availableQuantity}
                          value={quantity}
                          onChange={(e) => handleQuantityChange(e.target.value)}
                          className={`w-32 h-10 ${
                            quantityError ? 'border-destructive focus-visible:ring-destructive/20' : ''
                          }`}
                          aria-invalid={!!quantityError}
                        />
                        {quantityError && (
                          <p className="text-sm text-destructive">{quantityError}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || quantity > availableQuantity || quantity < 1}
                      className="w-full h-12 text-base"
                      size="lg"
                    >
                      <ShoppingCart size={20} />
                      {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!selectedSize && availableSizes.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Please select a size to add to cart
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground">
            <p className="text-center">
              © {new Date().getFullYear()}  Retail Kurtis · Ethnic Wear
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

