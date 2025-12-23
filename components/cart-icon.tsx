'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CartIcon() {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    // Fetch cart count from API route or server action
    const fetchCartCount = async () => {
      try {
        const response = await fetch('/api/cart/count', { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setCartItemCount(data.count || 0)
        }
      } catch (error) {
        // User might not be logged in, ignore error
      }
    }

    fetchCartCount()

    // Refresh on focus (when user returns to tab)
    const handleFocus = () => {
      fetchCartCount()
    }
    window.addEventListener('focus', handleFocus)

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchCartCount, 5000)

    return () => {
      window.removeEventListener('focus', handleFocus)
      clearInterval(interval)
    }
  }, [])

  return (
    <Link href="/cart">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-background text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}

