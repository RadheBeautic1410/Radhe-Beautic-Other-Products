'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { CartData } from '@/src/action/cart-actions'
import { removeFromCart, updateCartItemQuantity } from '@/src/action/cart-actions'
import { useToast } from '@/hooks/use-toast'
import { getKurtiTypeDisplayName } from '@/lib/data/kurti-types'

interface CartPageProps {
  cart: CartData
}

export function CartPage({ cart }: CartPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const handleQuantityChange = async (
    cartProductId: string,
    size: string,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity = currentQuantity + change
    if (newQuantity < 1) return

    setIsUpdating(cartProductId)
    try {
      const result = await updateCartItemQuantity(cartProductId, size, newQuantity)
      if (result.success) {
        router.refresh()
      } else {
        toast({
          title: 'Update failed',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update quantity. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemove = async (cartProductId: string) => {
    setIsRemoving(cartProductId)
    try {
      const result = await removeFromCart(cartProductId)
      if (result.success) {
        toast({
          title: 'Item removed',
          description: 'Item has been removed from your cart',
        })
        router.refresh()
      } else {
        toast({
          title: 'Remove failed',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsRemoving(null)
    }
  }

  const getPrimaryImage = (images: any[]): string => {
    if (!Array.isArray(images) || images.length === 0) {
      return '/placeholder.svg'
    }
    const visibleImages = images.filter((img: any) => !img.is_hidden)
    return visibleImages.length > 0 ? visibleImages[0].url : images[0].url
  }

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <ShoppingBag className="size-24 text-muted-foreground/30 mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/kurtis">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const primaryImage = getPrimaryImage(item.kurti.images)
              const itemTotal = item.sizes.reduce((sum, sizeItem) => {
                const price = item.kurti.customerPrice || 0
                return sum + price * sizeItem.quantity
              }, 0)

              return (
                <Card key={item.id} className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/kurtis/${item.kurtiId}`}
                        className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"
                      >
                        <Image
                          src={primaryImage}
                          alt={item.kurti.code}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 100vw, 128px"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <Link
                            href={`/kurtis/${item.kurtiId}`}
                            className="text-xl font-semibold hover:text-accent transition-colors"
                          >
                            {item.kurti.code}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">{item.kurti.category}</p>
                        </div>

                        {/* Size and Quantity Controls */}
                        <div className="space-y-3">
                          {item.sizes.map((sizeItem, index) => {
                            const price = item.kurti.customerPrice || 0
                            const sizeTotal = price * sizeItem.quantity

                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/20"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <span className="font-semibold text-sm">Size: {sizeItem.size}</span>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                          handleQuantityChange(item.id, sizeItem.size, sizeItem.quantity, -1)
                                        }
                                        disabled={
                                          isUpdating === item.id ||
                                          isRemoving === item.id ||
                                          sizeItem.quantity <= 1
                                        }
                                      >
                                        <Minus size={14} />
                                      </Button>
                                      <span className="w-12 text-center font-semibold">{sizeItem.quantity}</span>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                          handleQuantityChange(item.id, sizeItem.size, sizeItem.quantity, 1)
                                        }
                                        disabled={isUpdating === item.id || isRemoving === item.id}
                                      >
                                        <Plus size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                      ₹{price.toFixed(2)} × {sizeItem.quantity}
                                    </span>
                                    <span className="font-semibold text-accent">₹{sizeTotal.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                          disabled={isRemoving === item.id}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                          Remove
                        </Button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Item Total</p>
                        <p className="text-2xl font-bold text-accent">₹{itemTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-serif font-bold">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cart.totalItems} items)</span>
                    <span className="font-semibold">₹{cart.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-accent">₹{cart.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-base"
                  size="lg"
                  disabled={cart.items.length === 0}
                >
                  <ShoppingCart size={20} />
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="/kurtis">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}



