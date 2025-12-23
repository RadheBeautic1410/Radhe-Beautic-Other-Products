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
 * Get OtherProducts by category, productType, and optionally subType
 */
export async function getOtherProducts(
  category: string,
  productType: string,
  subType?: string | null
): Promise<OtherProductResult[]> {
  try {
    // Build where clause based on whether subType is provided
    const whereClause: any = {
      AND: [
        { categoryName: category },
        { productType: productType },
        { isDeleted: false },
      ],
    };

    // If subType is provided (not null/undefined/empty), filter by it
    // Otherwise, filter for products where subType is null or empty string
    if (subType !== undefined && subType !== null && subType !== "") {
      whereClause.AND.push({ subType: subType });
    } else {
      whereClause.AND.push({
        OR: [{ subType: subType}, { subType: "" }],
      });
    }

    const products = await prisma.otherProduct.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("its saved Products", products);

    return products.map((product) => ({
      id: product.id,
      categoryName: product.categoryName,
      productType: product.productType,
      subType: product.subType,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching other products:", error);
    return [];
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
