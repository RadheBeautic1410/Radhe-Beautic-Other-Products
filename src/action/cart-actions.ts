'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getUserId } from '@/src/action/auth-actions'
import { redirect } from 'next/navigation'

/**
 * Get available quantity for a specific size in a kurti
 */
async function getAvailableQuantityForSize(kurtiId: string, size: string): Promise<number> {
  const kurti = await prisma.kurti.findUnique({
    where: { id: kurtiId },
    select: {
      sizes: true,
      countOfPiece: true,
    },
  })

  if (!kurti) return 0

  const sizesArray = Array.isArray(kurti.sizes) ? kurti.sizes : []
  
  // Look for the size in the sizes array
  for (const s of sizesArray) {
    if (typeof s === 'string') {
      if (s.toLowerCase() === size.toLowerCase()) {
        return kurti.countOfPiece || 0
      }
    } else if (s && typeof s === 'object') {
      const sizeValue = (s as any).size || (s as any).name
      if (sizeValue && String(sizeValue).toLowerCase() === size.toLowerCase()) {
        if ((s as any).quantity !== undefined) return Number((s as any).quantity) || 0
        if ((s as any).count !== undefined) return Number((s as any).count) || 0
        if ((s as any).qty !== undefined) return Number((s as any).qty) || 0
        return kurti.countOfPiece || 0
      }
    }
  }
  
  return kurti.countOfPiece || 0
}

export interface CartItem {
  id: string
  kurtiId: string
    kurti: {
      id: string
      code: string
      category: string
      customerPrice: number | null
      images: any[]
    }
  sizes: Array<{ size: string; quantity: number }>
}

export interface CartData {
  id: string
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

/**
 * Get user's cart
 */
export async function getCart(): Promise<CartData | null> {
  const userId = await getUserId()
  if (!userId) {
    return null
  }

  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      isOrdered: 'PENDING',
    },
    include: {
      CartProduct: {
        include: {
          kurti: {
            select: {
              id: true,
              code: true,
              category: true,
              customerPrice: true,
              images: true,
            },
          },
        },
      },
    },
  })

  if (!cart) {
    return {
      id: '',
      items: [],
      totalItems: 0,
      totalAmount: 0,
    }
  }

  // Process cart items
  const items: CartItem[] = cart.CartProduct.map((cp) => {
    // Parse sizes array to extract size and quantity
    const sizesArray: Array<{ size: string; quantity: number }> = []
    if (Array.isArray(cp.sizes)) {
      cp.sizes.forEach((s: any) => {
        if (typeof s === 'object' && s !== null) {
          if (s.size && s.quantity) {
            sizesArray.push({ size: String(s.size), quantity: Number(s.quantity) })
          } else if (s.name && s.quantity) {
            sizesArray.push({ size: String(s.name), quantity: Number(s.quantity) })
          }
        }
      })
    }

    return {
      id: cp.id,
      kurtiId: cp.kurtiId,
      kurti: {
        id: cp.kurti.id,
        code: cp.kurti.code,
        category: cp.kurti.category,
        customerPrice: cp.kurti.customerPrice,
        images: cp.kurti.images,
      },
      sizes: sizesArray,
    }
  })

  // Calculate totals
  let totalItems = 0
  let totalAmount = 0

  items.forEach((item) => {
    item.sizes.forEach((sizeItem) => {
      totalItems += sizeItem.quantity
      const price = item.kurti.customerPrice || 0
      totalAmount += price * sizeItem.quantity
    })
  })

  return {
    id: cart.id,
    items,
    totalItems,
    totalAmount,
  }
}

/**
 * Get cart item count (for badge)
 */
