import { SiteHeader } from "@/components/site-header"
import { HeroSlider } from "@/components/sections/hero-slider"
import { KurtiTypesCatalog } from "@/components/sections/kurti-types-catalog"
import { NewReleases } from "@/components/sections/new-releases"
import { Offers } from "@/components/sections/offers"
import { getNewReleases } from "@/src/action/kurti-actions"
import { getOffers } from "@/src/action/offer-actions"

export default async function HomePage() {
  // Fetch new releases (random kurtis from last week)
  const newReleases = await getNewReleases(8)
  // Fetch offers
  const offers = await getOffers()

  return (
    <>
      {/* <SiteHeader />
      <main>
        <HeroSlider />
        <Offers offers={offers} />
        <KurtiTypesCatalog />
        <NewReleases kurtis={newReleases} />
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground">
            <p className="text-center">
              © {new Date().getFullYear()} Radhe Beautic · Wholesale & Retail Kurtis · Ethnic Wear
            </p>
          </div>
        </footer>
      </main> */}
    </>
  )
}
