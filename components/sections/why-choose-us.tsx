"use client"

import { Reveal } from "@/components/reveal"

export function WhyChooseUs() {
  const features = [
    {
      title: "Quality Fabrics",
      desc: "Comfortable blends and consistent dyes suitable for daily wear.",
      icon: "✨",
    },
    { title: "Reliable Sizing", desc: "Well‑graded patterns across popular size ranges.", icon: "📏" },
    { title: "Wholesale Margins", desc: "Competitive pricing designed for retailers and resellers.", icon: "💰" },
    { title: "Pan‑India Shipping", desc: "Fast dispatch with trusted logistics partners.", icon: "🚚" },
    { title: "Custom Labeling", desc: "Brand/label and basic packaging customization available.", icon: "🏷️" },
  ]

  return (
    <section id="why" aria-labelledby="why-title" className="py-16 md:py-24 border-t scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="mb-12">
            <span className="inline-block rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold mb-4 border border-accent/30">
              Why Choose Us
            </span>
            <h2 id="why-title" className="text-4xl md:text-5xl font-serif font-bold gradient-text">
              Why Radhe Beautic
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group relative p-6 rounded-xl border border-accent/20 bg-card hover-lift overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-accent mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
