"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function WhatsAppLeadForm({ className }: Props) {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000" // fallback; set NEXT_PUBLIC_WHATSAPP_NUMBER in Vars

  function formatToIntl(num: string) {
    // Keep digits only
    let digits = num.replace(/\D/g, "")
    if (digits.startsWith("0")) digits = digits.replace(/^0+/, "")
    if (digits.startsWith("91") && digits.length === 12) return digits
    if (digits.length === 10) return `91${digits}`
    return digits // fallback as-is
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length < 10) {
      setError("Please enter a valid phone number.")
      return
    }
    const userShown = cleaned
    const msg = `Hi Radhe Beautic, I'm interested in wholesale Kurtis. My phone: ${userShown}`
    const target = formatToIntl(businessNumber)

    const url = `https://wa.me/${target}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-md", className)} aria-labelledby="lead-form-title">
      <h3 id="lead-form-title" className="sr-only">
        WhatsApp enquiry form
      </h3>
      <div className="flex items-center gap-2">
        <Input
          type="tel"
          inputMode="tel"
          required
          placeholder="Your phone number"
          aria-invalid={!!error}
          aria-describedby={error ? "lead-form-error" : undefined}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">WhatsApp</Button>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">We’ll open WhatsApp to send your message.</div>
      {error && (
        <p id="lead-form-error" role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </form>
  )
}
