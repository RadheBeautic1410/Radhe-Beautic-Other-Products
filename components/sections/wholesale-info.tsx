"use client"

import { Reveal } from "@/components/reveal"

export function WholesaleInfo() {
  const wholesaleBlocks = [
    {
      title: "Order & MOQ",
      items: [
        "MOQ starts from 20–30 pieces per style or assorted pack.",
        "Mixed sizes & colors available subject to stock.",
        "Sample orders available on request.",
      ],
      icon: "📦",
    },
    {
      title: "Production & Dispatch",
      items: [
        "Ready stock dispatch: 24–72 hours.",
        "Made‑to‑order: 7–15 business days based on style.",
        "Basic brand/label and packaging customization optional.",
      ],
      icon: "⚡",
    },
    {
      title: "Payments",
      items: ["Advance via bank transfer/UPI.", "Bulk pricing tiers available for larger volumes."],
      icon: "💳",
    },
    {
      title: "Shipping",
      items: [
        "Pan‑India delivery through trusted couriers.",
        "International shipping available on request.",
        "Insurance & tracking provided for bulk consignments.",
      ],
      icon: "🌍",
    },
  ]

  const retailBlocks = [
    {
      title: "Easy Ordering",
      items: [
        "Order individual pieces or small quantities.",
        "Browse our full catalog online.",
        "Secure checkout with multiple payment options.",
      ],
      icon: "🛍️",
    },
    {
      title: "Fast Delivery",
      items: [
        "Quick processing: 2–5 business days.",
        "Pan‑India shipping available.",
        "Track your order in real-time.",
      ],
      icon: "📦",
    },
    {
      title: "Quality Assured",
      items: [
        "Premium fabrics and craftsmanship.",
        "Size guides and fit recommendations.",
        "Easy returns and exchanges.",
      ],
      icon: "✨",
    },
    {
      title: "Best Prices",
      items: [
        "Competitive retail pricing.",
        "Regular discounts and seasonal offers.",
        "Loyalty rewards for repeat customers.",
      ],
      icon: "💰",
    },
  ]

  return (
    <section id="wholesale" aria-labelledby="wholesale-title" className="py-16 md:py-24 border-t scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="mb-12">
            <span className="inline-block rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold mb-4 border border-accent/30">
              How We Work
            </span>
            <h2 id="wholesale-title" className="text-4xl md:text-5xl font-serif font-bold gradient-text">
              Wholesale & Retail Options
            </h2>
          </div>
        </Reveal>

        {/* Wholesale Section */}
        <div className="mb-16">
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-accent mb-8">For Wholesalers & Resellers</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wholesaleBlocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 60}>
                <div className="group relative p-6 rounded-xl border border-accent/20 bg-card hover-lift overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">{block.icon}</div>
                    <h4 className="text-lg font-semibold text-accent mb-4">{block.title}</h4>
                    <ul className="space-y-2">
                      {block.items.map((li) => (
                        <li key={li} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">→</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Retail Section */}
        <div>
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-accent mb-8">For Individual Customers</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {retailBlocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 60}>
                <div className="group relative p-6 rounded-xl border border-accent/20 bg-card hover-lift overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">{block.icon}</div>
                    <h4 className="text-lg font-semibold text-accent mb-4">{block.title}</h4>
                    <ul className="space-y-2">
                      {block.items.map((li) => (
                        <li key={li} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">→</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
