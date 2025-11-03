"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import AddToCart from "./AddtoCart";
import { WooProduct } from "@/types/woo";
import AddToCartVariation from "./AddtoCartVariation";

const VariableProductView = ({ product }: { product: WooProduct }) => {
  const mainImage = product.images?.[0]?.src || "/placeholder.png";
  const gallery = product.images?.slice(1) || [];
  const description = product.short_description?.replace(/<[^>]*>?/gm, "") || "";

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const [productVariations, setProductVariations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch product variations dynamically
  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const res = await fetch(`/api/products/variations/${product.id}`);
        const data = await res.json();
        setProductVariations(data);
      } catch (err) {
        console.error("Error fetching variations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (product.type === "variable") fetchVariations();
  }, [product.id, product.type]);

  // ✅ Handle attribute selection
  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Match selected variation
  useEffect(() => {
    if (!productVariations.length) return;

    const matched = productVariations.find((variation: any) =>
      Object.entries(selectedOptions).every(([attr, val]) =>
        variation.attributes?.some(
          (a: any) =>
            a.name.toLowerCase() === attr.toLowerCase() &&
            a.option.toLowerCase() === val.toLowerCase()
        )
      )
    );

    setSelectedVariation(matched || null);
  }, [selectedOptions, productVariations]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* ✅ Product Image Gallery */}
      <div className="space-y-4">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={selectedVariation?.image?.src || mainImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Thumbnails */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt || product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Product Info */}
      <div>
        <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

        <div
          className="text-xl font-medium text-blue-600 mb-2"
          dangerouslySetInnerHTML={{
            __html:
              selectedVariation?.price_html ||
              product.price_html ||
              "<span>—</span>",
          }}
        />

        {(product.on_sale || selectedVariation?.on_sale) && (
          <p className="text-sm text-green-600 mb-3 font-medium">On Sale 🎉</p>
        )}

        {description && (
          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        )}

        {/* ✅ Variation Radio Buttons */}
        {!loading &&
          product.attributes?.map(
            (attr) =>
              attr.variation && (
                <div key={attr.id} className="mb-5">
                  <label className="block text-sm font-semibold mb-2">
                    {attr.name}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {attr.options.map((opt: string) => {
                      const isSelected = selectedOptions[attr.name] === opt;
                      return (
                        <label
                          key={opt}
                          className={`cursor-pointer border rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-100 text-blue-800"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          <input
                            type="radio"
                            name={attr.name}
                            value={opt}
                            checked={isSelected}
                            onChange={(e) =>
                              handleOptionChange(attr.name, e.target.value)
                            }
                            className="hidden"
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )
          )}

        {/* ✅ Add to Cart */}
        <AddToCartVariation  product={product} variation={selectedVariation} />

        <div className="mt-2 text-sm text-gray-500">
          Product ID: {selectedVariation?.id || product.id}
        </div>

        {/* ✅ Categories */}
        {product.categories?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="flex flex-wrap gap-2">
              {product.categories.map((cat) => (
                <li
                  key={cat.id}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.description && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div
              className="prose prose-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VariableProductView;
