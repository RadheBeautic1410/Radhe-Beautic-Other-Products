"use client"

import { Reveal } from "@/components/reveal"

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 md:py-24 border-t scroll-mt-24 bg-card/50">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold mb-4 border border-accent/30">
              About Us
            </span>
            <h2 id="about-title" className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
              About Radhe Beautic
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a dedicated supplier of premium Kurtis and coordinated ethnic sets. Whether you're a boutique
              owner, e‑commerce reseller, or individual customer, we offer flexible options: wholesale bulk orders with
              competitive margins, or retail purchases for personal wear. Our collections balance contemporary trends
              with timeless silhouettes across all sizes.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
