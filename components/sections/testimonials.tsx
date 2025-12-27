"use client"

import { Reveal } from "@/components/reveal"

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Retail Store Owner",
      text: "Radhe Beautic's kurtis are absolutely stunning! The quality is premium and my customers love them. The wholesale prices are unbeatable.",
      image: "/woman-avatar-professional.jpg",
    },
    {
      name: "Amit Patel",
      role: "Online Reseller",
      text: "Fast shipping, excellent packaging, and beautiful designs. I've been ordering from them for 6 months and never had any issues.",
      image: "/man-avatar-professional.jpg",
    },
    {
      name: "Neha Gupta",
      role: "Fashion Boutique Owner",
      text: "The variety of designs is incredible. From traditional to contemporary, they have everything. Highly recommended for wholesale buyers!",
      image: "/woman-avatar-smiling.jpg",
    },
    {
      name: "Rajesh Kumar",
      role: "Individual Customer",
      text: "I bought a few kurtis for personal use and I'm impressed with the quality and fit. Great value for money!",
      image: "/man-avatar-casual.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Indian wear gallary for premium kurtis
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-accent">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
