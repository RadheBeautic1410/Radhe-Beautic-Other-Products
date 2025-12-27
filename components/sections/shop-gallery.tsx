"use client"

import { Reveal } from "@/components/reveal"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ShopGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const shopImages = [
    {
      src: "/stack-of-designer-kurtis-folded-neatly-wholesale-s.jpg",
      alt: "Indian Wear Gallery shop storefront with welcoming entrance",
    },
    {
      src: "/shop-interior-kurtis-display-organized-racks-premi.jpg",
      alt: "Shop interior with organized kurtis display racks",
    },
    {
      src: "/premium-fitting-room-mirrors-comfortable-seating-e.jpg",
      alt: "Premium fitting room with mirrors and comfortable seating",
    },
    {
      src: "/professional-checkout-counter-trained-staff-custom.jpg",
      alt: "Professional checkout counter with trained staff",
    },
    {
      src: "/attractive-window-display-seasonal-collection-show.jpg",
      alt: "Attractive window display showcasing seasonal collection",
    },
    {
      src: "/organized-storage-inventory-management-quality-con.jpg",
      alt: "Organized storage and inventory management area",
    },
  ]

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shopImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, shopImages.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + shopImages.length) % shopImages.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shopImages.length)
    setAutoPlay(false)
  }

  const goToSlide = (index:any) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  return (
    <section id="shop" className="py-16 md:py-24 bg-card/50 border-t scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal delay={0}>
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold mb-4 border border-accent/30">
              Our Store
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-4">Visit Our Shop</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our premium collection in person. Our modern showroom features the latest designs with expert
              staff to assist you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card">
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              {shopImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-lg font-semibold">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-accent/80 hover:bg-accent text-accent-foreground p-2 rounded-full transition-all duration-200 hover-lift"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-accent/80 hover:bg-accent text-accent-foreground p-2 rounded-full transition-all duration-200 hover-lift"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {shopImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-accent w-8" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="bg-card border border-accent/20 rounded-xl p-8 text-center hover-lift">
            <h3 className="text-2xl font-semibold text-accent mb-4">Visit Us Today</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Located in the heart of the city, our showroom is open Monday to Saturday, 10 AM to 8 PM. Experience our
              collection and speak with our experts about wholesale opportunities.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000"}?text=Hi%20Radhe%20Beautic%2C%20I%27d%20like%20to%20visit%20your%20shop.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Get Directions
              </a>
              <a
                href="tel:+910000000000"
                className="inline-flex items-center justify-center px-6 py-2 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-semibold"
              >
                Call Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
