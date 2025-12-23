"use client"

import { Reveal } from "@/components/reveal"

export function ContactCTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24 border-t scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-primary/20 to-accent/10 p-8 md:p-12">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="relative">
              <h2 id="contact-title" className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-4">
                Ready to stock Radhe Beautic?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Share your requirements, and we'll suggest fast‑moving styles with pricing and dispatch timelines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+919624281353"
                  className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover-lift text-center transition-smooth"
                >
                  Call Sales
                </a>
                <a
                  href="mailto:info@radhebeautic.com"
                  className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-smooth text-center"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
