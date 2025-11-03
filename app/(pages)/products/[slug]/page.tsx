import Image from "next/image";
import React from "react";
import AddToCart from "./AddtoCart";
import SimpleProductView from "./VariableProductView";
import VariableProductView from "./VariableProductView";
import { WooProduct } from "@/types/woo";

// ✅ Component
const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: WooProduct = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {product.type === "simple" && <SimpleProductView product={product} />}

      {product.type === "variable" && <VariableProductView product={product} />}
      
    </div>
  );
};

export default ProductPage;
