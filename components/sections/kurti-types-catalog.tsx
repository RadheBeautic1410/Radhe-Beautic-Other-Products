'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { kurtiTypes } from '@/lib/data/kurti-types'

export function KurtiTypesCatalog() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
      return () => {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }

  return (
    <section id="catalog" className="py-16 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Explore Our Kurti Types
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our diverse collection of kurti styles and designs
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background border border-border shadow-lg p-3 rounded-full transition-all duration-200 ${
              canScrollLeft
                ? 'opacity-100 cursor-pointer'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background border border-border shadow-lg p-3 rounded-full transition-all duration-200 ${
              canScrollRight
                ? 'opacity-100 cursor-pointer'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-foreground" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {kurtiTypes.map((type) => (
              <Link
                key={type.key}
                href={`/kurtis?category=${type.key}`}
                className="group flex-shrink-0 w-[280px] sm:w-[320px]"
              >
                <Card className="h-full overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 group-hover:scale-[1.02]">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <Image
                      src={type.image || '/placeholder.svg'}
                      alt={type.value}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 280px, 320px"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Hover Badge */}
                    <div className="absolute top-4 right-4 bg-accent/90 text-background px-3 py-1.5 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      View Collection
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground text-lg md:text-xl mb-2 group-hover:text-accent transition-colors text-center">
                      {type.value}
                    </h3>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {kurtiTypes.map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
