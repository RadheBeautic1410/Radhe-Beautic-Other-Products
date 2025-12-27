'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const sliderImages = [
  // {
  //   src: '/radhey-beautic-shop-storefront-welcoming-entrance-.jpg',
  //   alt: ' - Premium Kurtis Collection',
  //   title: 'Premium Kurtis Collection',
  //   subtitle: 'Discover our latest ethnic wear collection',
  // },
  // {
  //   src: '/shop-interior-kurtis-display-organized-racks-premi.jpg',
  //   alt: 'Shop Interior - Organized Display',
  //   title: 'Quality Assured',
  //   subtitle: 'Handpicked designs for every occasion',
  // },
   {
    src: '/attractive-window-display-seasonal-collection-show.jpg',
    alt: 'Seasonal Collection',
    title: 'Trending Now',
    subtitle: 'Stay in style with our seasonal collections',
  },  
]

// Auto-play duration in milliseconds (5 seconds)
const AUTO_PLAY_DURATION = 5000

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set up auto-play interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    }, AUTO_PLAY_DURATION)

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentIndex]) // Restart timer when currentIndex changes

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="relative w-full overflow-hidden group">
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
              <div className="w-full max-w-6xl mx-auto px-4 pb-12 md:pb-16 text-white">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                  {image.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90">{image.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground p-3 rounded-full transition-all duration-200 shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground p-3 rounded-full transition-all duration-200 shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-accent w-8'
                  : 'bg-white/60 w-2 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

