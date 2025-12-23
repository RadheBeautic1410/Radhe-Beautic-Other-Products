'use server'

import { prisma } from '@/lib/db'

export type CategoryInfo = {
  id: string
  name: string
  code: string | null
}

export type OfferResult = {
  id: string
  name: string
  qty: number
  categories: string[] // Array of category IDs
  categoryNames: CategoryInfo[] // Array of category names with IDs
  image: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Get all active offers with category names
 */
export async function getOffers(): Promise<OfferResult[]> {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log(`[Offers] Found ${offers.length} offers in database`)

    // Fetch all categories to map IDs to names
    const allCategories = await prisma.category.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    })

    // Create a map for quick lookup: categoryId -> category info
    const categoryMap = new Map<string, CategoryInfo>()
    allCategories.forEach((cat) => {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        code: cat.code,
      })
    })

    // Map offers and resolve category names
    return offers.map((offer) => {
      const categoryNames: CategoryInfo[] = offer.categories
        .map((categoryId) => categoryMap.get(categoryId))
        .filter((cat): cat is CategoryInfo => cat !== undefined)

      return {
        id: offer.id,
        name: offer.name,
        qty: offer.qty,
        categories: offer.categories, // Keep IDs for backward compatibility
        categoryNames, // Add resolved category names
        image: offer.image,
        createdAt: offer.createdAt,
        updatedAt: offer.updatedAt,
      }
    })
  } catch (error) {
    console.error('Error fetching offers:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      // If the error is about offer not existing, suggest regenerating Prisma client
      if (error.message.includes('offer') || error.message.includes('Cannot read properties')) {
        console.error('[Offers] Prisma client needs regeneration. Please stop dev server and run: npx prisma generate')
      }
    }
    return []
  }
}

/**
 * Get a single offer by ID with category names
 */
export async function getOfferById(id: string): Promise<OfferResult | null> {
  try {
    const offer = await prisma.offer.findUnique({
      where: { id },
    })

    if (!offer) return null

    // Fetch all categories to map IDs to names
    const allCategories = await prisma.category.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    })

    // Create a map for quick lookup: categoryId -> category info
    const categoryMap = new Map<string, CategoryInfo>()
    allCategories.forEach((cat) => {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        code: cat.code,
      })
    })

    // Resolve category names
    const categoryNames: CategoryInfo[] = offer.categories
      .map((categoryId) => categoryMap.get(categoryId))
      .filter((cat): cat is CategoryInfo => cat !== undefined)

    return {
      id: offer.id,
      name: offer.name,
      qty: offer.qty,
      categories: offer.categories, // Keep IDs for backward compatibility
      categoryNames, // Add resolved category names
      image: offer.image,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    }
  } catch (error) {
    console.error('Error fetching offer:', error)
    return null
  }
}

