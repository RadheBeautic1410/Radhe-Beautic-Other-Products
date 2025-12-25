"use server";

import { prisma } from "@/lib/db";

export type OtherProductResult = {
  id: string;
  categoryName: string;
  productType: string;
  subType: string | null;
  images: any[];
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Get OtherProducts with flexible filtering and pagination
 * All parameters are optional - if not provided, that filter is not applied
 */
export async function getOtherProducts(
  category?: string | null,
  productType?: string | null,
  subType?: string | null,
  skip: number = 0,
  take: number = 20
): Promise<{ products: OtherProductResult[]; hasMore: boolean; total: number }> {
  try {
    // Build where clause dynamically based on provided filters
    const whereClause: any = {
      AND: [
        { isDeleted: false },
      ],
    };

    // Add category filter if provided
    if (category && category.trim() !== "") {
      whereClause.AND.push({ categoryName: category });
    }

    // Add productType filter if provided
    if (productType && productType.trim() !== "") {
      whereClause.AND.push({ productType: productType });
    }

    // Add subType filter if provided
    if (subType !== undefined && subType !== null && subType.trim() !== "") {
      whereClause.AND.push({ subType: subType });
    }

    // Get total count for pagination
    const total = await prisma.otherProduct.count({
      where: whereClause,
    });

    // Fetch paginated products
    const products = await prisma.otherProduct.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    });

    const hasMore = skip + take < total;

    return {
      products: products.map((product) => ({
        id: product.id,
        categoryName: product.categoryName,
        productType: product.productType,
        subType: product.subType,
        images: product.images,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
      hasMore,
      total,
    };
  } catch (error) {
    console.error("Error fetching other products:", error);
    return { products: [], hasMore: false, total: 0 };
  }
}

/**
 * Get a single OtherProduct by ID
 */
export async function getOtherProductById(
  id: string
): Promise<OtherProductResult | null> {
  try {
    const product = await prisma.otherProduct.findUnique({
      where: { id },
    });

    if (!product || product.isDeleted) {
      return null;
    }

    return {
      id: product.id,
      categoryName: product.categoryName,
      productType: product.productType,
      subType: product.subType,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching other product:", error);
    return null;
  }
}
