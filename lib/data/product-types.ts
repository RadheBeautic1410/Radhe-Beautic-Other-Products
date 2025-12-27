/**
 * Product types mapping - key to display value
 */
export const productTypes = [
  { key: "sadi", value: "Sadi" },
  { key: "choli", value: "Choli" },
  { key: "lehenga", value: "Lehenga" },
  { key: "dupatta", value: "Dupatta" },
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
    { key: "cotton-sadi", value: "Cotton Sadi" },
    { key: "silk-sadi", value: "Silk Sadi" },
    { key: "georgette-sadi", value: "Georgette Sadi" },
    { key: "chiffon-sadi", value: "Chiffon Sadi" },
    { key: "linen-sadi", value: "Linen Sadi" },
    { key: "designer-sadi", value: "Designer Sadi" },
    { key: "printed-sadi", value: "Printed Sadi" },
    { key: "embroidered-sadi", value: "Embroidered Sadi" },
    { key: "kanjivaram-sadi", value: "Kanjivaram Sadi" },
    { key: "tussar-sadi", value: "Tussar Sadi" },
  ],
  choli: [
    { key: "backless-choli", value: "Backless Choli" },
    { key: "high-neck-choli", value: "High Neck Choli" },
    { key: "deep-neck-choli", value: "Deep Neck Choli" },
    { key: "crop-top-choli", value: "Crop Top Choli" },
    { key: "designer-choli", value: "Designer Choli" },
    { key: "embroidered-choli", value: "Embroidered Choli" },
    { key: "printed-choli", value: "Printed Choli" },
  ],
  lehenga: [
    { key: "a-line-lehenga", value: "A-Line Lehenga" },
    { key: "circular-lehenga", value: "Circular Lehenga" },
    { key: "mermaid-lehenga", value: "Mermaid Lehenga" },
    { key: "panel-lehenga", value: "Panel Lehenga" },
    { key: "designer-lehenga", value: "Designer Lehenga" },
    { key: "embroidered-lehenga", value: "Embroidered Lehenga" },
    { key: "printed-lehenga", value: "Printed Lehenga" },
  ],
  dupatta: [
    { key: "cotton-dupatta", value: "Cotton Dupatta" },
    { key: "silk-dupatta", value: "Silk Dupatta" },
    { key: "georgette-dupatta", value: "Georgette Dupatta" },
    { key: "chiffon-dupatta", value: "Chiffon Dupatta" },
    { key: "embroidered-dupatta", value: "Embroidered Dupatta" },
    { key: "printed-dupatta", value: "Printed Dupatta" },
    { key: "designer-dupatta", value: "Designer Dupatta" },
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
