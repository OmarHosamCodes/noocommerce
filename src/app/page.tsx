import CategorySlider from "@/components/home/CategorySlider";
import Hero from "@/components/home/Hero";
import ProductsGallery from "@/components/home/ProductsGallery";
import { getNewArrivals, getTopSellings } from "@/lib/function";

import type { WooProduct, WooProductCategory } from "@/types/woo";
export const revalidate = 60;

export default async function Home() {
	const newArrivalsFetch: WooProduct[] = await getNewArrivals(4);

	const bestSellings: WooProduct[] = await await getTopSellings(4);

	const categoriesFetch = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
		{
			next: { revalidate: 3600 },
		},
	);

	if (!categoriesFetch.ok) {
		throw new Error("Failed to fetch categories");
	}

	const categories: WooProductCategory[] = await categoriesFetch.json();

	return (
		<>
			<Hero />
			<CategorySlider categories={categories} />
			<ProductsGallery products={newArrivalsFetch} name={"New Arrivals"} />
			<ProductsGallery products={bestSellings} name={"Best Sellings"} />
		</>
	);
}
