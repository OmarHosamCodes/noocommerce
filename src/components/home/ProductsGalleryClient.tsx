"use client";

import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import VariableProductCard from "@/components/VariableProductCard";
import { useProducts } from "@/hooks/useApi";

interface ProductsGalleryClientProps {
	name: string;
	initialParams?: Record<string, unknown>;
}

export default function ProductsGalleryClient({
	name,
	initialParams,
}: ProductsGalleryClientProps) {
	const { data, isLoading, error } = useProducts(initialParams);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader2 className="h-8 w-8 animate-spin text-gray-500" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center py-20">
				<p className="text-red-500">Failed to load products</p>
			</div>
		);
	}

	const products = data?.products || [];

	if (products.length === 0) {
		return null;
	}

	return (
		<div className="container mx-auto px-4 py-10">
			<h2 className="text-3xl font-bold text-center mb-8">{name}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) =>
					product.type === "simple" ? (
						<ProductCard key={product.id} product={product} />
					) : (
						<VariableProductCard key={product.id} product={product} />
					),
				)}
			</div>
		</div>
	);
}
