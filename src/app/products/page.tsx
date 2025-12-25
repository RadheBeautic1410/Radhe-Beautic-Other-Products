import { Metadata } from 'next'
import { getOtherProducts } from '@/src/action/other-product-actions'
import { OtherProductDisplayPage } from '@/components/other-product-display-page'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const category = params.category as string | undefined
  const productType = params.productType as string | undefined
  const subType = params.subType as string | undefined

  let title = "Products"
  let description = "Browse our collection of quality products at wholesale prices."

  if (category && productType && subType) {
    title = `${category} - ${productType} - ${subType}`
    description = `Browse our collection of ${category} products: ${productType} - ${subType}. Quality products at wholesale prices.`
  } else if (category && productType) {
    title = `${category} - ${productType}`
    description = `Browse our collection of ${category} products: ${productType}. Quality products at wholesale prices.`
  } else if (productType && subType) {
    title = `${productType} - ${subType}`
    description = `Browse all products: ${productType} - ${subType}. Quality products at wholesale prices.`
  } else if (productType) {
    title = `${productType}`
    description = `Browse all ${productType} products. Quality products at wholesale prices.`
  } else if (category) {
    title = `${category}`
    description = `Browse all ${category} products. Quality products at wholesale prices.`
  }

  return {
    title,
    description,
  }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  
  // Get query parameters (all optional)
  const category = params.category as string | undefined
  const productType = params.productType as string | undefined
  const subType = params.subType as string | undefined

  // Fetch initial products with flexible filtering (first page)
  const { products, total } = await getOtherProducts(
    category || null,
    productType || null,
    subType || null,
    0,
    20
  )

  return (
    <OtherProductDisplayPage
      initialProducts={products}
      initialTotal={total}
      category={category || null}
      productType={productType || null}
      subType={subType || null}
    />
  )
}

