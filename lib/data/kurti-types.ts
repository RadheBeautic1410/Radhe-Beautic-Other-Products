/**
 * Kurti types mapping - key to display value
 * This is the source of truth for kurti type names
 */
export const kurtiTypes = [
  { key: 'roundedPair', value: 'Rounded Pair', image: '/kurtis-sets-two-piece-ethnic-wear-flatlay.jpg' },
  { key: 'straightPair', value: 'Straight Pair', image: '/straight-cut-kurtis-rack-arrangement-clean-aesthet.jpg' },
  { key: 'plazzaPair', value: 'Plazza Pair', image: '/designer-palazzo-set-ethnic.jpg' },
  { key: 'sararaPair', value: 'Sarara Pair', image: '/kurtis-sets-two-piece-ethnic-wear-flatlay.jpg' },
  { key: 'straightKurtiPent', value: 'Straight Kurti Pent', image: '/straight-cut-kurtis-rack-arrangement-clean-aesthet.jpg' },
  { key: 'roundKurti', value: 'Round Kurti', image: '/anarkali-kurtis-display-on-mannequin-elegant-drape.jpg' },
  { key: 'straightKurti', value: 'Straight Kurti', image: '/printed-straight-kurti-casual.jpg' },
  { key: 'straight', value: 'Straight', image: '/straight-cut-kurtis-rack-arrangement-clean-aesthet.jpg' },
  { key: 'onlyPent', value: 'Only Pant', image: '/designer-palazzo-set-ethnic.jpg' },
  { key: 'lehengaCholi', value: 'Lehenga Choli', image: '/anarkali-kurtis-flowing-silhouette-on-mannequin.jpg' },
  { key: 'codeSet', value: 'Code-Set', image: '/kurtis-sets-two-piece-ethnic-wear-flatlay.jpg' },
  { key: 'tunique', value: 'Tunique', image: '/cotton-blend-kurti-comfortable.jpg' },
  { key: 'gaune', value: 'Gaune', image: '/anarkali-kurtis-display-on-mannequin-elegant-drape.jpg' },
  { key: 'aLineKurti', value: 'A-Line Kurti', image: '/anarkali-kurtis-flowing-silhouette-on-mannequin.jpg' },
  { key: 'aLineKurtiPant', value: 'A-Line Kurti Pant', image: '/designer-palazzo-set-ethnic.jpg' },
  { key: 'roundedKurtiPant', value: 'Round & Kurti Pant', image: '/kurtis-sets-two-piece-ethnic-wear-flatlay.jpg' },
]

/**
 * Get display name for a kurti type key
 * Returns the formatted display name or the original key if not found
 */
export function getKurtiTypeDisplayName(key: string | null | undefined): string {
  if (!key) return ''
  const kurtiType = kurtiTypes.find((type) => type.key.toLowerCase() === key.toLowerCase())
  return kurtiType?.value || key
}

