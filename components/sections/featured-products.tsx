"use client"

import { Reveal } from "@/components/reveal"

export function FeaturedProducts() {
  const products = [
    {
      name: "Embroidered Anarkali",
      price: "₹599",
      image: "/embroidered-anarkali-kurti-elegant.jpg",
      badge: "Best Seller",
    },
    {
      name: "Printed Straight Kurti",
      price: "₹449",
      image: "/printed-straight-kurti-casual.jpg",
      badge: "New",
    },
    {
      name: "Designer Palazzo Set",
      price: "₹799",
      image: "/designer-palazzo-set-ethnic.jpg",
      badge: "Premium",
    },
    {
      name: "Cotton Blend Kurti",
      price: "₹349",
      image: "/cotton-blend-kurti-comfortable.jpg",
      badge: "Popular",
    },
  ]

  return (
    <section id="featured" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Featured Products
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our most loved and bestselling kurtis</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20">
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-semibold">
                    {product.badge}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">{product.price}</span>
                    <button className="px-3 py-1 bg-primary/20 hover:bg-primary/40 text-accent rounded-lg text-sm font-medium transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
