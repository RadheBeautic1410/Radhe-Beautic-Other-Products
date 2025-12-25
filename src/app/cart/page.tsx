import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { CartPage } from '@/components/cart-page'
import { getCart } from '@/src/action/cart-actions'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Shopping Cart | Radhe Beautic',
  description: 'View and manage your shopping cart items',
}

export default async function CartRoutePage() {
  const cart = await getCart()

  // If user is not logged in, redirect to login
  if (!cart) {
    redirect('/login?redirect=/cart')
  }

  return (
    <>
      {/* <SiteHeader />
      <CartPage cart={cart} /> */}
    </>
  )
}

