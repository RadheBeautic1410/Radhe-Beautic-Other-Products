import { KurtiDisplayPage } from '@/components/kurti-display-page'
import { Metadata } from 'next'
import { getKurtisWithFilters } from '@/src/action/kurti-actions'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const filter = params.filter as string | undefined
  const category = params.category as string | undefined

  let title = 'Kurtis | Radhe Beautic'
  let description = 'Browse our collection of quality kurtis at wholesale prices.'

  if (filter === 'new-releases') {
    title = 'New Releases - Kurtis | Radhe Beautic'
    description = 'Discover our latest kurtis added this week. Fresh styles and designs.'
  } else if (category && category !== 'all') {
    const categoryName = category
      .split(/(?=[A-Z])/)
      .join(' ')
      .replace(/^\w/, (c) => c.toUpperCase())
    title = `${categoryName} - Kurtis | Radhe Beautic`
    description = `Browse our collection of ${categoryName} kurtis. Quality ethnic wear at wholesale prices.`
  }

  return {
    title,
    description,
  }
}

export default async function KurtisPage({ searchParams }: PageProps) {
  const params = await searchParams
  const filter = params.filter as string | undefined
  const category = params.category as string | undefined
  const size = (params.size as string | undefined) || 'all'

  // Fetch kurtis using the new filter action
  const { kurtis, categories, kurtiTypes, sizes } = await getKurtisWithFilters(
    filter,
    category,
    size
  )

  // Determine selected category for display
  const selectedCategory = category || 'all'
  const selectedSize = size

  return (
    <KurtiDisplayPage
      kurtis={kurtis}
      categories={categories}
      kurtiTypes={kurtiTypes}
      sizes={sizes}
      selectedCategory={selectedCategory}
      selectedSize={selectedSize}
    />
  )
}

