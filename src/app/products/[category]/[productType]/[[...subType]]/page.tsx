import { Metadata } from 'next'
import { getOtherProducts } from '@/src/action/other-product-actions'
import { OtherProductDisplayPage } from '@/components/other-product-display-page'

interface PageProps {
  params: Promise<{
    category: string
    productType: string
    subType?: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, productType, subType } = await params

  console.log("category, produtType, subtype",category, productType, );
  
  const subTypeStr = subType && subType.length > 0 ? subType[0] : null
  
  const title = subTypeStr
    ? `${category} - ${productType} - ${subTypeStr} | Radhe Beautic`
    : `${category} - ${productType} | Radhe Beautic`
  
  const description = subTypeStr
    ? `Browse our collection of ${category} products: ${productType} - ${subTypeStr}. Quality products at wholesale prices.`
    : `Browse our collection of ${category} products: ${productType}. Quality products at wholesale prices.`

  return {
    title,
    description,
  }
}

export default async function OtherProductPage({ params }: PageProps) {
  const { category, productType, subType } = await params
  
  // Handle optional subType - if subType array exists and has elements, use first element, otherwise null
  const subTypeValue = subType && subType.length > 0 ? subType[0] : null

  // Fetch products from database
  const products = await getOtherProducts(category, productType, subTypeValue)

  return (
    <OtherProductDisplayPage
      products={products}
      category={category}
      productType={productType}
      subType={subTypeValue}
    />
  )
}

