"use client";

import Link from "next/link";
import { WhatsAppLeadForm } from "@/components/whatsapp-lead-form";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <></>
    // <header className="relative overflow-hidden bg-background">
    //   <div className="absolute inset-0 opacity-30">
    //     <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-glow"></div>
    //     <div
    //       className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-glow"
    //       style={{ animationDelay: "1s" }}
    //     ></div>
    //   </div>

    //   <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
    //     <Reveal className="flex-1" delay={100}>
    //       <div className="space-y-6">
    //         <div>
    //           <span className="inline-block rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold mb-4 border border-accent/30">
    //             <span className="gradient-text">Wholesale & Retail</span>
    //           </span>
    //           <h1 className="text-5xl md:text-6xl font-serif font-bold text-balance leading-tight">
    //             <span className="gradient-text">Radhe Beautic</span>
    //           </h1>
    //         </div>

    //         <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
    //           Premium Kurtis and ethnic wear — crafted for comfort, fit, and everyday elegance. Shop wholesale for bulk
    //           orders or retail for individual pieces. Pan‑India shipping with reliable sizing and competitive margins.
    //         </p>

    //         <div className="flex flex-col sm:flex-row gap-4 pt-4">
    //           <Link
    //             href="#categories"
    //             className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover-lift text-center transition-smooth"
    //           >
    //             Explore Catalog
    //           </Link>
    //           <a
    //             href="https://wa.me/910000000000?text=Hi%20Radhe%20Beautic%2C%20I%27m%20interested%20in%20wholesale%20Kurtis."
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-smooth text-center"
    //           >
    //             WhatsApp Us
    //           </a>
    //         </div>

    //         <WhatsAppLeadForm className="pt-4" />

    //         <div className="text-sm text-muted-foreground pt-4">
    //           ✓ MOQ friendly · ✓ Custom label/packaging · ✓ Fast dispatch
    //         </div>
    //       </div>
    //     </Reveal>

    //     <Reveal className="flex-1 w-full" delay={0}>
    //       <div className="relative">
    //         <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-2xl"></div>
    //         <img
    //           src="/wholesale-kurtis-curated-flatlay-textile-textures.jpg"
    //           alt="Curated selection of wholesale Kurtis by Radhe Beautic"
    //           className="relative w-full h-auto rounded-2xl border border-accent/30 hover-lift"
    //         />
    //       </div>
    //     </Reveal>
    //   </div>
    // </header>
  );
}
