"use client"

import { Reveal } from "@/components/reveal"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Browse Collection",
      description: "Explore our wide range of traditional and contemporary kurtis designs",
    },
    {
      number: "02",
      title: "Select & Customize",
      description: "Choose your preferred designs, sizes, and colors. Bulk orders can be customized",
    },
    {
      number: "03",
      title: "Place Order",
      description: "Easy ordering process via WhatsApp, phone, or direct contact with our team",
    },
    {
      number: "04",
      title: "Fast Delivery",
      description: "Quick processing and reliable shipping to your doorstep across India",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Simple steps to get your premium kurtis</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.15}>
              <div className="relative">
                <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 hover:border-accent/60 transition-all duration-300 h-full">
                  <div className="text-5xl font-serif font-bold text-accent/30 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
