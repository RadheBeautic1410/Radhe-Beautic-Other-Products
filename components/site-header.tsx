"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, ShoppingCart } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { CartIcon } from "@/components/cart-icon"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  const nav = [
    { href: "/", label: "Home" },
    { href: "#catalog", label: "Catalog" },
    { href: "/kurtis", label: "All Products" },
  ]

  // Fetch cart count for mobile menu
  useEffect(() => {
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
    const interval = setInterval(fetchCartCount, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <></>
    // <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
    //   <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
    //     <Link href="#" className="font-serif font-bold text-xl tracking-tight text-accent">
    //       Radhe Beautic
    //       <span className="sr-only">Radhe Beautic Home</span>
    //     </Link>

    //     {/* Desktop Navigation */}
    //     <div className="hidden md:flex items-center gap-1">
    //       {nav.map((item) => (
    //         <a
    //           key={item.href}
    //           href={item.href}
    //           className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-smooth"
    //         >
    //           {item.label}
    //         </a>
    //       ))}
    //       <CartIcon />
    //     </div>

    //     {/* Mobile Menu - Hamburger Icon */}
    //     <Sheet open={open} onOpenChange={setOpen}>
    //       <SheetTrigger asChild>
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="md:hidden"
    //           aria-label="Open menu"
    //         >
    //           <Menu className="h-6 w-6" />
    //         </Button>
    //       </SheetTrigger>
    //       <SheetContent side="right" className="w-[300px] sm:w-[400px]">
    //         <SheetHeader>
    //           <SheetTitle className="text-left font-serif text-2xl text-accent">
    //             Radhe Beautic
    //           </SheetTitle>
    //         </SheetHeader>
    //         <nav className="flex flex-col gap-2 mt-8">
    //           {nav.map((item) => (
    //             <a
    //               key={item.href}
    //               href={item.href}
    //               onClick={handleLinkClick}
    //               className="px-4 py-3 text-base font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-smooth border border-transparent hover:border-accent/20"
    //             >
    //               {item.label}
    //             </a>
    //           ))}
    //           <Link
    //             href="/cart"
    //             onClick={handleLinkClick}
    //             className="px-4 py-3 text-base font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-smooth border border-transparent hover:border-accent/20 flex items-center gap-2"
    //           >
    //             <ShoppingCart className="h-5 w-5" />
    //             Cart
    //             {cartItemCount > 0 && (
    //               <span className="ml-auto bg-accent text-background text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
    //                 {cartItemCount > 99 ? '99+' : cartItemCount}
    //               </span>
    //             )}
    //           </Link>
    //         </nav>
    //       </SheetContent>
    //     </Sheet>
    //   </nav>
    // </div>
  )
}
