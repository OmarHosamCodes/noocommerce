"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import FilterShop from "@/components/shop/Filter";
import MobileFilterMenu from "@/components/shop/MobileFilterMenu";
import Pagination from "@/components/shop/Pagination";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import VariableProductCard from "@/components/VariableProductCard";
import { useProducts } from "@/hooks/useApi";

const sortOptions = [
	{ label: "Default", value: "rating" },
	{ label: "Low to High", value: "price_asc" },
	{ label: "High to Low", value: "price_desc" },
	{ label: "Newest", value: "date" },
];

export default function ShopPage() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// ✅ Read filters from URL
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

	// ✅ Update URL parameters when user changes filter
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
		<div className="bg-gray-50">
			<Breadcrumb
				links={[
					{ title: "Home", href: "/" },
					{ title: "Shop", href: "#" },
				]}
			/>
			<div className="container mx-auto px-4 pb-10 mt-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<FilterShop />

					{/* Main Content */}
					<main className="md:col-span-3 space-y-4">
						{/* Top Bar */}
						<div className="bg-white shadow-xs border border-gray-200 rounded-md px-2 md:px-4 py-3 flex flex-row justify-between items-center gap-2">
							<MobileFilterMenu />
							<p className="flex-1 text-md text-gray-600">
								Showing {products.length} of {totalProducts} products
							</p>

							<Select
								onValueChange={(value) =>
									updateParams({ sortBy: value, page: 1 })
								}
								defaultValue={sortBy}
							>
								<SelectTrigger className="w-[100px] md:w-[200px] border border-gray-200 shadow-none">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent className="bg-white border border-gray-200 ">
									{sortOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Products Grid */}
						{isLoading ? (
							<ProductGridSkeleton />
						) : error ? (
							<div className="text-center py-20 text-red-500">
								Failed to load products. Please try again.
							</div>
						) : products.length > 0 ? (
							<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{products.map((product) => {
									if (product.type === "simple") {
										return <ProductCard key={product.id} product={product} />;
									} else if (product.type === "variable") {
										return (
											<VariableProductCard key={product.id} product={product} />
										);
									} else if (product.type === "grouped") {
										// return <GroupedProductCard key={product.id} product={product} />;
										return null;
									} else {
										return null; // Fallback if type doesn't match
									}
								})}
							</div>
						) : (
							<div className="text-center py-20 text-gray-500">
								No products found.
							</div>
						)}

						<Pagination totalPages={totalPages} />
					</main>
				</div>
			</div>
		</div>
	);
}
