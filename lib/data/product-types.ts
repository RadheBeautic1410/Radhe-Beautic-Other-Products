/**
 * Product types mapping - key to display value
 */
export const productTypes = [
  { key: "sadi", value: "Sadi" },
  { key: "choli", value: "Choli" },
  { key: "lehenga", value: "Lehenga" },
  { key: "threePiece", value: "3 Piece" },
  { key: "kurtiPant", value: "Kurti Pant" },
  { key: "gaune", value: "Gaune" },
  { key: "tunique", value: "Tunique" },
  { key: "chaniya", value: "Chaniya" },
  { key: "dupatta", value: "Dupatta" },
  { key: "kurti", value: "Kurti" },
  { key: "mensKurta", value: "Mens Kurta" },
  { key: "kidsWear", value: "kids Wear" },
  { key: "kanjivaram-sadi", value: "Kanjivaram Sadi" },
  { key: "tussar-sadi", value: "Tussar Sadi" },
  { key: "other", value: "Other" },
];

/**
 * Subtype mapping based on product type key
 */
export const productSubTypes: Record<
  string,
  Array<{ key: string; value: string }>
> = {
  sadi: [
    { key: "cotton-saree", value: "Cotton Saree" },
    { key: "dola-saree", value: "Silk Saree" },
    { key: "bandhani-saree", value: "Bandhani Saree" },
    { key: "gaji-silk-saree", value: "Gaji Silk Saree" },
    { key: "cotton-silk-saree", value: "Cotton Silk saree" },
    { key: "viscose-saree", value: "Viscose saree" },
    { key: "chinon-silk-saree", value: "Chinon silk  saree" },
    { key: "banarasi-saree", value: "Banarasi saree" },
    { key: "georgette-saree", value: "Georgette saree" },
    { key: "ready-to-wear-saree", value: "Ready to wear saree" },
  ],
  choli: [
    { key: "heavy", value: "Heavy" },
    { key: "medium", value: "Medium" },
    { key: "low", value: "Low" },
  ],
  threePiece: [
    { key: "jaypuri-cotton-round", value: "Jaypuri Cotton Round" },
    { key: "jaypuri-cotton-pair", value: "Jaypuri Cotton Pair" },
    { key: "heavy", value: "Heavy" },
    { key: "anarkali", value: "Anarkali" },
    { key: "sarara-pair", value: "Sarara Pair" },
  ],
  kurtiPant: [
    { key: "plazza-pair", value: "Plazza Pair" },
    { key: "codeset", value: "Codeset" },
    { key: "a-line-kurit-pant", value: "A-line Kurit Pant" },
  ],
  chaniya: [
    { key: "chaniya", value: "Only Chaniya" },
    { key: "chaniya-duppata", value: "Chaniya Duppata" },
    { key: "chaniya-blouse-duppata", value: "Chaniya Blouse Duppata" },
  ],
  gaune: [
    { key: "gaune", value: "Only Gaune" },
    { key: "gaune-duppata", value: "Gaune Duppata" },
  ],
  other: [],
};

/**
 * Get display name for a product type key
 * Returns the formatted display name or the original key if not found
 */
export function getProductTypeDisplayName(key: string): string {
  const productType = productTypes.find((pt) => pt.key === key.toLowerCase());
  return productType?.value || key;
}

/**
 * Get display name for a product subtype key
 * Returns the formatted display name or the original key if not found
 */
export function getProductSubTypeDisplayName(
  subTypeKey: string,
  productTypeKey?: string
): string {
  if (!productTypeKey) {
    // Try to find in all subtypes
    for (const subTypes of Object.values(productSubTypes)) {
      const subType = subTypes.find(
        (st) => st.key === subTypeKey.toLowerCase()
      );
      if (subType) return subType.value;
    }
    return subTypeKey;
  }

  const subTypes = productSubTypes[productTypeKey.toLowerCase()];
  if (!subTypes) return subTypeKey;

  const subType = subTypes.find((st) => st.key === subTypeKey.toLowerCase());
  return subType?.value || subTypeKey;
}