export async function getCartItemCount(): Promise<number> {
  const cart = await getCart()
  return cart?.totalItems || 0
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartProductId: string): Promise<{ success: boolean; message: string }> {
  try {
    const userId = await getUserId()
    if (!userId) {
      return { success: false, message: 'Please login to manage cart' }
    }

    // Verify the cart product belongs to the user's cart
    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        id: cartProductId,
        Cart: {
          userId,
          isOrdered: 'PENDING',
        },
      },
    })

    if (!cartProduct) {
      return { success: false, message: 'Cart item not found' }
    }

    await prisma.cartProduct.delete({
      where: { id: cartProductId },
    })

    revalidatePath('/cart')
    return { success: true, message: 'Item removed from cart' }
  } catch (error) {
    console.error('Error removing from cart:', error)
    return { success: false, message: 'Failed to remove item from cart' }
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  cartProductId: string,
  size: string,
  quantity: number
): Promise<{ success: boolean; message: string }> {
  try {
    const userId = await getUserId()
    if (!userId) {
      return { success: false, message: 'Please login to manage cart' }
    }

    if (quantity < 1) {
      return { success: false, message: 'Quantity must be at least 1' }
    }

    // Verify the cart product belongs to the user's cart
    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        id: cartProductId,
        Cart: {
          userId,
          isOrdered: 'PENDING',
        },
      },
      include: {
        kurti: true,
      },
    })

    if (!cartProduct) {
      return { success: false, message: 'Cart item not found' }
    }

    // Check available quantity
    const availableQuantity = await getAvailableQuantityForSize(cartProduct.kurtiId, size)
    if (quantity > availableQuantity) {
      return {
        success: false,
        message: `Only ${availableQuantity} pieces available for this size`,
      }
    }

    // Update sizes array
    const existingSizes = Array.isArray(cartProduct.sizes) ? cartProduct.sizes : []
    const sizeIndex = existingSizes.findIndex((s: any) => {
      if (typeof s === 'object' && s !== null) {
        return (s.size || s.name)?.toLowerCase() === size.toLowerCase()
      }
      return false
    })

    if (sizeIndex >= 0) {
      // Update existing size quantity
      const updatedSizes = [...existingSizes]
      updatedSizes[sizeIndex] = { size, quantity }
      await prisma.cartProduct.update({
        where: { id: cartProductId },
        data: { sizes: updatedSizes },
      })
    } else {
      return { success: false, message: 'Size not found in cart item' }
    }

    revalidatePath('/cart')
    return { success: true, message: 'Cart updated successfully' }
  } catch (error) {
    console.error('Error updating cart:', error)
    return { success: false, message: 'Failed to update cart' }
  }
}

/**
 * Add item to cart
 */
export async function addToCart(
  kurtiId: string,
  size: string,
  quantity: number
): Promise<{ success: boolean; message: string; redirect?: string }> {
  try {
    // Validate quantity
    if (quantity < 1) {
      return { success: false, message: 'Quantity must be at least 1' }
    }

    // Check available quantity
    const availableQuantity = await getAvailableQuantityForSize(kurtiId, size)
    
    if (quantity > availableQuantity) {
      return {
        success: false,
        message: `Only ${availableQuantity} pieces available for this size. Please reduce quantity.`,
      }
    }

    // Check authentication - return redirect URL if not authenticated
    const userId = await getUserId()
    if (!userId) {
      return {
        success: false,
        message: 'Please login to add items to cart',
        redirect: `/login?redirect=${encodeURIComponent(`/kurtis/${kurtiId}`)}`,
      }
    }

    // Find or create cart for user
    let cart = await prisma.cart.findFirst({
      where: {
        userId,
        isOrdered: 'PENDING',
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          isOrdered: 'PENDING',
        },
      })
    }

    // Check if item already exists in cart with the same size
    const existingCartProduct = await prisma.cartProduct.findFirst({
      where: {
        cartId: cart.id,
        kurtiId,
      },
    })

    if (existingCartProduct) {
      // Check if the same size already exists in the sizes array
      const existingSizes = Array.isArray(existingCartProduct.sizes) ? existingCartProduct.sizes : []
      const sizeIndex = existingSizes.findIndex((s: any) => {
        if (typeof s === 'string') return s.toLowerCase() === size.toLowerCase()
        if (s && typeof s === 'object') {
          return (s.size || s.name)?.toLowerCase() === size.toLowerCase()
        }
        return false
      })

      if (sizeIndex >= 0) {
        // Update quantity for existing size
        const updatedSizes = [...existingSizes]
        const existingSize = updatedSizes[sizeIndex]
        if (typeof existingSize === 'object' && existingSize !== null) {
          updatedSizes[sizeIndex] = {
            ...existingSize,
            quantity: (existingSize.quantity || 0) + quantity,
          }
        } else {
          updatedSizes[sizeIndex] = { size, quantity: quantity }
        }
        
        await prisma.cartProduct.update({
          where: { id: existingCartProduct.id },
          data: {
            sizes: updatedSizes,
          },
        })
      } else {
        // Add new size to existing cart product
        await prisma.cartProduct.update({
          where: { id: existingCartProduct.id },
          data: {
            sizes: [...existingSizes, { size, quantity }],
          },
        })
      }
    } else {
      // Create new cart product
      await prisma.cartProduct.create({
        data: {
          cartId: cart.id,
          kurtiId,
          sizes: [{ size, quantity }],
        },
      })
    }

    revalidatePath('/cart')
    revalidatePath('/kurtis')
    return { success: true, message: 'Item added to cart successfully' }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return { success: false, message: 'Failed to add item to cart' }
  }
}
