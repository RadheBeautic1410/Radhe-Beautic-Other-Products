import { NextRequest, NextResponse } from 'next/server'
import { getOtherProducts } from '@/src/action/other-product-actions'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || null
    const productType = searchParams.get('productType') || null
    const subType = searchParams.get('subType') || null
    const skip = parseInt(searchParams.get('skip') || '0', 10)
    const take = parseInt(searchParams.get('take') || '20', 10)

    const result = await getOtherProducts(category, productType, subType, skip, take)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { products: [], hasMore: false, total: 0, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

