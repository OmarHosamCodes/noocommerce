import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { env } from "@/env";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { WooProductCategory } from "@/types/woo";
import { Skeleton } from "../ui/skeleton";
import { Slider } from "../ui/slider";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

const FilterShop = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const selectedCategory = Number(searchParams.get("category")) || 0;

	const [categories, setCategories] = useState<WooProductCategory[]>([]);

	const minPrice = Number(searchParams.get("minPrice")) || 0;
	const maxPrice = Number(searchParams.get("maxPrice")) || 500;

	const priceRange: [number, number] = [minPrice, maxPrice];
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/categories`);
				const data = await res.json();
				setCategories([{ id: 0, name: "All" }, ...data]);
			} catch (err) {
				console.error("Failed to fetch categories:", err);
			}
		};
		fetchCategories();
	}, []);
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
		<aside className="hidden space-y-4 md:block md:col-span-1">
			{/* Categories */}
			<div className="p-4 bg-white border border-gray-200 rounded-md shadow-xs">
				<h2 className="text-lg font-medium">Filters</h2>
			</div>
			<div className="bg-white border border-gray-200 rounded-md shadow-xs ">
				<h3 className="px-4 py-4 text-lg font-medium border-b border-gray-200">
					Categories
				</h3>
				<ul className="px-2 py-2">
					{categories.length === 0 && (
						<>
							<div className="flex items-center justify-between w-full px-3 py-2 text-left transition rounded-md">
								<Skeleton className="w-full h-6 bg-gray-200" />
							</div>
							<div className="flex items-center justify-between w-full px-3 py-2 text-left transition rounded-md">
								<Skeleton className="w-full h-6 bg-gray-200" />
							</div>
							<div className="flex items-center justify-between w-full px-3 py-2 text-left transition rounded-md">
								<Skeleton className="w-full h-6 bg-gray-200" />
							</div>
						</>
					)}
					{categories.map((cat) => (
						<li key={cat.id || "all"}>
							<button
								type="button"
								onClick={() => updateParams({ category: cat.id, page: 1 })}
								className={cn(
									"w-full text-left px-3 py-2 rounded-md transition flex justify-between items-center",
									selectedCategory === cat.id
										? "text-blue-600 font-medium"
										: "hover:bg-gray-100 text-gray-700",
								)}
							>
								<p>{cat.name}</p>
								{cat.count != null && (
									<p
										className={cn(
											"w-5 h-5 text-center text-xs flex items-center justify-center rounded-full transition",
											selectedCategory === cat.id
												? "bg-blue-600 text-white"
												: "hover:bg-gray-100 text-gray-700",
										)}
									>
										{cat.count}
									</p>
								)}
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* Price Filter */}
			<div className="bg-white border border-gray-200 rounded-md shadow-xs">
				<h2 className="px-4 py-4 text-lg font-medium border-b border-gray-200">
					Price Range
				</h2>
				<div className="p-4 pt-6">
					<Slider
						defaultValue={[minPrice, maxPrice]}
						max={500}
						step={10}
						min={0}
						value={priceRange}
						onValueChange={(value) => {
							updateParams({ minPrice: value[0], maxPrice: value[1], page: 1 });
						}}
					/>
					<div className="flex justify-between mt-2 text-sm text-gray-600">
						<span>
							{siteConfig.currency} {priceRange[0]}
						</span>
						<span>
							{siteConfig.currency} {priceRange[1]}
						</span>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default FilterShop;
