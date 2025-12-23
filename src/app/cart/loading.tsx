import { PageLoader } from '@/components/page-loader'
import { SiteHeader } from '@/components/site-header'

export default function CartLoading() {
  return (
    <>
      {/* <SiteHeader /> */}
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-10 bg-primary/20 rounded-lg w-1/4 animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items Skeleton */}
            <div className="md:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 border rounded-lg">
                  <div className="h-24 w-24 bg-primary/10 rounded-lg animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-primary/20 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-primary/10 rounded w-1/2 animate-pulse"></div>
                    <div className="h-6 bg-accent/20 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Skeleton */}
            <div className="space-y-4">
              <div className="p-6 border rounded-lg space-y-4">
                <div className="h-6 bg-primary/20 rounded w-1/2 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary/10 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-primary/10 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="h-12 bg-accent/20 rounded-lg w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

