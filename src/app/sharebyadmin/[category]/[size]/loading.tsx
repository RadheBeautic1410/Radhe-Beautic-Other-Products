import { PageLoader } from '@/components/page-loader'
import { SiteHeader } from '@/components/site-header'

export default function ShareByAdminCategorySizeLoading() {
  return (
    <>
      {/* <SiteHeader /> */}
      <main className="min-h-screen">
        <PageLoader message="Loading products..." />
      </main>
    </>
  )
}

