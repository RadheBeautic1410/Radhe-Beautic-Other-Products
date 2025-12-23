'use server'

import { prisma } from '@/lib/db'

export type KurtiResult = {
  id: string
  code: string
  category: string
  kurtiTypeName?: string | null // Name from Category.kurtiType
  party: string
  sellingPrice: string
  actualPrice: string
  customerPrice: number | null
  images: any[]
  sizes: any[]
  countOfPiece: number
  lastUpdatedTime: Date
}

export type CategoryResult = {
  code: string | null
  name: string
  normalizedLowerCase: string
}

/**
 * Get a single kurti by ID
 */
export async function getKurtiById(id: string): Promise<KurtiResult | null> {
  try {
    // Fetch categories to get kurti type mappings
    const categories = await prisma.category.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        code: true,
        kurtiType: true,
      },
    })

    // Fetch kurti
    const kurti = await prisma.kurti.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        category: true,
        party: true,
        sellingPrice: true,
        actualPrice: true,
        // @ts-ignore - customerPrice exists in schema but Prisma client may need regeneration
        customerPrice: true,
        images: true,
        sizes: true,
        countOfPiece: true,
        lastUpdatedTime: true,
      },
    })

    if (!kurti || kurti.isDeleted) {
      return null
    }

    // Find the category that matches this kurti's category code
    const matchingCategory = categories.find(
      (cat) => cat.code?.toLowerCase() === kurti.category.toLowerCase()
    )

    return {
      ...kurti,
      customerPrice: (kurti as any).customerPrice || null,
      kurtiTypeName: matchingCategory?.kurtiType || null,
    }
  } catch (error) {
    console.error('Error fetching kurti:', error)
    return null
  }
}

export type KurtiTypeResult = {
  key: string
  value: string
}

/**
 * Find matching category code (case-insensitive) - Internal helper
 */
function findMatchingCategoryCode(
  category: string,
  categories: CategoryResult[]
): string | undefined {
  if (!category || category === 'all') return undefined

  const matchingCategory = categories.find(
    (cat) =>
      cat.code?.toLowerCase() === category.toLowerCase() ||
      cat.normalizedLowerCase === category.toLowerCase()
  )

  return matchingCategory?.code || undefined
}

/**
 * Filter kurtis by size (case-insensitive) - Internal helper
 */
function filterKurtisBySize(
  kurtis: KurtiResult[],
  size: string
): KurtiResult[] {
  if (!size || size === 'all') return kurtis

  return kurtis.filter((kurti) => {
    const sizesArray = Array.isArray(kurti.sizes) ? kurti.sizes : []
    return sizesArray.some((s: any) => {
      // Handle different possible structures of size objects
      if (typeof s === 'string') {
        return s.toLowerCase() === size.toLowerCase()
      }
      if (s && typeof s === 'object') {
        return (
          s.size?.toLowerCase() === size.toLowerCase() ||
          s.name?.toLowerCase() === size.toLowerCase() ||
          String(s).toLowerCase() === size.toLowerCase()
        )
      }
      return String(s).toLowerCase() === size.toLowerCase()
    })
  })
}

/**
 * Check if a kurti has at least one available size - Internal helper
 */
function hasAvailableSizes(kurti: KurtiResult): boolean {
  if (!Array.isArray(kurti.sizes) || kurti.sizes.length === 0) {
    return false
  }

  // Check if there's at least one valid size
  return kurti.sizes.some((s: any) => {
    if (typeof s === 'string' && s.trim() !== '') {
      return true
    }
    if (s && typeof s === 'object') {
      return !!(s.size || s.name)
    }
    return String(s).trim() !== ''
  })
}

/**
 * Sort sizes in proper order (XS, S, M, L, XL, etc.)
 */
function sortSizes(sizes: string[]): string[] {
  // Define size order for standard clothing sizes
  const sizeOrder: { [key: string]: number } = {
    'xs': 1,
    's': 2,
    'm': 3,
    'l': 4,
    'xl': 5,
    'xxl': 6,
    '3xl': 7,
    '4xl': 8,
    '5xl': 9,
    '6xl': 10,
    '7xl': 11,
    '8xl': 12,
    '9xl': 13,
    '10xl': 14,
  }

  return sizes.sort((a, b) => {
    const aLower = a.toLowerCase().trim()
    const bLower = b.toLowerCase().trim()

    // Check if both are standard letter sizes
    const aOrder = sizeOrder[aLower]
    const bOrder = sizeOrder[bLower]

    if (aOrder !== undefined && bOrder !== undefined) {
      return aOrder - bOrder
    }

    // If only one is a standard size, prioritize it
    if (aOrder !== undefined) return -1
    if (bOrder !== undefined) return 1

    // Check if both are numeric
    const aNum = parseFloat(aLower)
    const bNum = parseFloat(bLower)

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum
    }

    // If only one is numeric, prioritize numeric
    if (!isNaN(aNum)) return -1
    if (!isNaN(bNum)) return 1

    // Both are non-standard, sort alphabetically
    return aLower.localeCompare(bLower)
  })
}

