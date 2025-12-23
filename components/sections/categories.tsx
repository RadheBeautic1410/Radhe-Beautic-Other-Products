"use client"

import { Reveal } from "@/components/reveal"

const items = [
  {
    title: "Daily Wear Kurtis",
    points: ["Cotton/Rayon blends", "Breathable fabrics", "Repeatable basics"],
    imageUrl: "/daily-wear-kurtis-neatly-folded-stack-warm-tones.jpg",
  },
  {
    title: "Straight Cut",
    points: ["Office‑ready fits", "Solid & minimal prints", "XS–XXL range"],
    imageUrl: "/straight-cut-kurtis-rack-arrangement-clean-aesthet.jpg",
  },
  {
    title: "Anarkali Styles",
    points: ["Festive silhouettes", "Flared drape", "Rich colors"],
    imageUrl: "/anarkali-kurtis-display-on-mannequin-elegant-drape.jpg",
  },
  {
    title: "Party Wear",
    points: ["Premium fabrics", "Subtle shimmer", "Occasion ready"],
    imageUrl: "/party-wear-kurtis-closeup-embellishment-tasteful.jpg",
  },
  {
    title: "Plus Size",
    points: ["Thoughtful grading", "Comfort first", "Flattering cuts"],
    imageUrl: "/plus-size-kurtis-inclusive-fashion-size-tags.jpg",
  },
  {
    title: "Co‑ord / Sets",
    points: ["Top + Bottom", "Ready‑to‑sell", "Great margins"],
    imageUrl: "/kurtis-sets-two-piece-ethnic-wear-flatlay.jpg",
  },
]

export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="py-16 md:py-24 border-t scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="mb-12">
            <span className="inline-block rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold mb-4 border border-accent/30">
              Our Collections
            </span>
            <h2 id="categories-title" className="text-4xl md:text-5xl font-serif font-bold gradient-text">
              Product Categories
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="group relative overflow-hidden rounded-xl border border-accent/20 bg-card hover-lift">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={`${item.title} sample from Radhe Beautic`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-accent mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
