"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import FilterShop from "@/components/shop/Filter";
import Pagination from "@/components/shop/Pagination";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import VariableProductCard from "@/components/VariableProductCard";
import { useProducts } from "@/hooks/useApi";
import { Filter, Grid, LayoutGrid } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const sortOptions = [
	{ label: "Default", value: "rating" },
	{ label: "Price: Low to High", value: "price_asc" },
	{ label: "Price: High to Low", value: "price_desc" },
	{ label: "Newest First", value: "date" },
];

export default function ShopPage() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [showFilters, setShowFilters] = useState(false);

	// Read filters from URL
	const selectedCategory = Number(searchParams.get("category")) || 0;
	const minPrice = Number(searchParams.get("minPrice")) || 0;
	const maxPrice = Number(searchParams.get("maxPrice")) || 500;
	const sortBy = searchParams.get("sortBy") || "date";
	const page = Number(searchParams.get("page")) || 1;

	// Build query params for React Query
	const queryParams = useMemo(() => {
		const params: Record<string, unknown> = {
			minPrice,
			maxPrice,
			orderby: sortBy.includes("price") ? "price" : "date",
			order: sortBy.endsWith("desc") ? "desc" : "asc",
			page,
			per_page: 12,
		};
		if (selectedCategory && selectedCategory !== 0) {
			params.category = selectedCategory;
		}
		return params;
	}, [selectedCategory, minPrice, maxPrice, sortBy, page]);

	// Use React Query hook
	const { data, isLoading, error } = useProducts(queryParams);

	const products = data?.products || [];
	const totalPages = data?.pagination?.totalPages || 1;
	const totalProducts = data?.pagination?.total || 0;

	// Update URL parameters when user changes filter
	const updateParams = (
		updates: Record<string, string | number | undefined>,
	) => {
		const newParams = new URLSearchParams(searchParams.toString());
		Object.entries(updates).forEach(([key, value]) => {
			if (
				value === undefined ||
				value === null ||
				value === "" ||
				value === 0
			) {
				newParams.delete(key);
			} else {
				newParams.set(key, String(value));
			}
		});
		router.push(`${pathname}?${newParams.toString()}`);
	};

	return (
		<div className="bg-background min-h-screen">
			<div className="border-b bg-muted/50">
				<div className="container px-4 py-4">
					<Breadcrumb
						links={[
							{ title: "Home", href: "/" },
							{ title: "Shop", href: "#" },
						]}
					/>
				</div>
			</div>

			<div className="container px-4 py-8">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold tracking-tight mb-2">Shop</h1>
					<p className="text-muted-foreground">
						Browse our complete collection of products
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Sidebar Filters - Desktop */}
					<aside className="hidden lg:block">
						<div className="sticky top-4">
							<FilterShop />
						</div>
					</aside>

					{/* Main Content */}
					<main className="lg:col-span-3 space-y-6">
						{/* Toolbar */}
						<Card className="p-4 border-0 shadow-sm">
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
								<div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
									<Button
										variant="outline"
										size="sm"
										className="lg:hidden"
										onClick={() => setShowFilters(!showFilters)}
									>
										<Filter className="mr-2 h-4 w-4" />
										Filters
									</Button>
									<Badge variant="secondary" className="font-normal">
										{totalProducts} Products
									</Badge>
									{products.length > 0 && (
										<span className="text-sm text-muted-foreground">
											Showing {(page - 1) * 12 + 1}-
											{Math.min(page * 12, totalProducts)} of {totalProducts}
										</span>
									)}
								</div>

								<Select
									onValueChange={(value) =>
										updateParams({ sortBy: value, page: 1 })
									}
									defaultValue={sortBy}
								>
									<SelectTrigger className="w-full sm:w-[200px]">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										{sortOptions.map((opt) => (
											<SelectItem key={opt.value} value={opt.value}>
												{opt.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</Card>

						{/* Mobile Filters */}
						{showFilters && (
							<Card className="p-4 lg:hidden border-0 shadow-sm">
								<FilterShop />
							</Card>
						)}

						{/* Products Grid */}
						{isLoading ? (
							<ProductGridSkeleton />
						) : error ? (
							<Card className="p-12 text-center border-0 shadow-sm">
								<div className="text-destructive mb-4">
									<Grid className="h-12 w-12 mx-auto mb-3 opacity-50" />
									<p className="text-lg font-medium">Failed to load products</p>
									<p className="text-sm text-muted-foreground mt-1">
										Please try again later
									</p>
								</div>
							</Card>
						) : products.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{products.map((product) => {
									if (product.type === "simple") {
										return <ProductCard key={product.id} product={product} />;
									}
									if (product.type === "variable") {
										return (
											<VariableProductCard key={product.id} product={product} />
										);
									}
									return null;
								})}
							</div>
						) : (
							<Card className="p-12 text-center border-0 shadow-sm">
								<LayoutGrid className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
								<p className="text-lg font-medium">No products found</p>
								<p className="text-sm text-muted-foreground mt-1">
									Try adjusting your filters
								</p>
							</Card>
						)}

						<Pagination totalPages={totalPages} />
					</main>
				</div>
			</div>
		</div>
	);
}