/**
 * Extract unique sizes from kurtis - Internal helper
 */
function extractUniqueSizes(kurtis: KurtiResult[]): string[] {
  const allSizes = new Set<string>()

  kurtis.forEach((kurti) => {
    const sizesArray = Array.isArray(kurti.sizes) ? kurti.sizes : []
    sizesArray.forEach((s: any) => {
      if (typeof s === 'string' && s.trim() !== '') {
        allSizes.add(s.trim())
      } else if (s && typeof s === 'object') {
        if (s.size && String(s.size).trim() !== '') allSizes.add(String(s.size).trim())
        if (s.name && String(s.name).trim() !== '') allSizes.add(String(s.name).trim())
      } else if (s !== null && s !== undefined && String(s).trim() !== '') {
        allSizes.add(String(s).trim())
      }
    })
  })

  // Convert Set to Array, remove duplicates (already done by Set), and sort properly
  return sortSizes(Array.from(allSizes))
}

/**
 * Fetch all active categories for filter dropdown
 */
export async function getCategories(): Promise<CategoryResult[]> {
  const categories = await prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      code: true,
      name: true,
      normalizedLowerCase: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return categories
}

/**
 * Fetch kurtis with category and size filtering
 */
export async function getKurtisByCategoryAndSize(
  category: string,
  size: string
): Promise<{
  kurtis: KurtiResult[]
  categories: CategoryResult[]
  sizes: string[]
}> {
  // Fetch all categories
  const categories = await getCategories()

  // Find matching category code (case-insensitive)
  const categoryCode = findMatchingCategoryCode(category, categories)

  // Build query for kurtis
  const whereClause: any = {
    isDeleted: false,
  }

  // Filter by category if not "all" - use the exact code from database
  if (categoryCode) {
    whereClause.category = categoryCode
  }

  // Fetch kurtis
  let kurtis = await prisma.kurti.findMany({
    where: whereClause,
    select: {
      id: true,
      code: true,
      category: true,
      party: true,
      sellingPrice: true,
      actualPrice: true,
      // @ts-ignore - customerPrice exists in schema but Prisma client may need regeneration
      customerPrice: true,
      images: true,
      sizes: true,
      countOfPiece: true,
      lastUpdatedTime: true,
    },
    orderBy: {
      lastUpdatedTime: 'desc',
    },
  })

  // Apply case-insensitive category filter if categoryCode wasn't found
  if (category && category !== 'all' && !categoryCode) {
    kurtis = kurtis.filter(
      (kurti) => kurti.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by size and ensure customerPrice is included
  const filteredKurtis = filterKurtisBySize(
    kurtis.map((k) => ({
      ...k,
      customerPrice: (k as any).customerPrice || null,
    })),
    size
  )

  // Extract unique sizes from all kurtis (before size filtering)
  const uniqueSizes = extractUniqueSizes(
    kurtis.map((k) => ({
      ...k,
      customerPrice: (k as any).customerPrice || null,
    }))
  )

  return {
    kurtis: filteredKurtis,
    categories,
    sizes: uniqueSizes,
  }
}

/**
 * Get random kurtis added in the last week
 */
export async function getNewReleases(limit: number = 8): Promise<KurtiResult[]> {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  // Fetch categories to get kurti type mappings
  const categories = await prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      code: true,
      kurtiType: true,
    },
  })

  // Fetch kurtis from the last week
  const recentKurtis = await prisma.kurti.findMany({
    where: {
      isDeleted: false,
      lastUpdatedTime: {
        gte: oneWeekAgo,
      },
    },
    select: {
      id: true,
      code: true,
      category: true,
      party: true,
      sellingPrice: true,
      actualPrice: true,
      // @ts-ignore - customerPrice exists in schema but Prisma client may need regeneration
      customerPrice: true,
      images: true,
      sizes: true,
      countOfPiece: true,
      lastUpdatedTime: true,
    },
    orderBy: {
      lastUpdatedTime: 'desc',
    },
  })

  // Enrich kurtis with kurti type name from Category
  const enrichedKurtis: KurtiResult[] = recentKurtis.map((kurti) => {
    // Find the category that matches this kurti's category code
    const matchingCategory = categories.find(
      (cat) => cat.code?.toLowerCase() === kurti.category.toLowerCase()
    )
    
    return {
      ...kurti,
      customerPrice: (kurti as any).customerPrice || null,
      kurtiTypeName: matchingCategory?.kurtiType || null,
    }
  })

  // Filter out kurtis that don't have any available sizes
  const kurtisWithSizes = enrichedKurtis.filter((kurti) => hasAvailableSizes(kurti))

  // Shuffle and limit results
  const shuffled = [...kurtisWithSizes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}

