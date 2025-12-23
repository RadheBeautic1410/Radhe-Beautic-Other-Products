'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { KurtiResult } from '@/src/action/kurti-actions'
import { useState } from 'react'
import { getKurtiTypeDisplayName } from '@/lib/data/kurti-types'

interface NewReleasesProps {
  kurtis: KurtiResult[]
}

interface KurtiImage {
  url: string
  id: string
  is_hidden?: boolean
}

export function NewReleases({ kurtis }: NewReleasesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Get visible images for a kurti
  const getVisibleImages = (kurti: KurtiResult): KurtiImage[] => {
    if (!Array.isArray(kurti.images)) return []
    return kurti.images.filter((img: any) => !img.is_hidden)
  }

  if (kurtis.length === 0) {
    return null
  }

  return (
    <section id="new-releases" className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold">
              New This Week
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              New Releases
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our latest additions - fresh styles added this week
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {kurtis.map((kurti, index) => {
            const visibleImages = getVisibleImages(kurti)
            const primaryImage = visibleImages[0]?.url || '/placeholder.svg'
            const hasMultipleImages = visibleImages.length > 1

            return (
              <Link
                key={kurti.id}
                href={`/kurtis?category=${kurti.category}`}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card className="h-full overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 group-hover:scale-[1.02]">
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
                    <Image
                      src={primaryImage}
                      alt={kurti.code}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                      NEW
                    </div>
                    {/* Multiple Images Indicator */}
                    {hasMultipleImages && (
                      <div className="absolute top-3 right-3 bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-semibold z-10">
                        +{visibleImages.length - 1}
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-base md:text-lg mb-1 group-hover:text-accent transition-colors">
                          {kurti.kurtiTypeName ? getKurtiTypeDisplayName(kurti.kurtiTypeName) : kurti.category}
                        </h3>
                        <p className="text-sm text-muted-foreground">{kurti.category}</p>
                      </div>
                      {kurti.customerPrice && (
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <div>
                            <span className="text-lg font-bold text-accent">₹{kurti.customerPrice.toFixed(2)}</span>
                          </div>
                          <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                            View →
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/kurtis?filter=new-releases"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-accent font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            View All Products
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

