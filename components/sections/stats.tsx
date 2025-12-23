"use client"

import { Reveal } from "@/components/reveal"

export function Stats() {
  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "500+", label: "Designs Available" },
    { number: "10+", label: "Years Experience" },
    { number: "100%", label: "Quality Guaranteed" },
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-primary/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
