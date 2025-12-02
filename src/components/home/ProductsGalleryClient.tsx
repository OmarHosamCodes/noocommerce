"use client";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VariableProductCard from "@/components/VariableProductCard";
import { useProducts } from "@/hooks/useApi";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

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
			<section className="w-full py-12 md:py-16">
				<div className="container px-4">
					<div className="flex justify-center items-center py-20">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="w-full py-12 md:py-16">
				<div className="container px-4">
					<div className="flex justify-center items-center py-20">
						<p className="text-destructive">Failed to load products</p>
					</div>
				</div>
			</section>
		);
	}

	const products = data?.products || [];

	if (products.length === 0) {
		return null;
	}

	return (
		<section className="w-full py-12 md:py-16 bg-background">
			<div className="container px-4">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="text-3xl font-bold tracking-tight">{name}</h2>
						<p className="text-muted-foreground mt-1">
							Discover our {name.toLowerCase()} collection
						</p>
					</div>
					<Button variant="ghost" asChild className="hidden md:flex group">
						<Link href="/shop">
							View All
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>

				<Separator className="mb-8" />

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product) =>
						product.type === "simple" ? (
							<ProductCard key={product.id} product={product} />
						) : (
							<VariableProductCard key={product.id} product={product} />
						),
					)}
				</div>

				<div className="flex justify-center mt-8">
					<Button variant="outline" asChild className="md:hidden">
						<Link href="/shop">View All Products</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
