"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      q: "What is the minimum order quantity for wholesale?",
      a: "For wholesale orders, the minimum quantity is 10 pieces per design. We offer attractive bulk discounts for larger orders.",
    },
    {
      q: "Do you offer customization for bulk orders?",
      a: "Yes! We provide customization options for bulk orders including color variations, embroidery, and printing. Contact us for details.",
    },
    {
      q: "What are the shipping charges?",
      a: "Shipping is free for retail orders above ₹500. For wholesale orders, we offer special shipping rates based on quantity and location.",
    },
    {
      q: "What is your return policy?",
      a: "We offer 7-day returns for defective items. Retail customers can return unused items within 14 days. Wholesale returns are subject to terms.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we ship within India. For international inquiries, please contact us directly via WhatsApp or phone.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept UPI, bank transfer, credit/debit cards, and cash on delivery for retail orders. Wholesale customers can arrange payment terms.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our products and services
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full text-left p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-lg">{faq.q}</h3>
                  <span
                    className={`text-accent text-2xl transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {openIdx === idx && <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
