import Image from "next/image";
import React from "react";
import AddToCart from "./AddtoCart";
import SimpleProductView from "./VariableProductView";
import VariableProductView from "./VariableProductView";
import { WooProduct } from "@/types/woo";
import { Breadcrumb } from "@/components/Breadcrumb";
import ProductDescription from "./ProductDescription";

// ✅ Component
const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    // { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: WooProduct = await res.json();
  console.log(product);
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Home', href: '/' },
          { title: 'Shop', href: '/shop' },
          { title: product.name, href: '#' }
        ]} />

      <div className="container mx-auto px-4 py-10 bg-white">
        {product.type === "simple" && <SimpleProductView product={product} />}

        {product.type === "variable" && <VariableProductView product={product} />}

      </div>
      <div className="w-full bg-gray-100">
        <div className="container mx-auto px-4">
          <ProductDescription product={product} />
        </div>
      </div>

    </>

  );
};

export default ProductPage;