/**
 * Get all unique kurti types from categories
 */
export async function getKurtiTypes(): Promise<KurtiTypeResult[]> {
  const categories = await prisma.category.findMany({
    where: {
      isDeleted: false,
      kurtiType: {
        not: null,
      },
    },
    select: {
      kurtiType: true,
    },
    distinct: ['kurtiType'],
  })

  // Map kurtiType to display format
  const kurtiTypes: KurtiTypeResult[] = categories
    .filter((cat) => cat.kurtiType)
    .map((cat) => {
      const kurtiType = cat.kurtiType!
      // Convert camelCase to Title Case with proper formatting
      const words = kurtiType.split(/(?=[A-Z])/)
      const formatted = words
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')
      // Handle special case: "A Line" -> "A-Line"
      const displayName = formatted.replace(/\bA\s+Line\b/gi, 'A-Line')
      return {
        key: kurtiType,
        value: displayName,
      }
    })
    .sort((a, b) => a.value.localeCompare(b.value))

  return kurtiTypes
}

/**
 * Get kurtis with filters (new-releases, category/kurtiType)
 * Returns kurtis with kurti type name from Category
 */
export async function getKurtisWithFilters(
  filter?: string,
  category?: string,
  size?: string
): Promise<{
  kurtis: KurtiResult[]
  categories: CategoryResult[]
  kurtiTypes: KurtiTypeResult[]
  sizes: string[]
}> {
  // Fetch all categories to get kurti type mappings
  const categories = await prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      code: true,
      name: true,
      normalizedLowerCase: true,
      kurtiType: true,
    },
  })

  // Build query for kurtis
  const whereClause: any = {
    isDeleted: false,
  }

  // Handle filter=new-releases
  if (filter === 'new-releases') {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    whereClause.lastUpdatedTime = {
      gte: oneWeekAgo,
    }
  }

  // Handle category filter (kurtiType)
  if (category && category !== 'all') {
    // Find categories with matching kurtiType
    const matchingCategories = categories.filter(
      (cat) => cat.kurtiType?.toLowerCase() === category.toLowerCase()
    )
    
    if (matchingCategories.length > 0) {
      // Filter kurtis by category codes that match the kurtiType
      const categoryCodes = matchingCategories
        .map((cat) => cat.code)
        .filter((code): code is string => code !== null)
      
      if (categoryCodes.length > 0) {
        whereClause.category = {
          in: categoryCodes,
        }
      }
    }
  }

  // Fetch kurtis
  let kurtis = await prisma.kurti.findMany({
    where: whereClause,
    select: {
      id: true,
      code: true,
      category: true,
      party: true,
      sellingPrice: true,
      actualPrice: true,
      // @ts-ignore - customerPrice exists in schema but Prisma client may need regeneration
      customerPrice: true,
      images: true,
      sizes: true,
      countOfPiece: true,
      lastUpdatedTime: true,
    },
    orderBy: {
      lastUpdatedTime: 'desc',
    },
  })

  // Enrich kurtis with kurti type name from Category
  const enrichedKurtis: KurtiResult[] = kurtis.map((kurti) => {
    // Find the category that matches this kurti's category code
    const matchingCategory = categories.find(
      (cat) => cat.code?.toLowerCase() === kurti.category.toLowerCase()
    )
    
    return {
      ...kurti,
      customerPrice: (kurti as any).customerPrice || null,
      kurtiTypeName: matchingCategory?.kurtiType || null,
    }
  })

  // Filter out kurtis that don't have any available sizes
  const kurtisWithSizes = enrichedKurtis.filter((kurti) => hasAvailableSizes(kurti))

  // Filter by size if provided
  const filteredKurtis = size && size !== 'all' 
    ? filterKurtisBySize(kurtisWithSizes, size)
    : kurtisWithSizes

  // Extract unique sizes from all kurtis with sizes (before size filtering)
  const uniqueSizes = extractUniqueSizes(kurtisWithSizes)

  // Return categories in the expected format
  const categoryResults: CategoryResult[] = categories.map((cat) => ({
    code: cat.code,
    name: cat.name,
    normalizedLowerCase: cat.normalizedLowerCase,
  }))

  // Get unique kurti types
  const kurtiTypes = await getKurtiTypes()

  return {
    kurtis: filteredKurtis,
    categories: categoryResults,
    kurtiTypes,
    sizes: uniqueSizes,
  }
}

