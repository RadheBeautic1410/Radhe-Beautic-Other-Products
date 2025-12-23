import { KurtiDetailPage } from '@/components/kurti-detail-page'
import { Metadata } from 'next'
import { getKurtiById } from '@/src/action/kurti-actions'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const kurti = await getKurtiById(id)

  if (!kurti) {
    return {
      title: 'Kurti Not Found | Radhe Beautic',
    }
  }

  const kurtiName = kurti.kurtiTypeName || kurti.category || 'Kurti'

  return {
    title: `${kurtiName} - ${kurti.code} | Radhe Beautic`,
    description: `View details for ${kurtiName} (${kurti.code}). ${kurti.customerPrice ? `Price: ₹${kurti.customerPrice.toFixed(2)}` : ''}`,
  }
}

export default async function KurtiDetailPageRoute({ params }: PageProps) {
  const { id } = await params
  const kurti = await getKurtiById(id)

  if (!kurti) {
    notFound()
  }

  return <KurtiDetailPage kurti={kurti} />
}

