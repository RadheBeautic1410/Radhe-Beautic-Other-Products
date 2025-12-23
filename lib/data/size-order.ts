/**
 * Size order for sorting kurti sizes
 */
export const SIZE_ORDER = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "7XL",
  "8XL",
  "9XL",
  "10XL",
]

/**
 * Sort sizes according to the predefined order
 */
export function sortSizesByOrder(sizes: string[]): string[] {
  return sizes.sort((a, b) => {
    const indexA = SIZE_ORDER.findIndex(
      (size) => size.toUpperCase() === a.toUpperCase()
    )
    const indexB = SIZE_ORDER.findIndex(
      (size) => size.toUpperCase() === b.toUpperCase()
    )

    // If both sizes are in the order, sort by their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    // If only one is in the order, prioritize it
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1

    // If neither is in the order, sort alphabetically
    return a.localeCompare(b)
  })
}

