import { KurtiDisplayPage } from '@/components/kurti-display-page'
import { Metadata } from 'next'
import { getKurtisByCategoryAndSize } from '@/src/action/kurti-actions'

interface PageProps {
  params: Promise<{
    category: string
    size: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, size } = await params
  const categoryName = category === 'all' ? 'All Categories' : category
  const sizeName = size === 'all' ? 'All Sizes' : size

  return {
    title: `Kurtis - ${categoryName} | ${sizeName} | Radhe Beautic`,
    description: `Browse our collection of kurtis in ${categoryName} category, size ${sizeName}. Quality ethnic wear at wholesale prices.`,
  }
}

export default async function ShareByAdminPage({ params }: PageProps) {
  const { category, size } = await params

  // Fetch kurtis, categories, and sizes using server action
  const { kurtis, categories, sizes } = await getKurtisByCategoryAndSize(
    category,
    size
  )

  return (
    <KurtiDisplayPage
      kurtis={kurtis}
      categories={categories}
      sizes={sizes}
      selectedCategory={category}
      selectedSize={size}
    />
  )
}

