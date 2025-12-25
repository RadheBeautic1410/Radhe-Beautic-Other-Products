import { ContentSkeleton } from '@/components/page-loader'
import { SiteHeader } from '@/components/site-header'

export default function ProductsLoading() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
        <div className="border-b-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-blue-100/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-2">
              <div className="h-10 bg-primary/20 rounded-lg w-1/4 animate-pulse"></div>
              <div className="h-6 bg-primary/10 rounded-lg w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <ContentSkeleton count={8} />
        </div>
      </main>
    </>
  )
}

