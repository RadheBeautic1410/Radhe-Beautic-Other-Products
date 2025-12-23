'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { OfferResult } from '@/src/action/offer-actions'
import { Tag, ShoppingBag, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'

interface OffersProps {
  offers: OfferResult[]
}

export function Offers({ offers }: OffersProps) {
  return (
    <section id="offers" className="py-16 px-4 bg-gradient-to-b from-primary/5 via-accent/5 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <Reveal delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="bg-gradient-to-r from-accent/20 to-primary/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold border border-accent/30">
                Special Offers
              </span>
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Exclusive Deals
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on these amazing offers - Limited time only!
            </p>
          </div>
        </Reveal>

        {/* Offers Grid or Empty State */}
        {offers.length === 0 ? (
          <Reveal delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
                <ShoppingBag className="h-12 w-12 text-accent/60" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                No Offers Available Right Now
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Check back soon for exciting deals and special offers on our premium kurtis collection!
              </p>
              <Link
                href="/kurtis"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-accent font-semibold rounded-lg transition-all duration-300 hover:scale-105 border-2 border-accent/20 hover:border-accent/40"
              >
                <ShoppingBag className="h-5 w-5" />
                Browse All Products
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-8">
            {offers.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 0.1}>
              <Card className="pb-6 group h-full overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 border-2 border-primary/20 hover:border-accent/60 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/30 hover:scale-[1.02] relative">
                {/* Offer Badge */}
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-accent to-primary text-background px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                  <Tag className="h-3.5 w-3.5" />
                  SPECIAL
                </div>

                {/* Image Container */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
                  {offer.image ? (
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <ShoppingBag className="h-20 w-20 text-accent/40" />
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Content */}
                <CardContent className="px-6 relative">
                  <div className="space-y-4">
                    {/* Offer Title */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {offer.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ShoppingBag className="h-4 w-4" />
                        <span className="text-sm">Minimum Quantity: {offer.qty} pieces</span>
                      </div>
                    </div>

                    {/* Categories */}
                    {offer.categoryNames.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {offer.categoryNames.slice(0, 3).map((categoryInfo, idx) => (
                          <span
                            key={categoryInfo.id}
                            className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20"
                          >
                            {categoryInfo.name}
                          </span>
                        ))}
                        {offer.categoryNames.length > 3 && (
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                            +{offer.categoryNames.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link
                      href={`/kurtis${offer.categoryNames.length > 0 && offer.categoryNames[0].code ? `?category=${offer.categoryNames[0].code}` : ''}`}
                      className="block mt-6"
                    >
                      <div className="w-full px-6 py-3 bg-gradient-to-r from-accent to-primary text-background font-semibold rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 hover:scale-105 flex items-center justify-center gap-2">
                        Shop Now
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </Link>
                  </div>
                </CardContent>

                {/* Corner Decoration */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/60 transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent/20 group-hover:border-accent/60 transition-colors"></div>
              </Card>
            </Reveal>
          ))}
          </div>
        )}

        {/* View All Link - Only show when offers exist */}
        {offers.length > 0 && (
          <Reveal delay={0.5}>
            <div className="text-center mt-12">
              <Link
                href="/kurtis"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-accent font-semibold rounded-lg transition-all duration-300 hover:scale-105 border-2 border-accent/20 hover:border-accent/40"
              >
                <ShoppingBag className="h-5 w-5" />
                View All Products
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

