import { NextResponse } from 'next/server'
import { getCartItemCount } from '@/src/action/cart-actions'

export async function GET() {
  try {
    const count = await getCartItemCount()
    return NextResponse.json({ count })
  } catch (error) {
    // Return 0 if user is not logged in or error occurs
    return NextResponse.json({ count: 0 })
  }
}

