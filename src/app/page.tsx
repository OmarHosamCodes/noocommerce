import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import CategorySliderClient from "@/components/home/CategorySliderClient";
import Hero from "@/components/home/Hero";
import ProductsGalleryClient from "@/components/home/ProductsGalleryClient";
import { prefetchCategories, prefetchProducts } from "@/hooks/useApi";
import { siteConfig } from "@/lib/config";
import { getQueryClient } from "@/lib/queryClient";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Home",
	description: siteConfig.description,
	openGraph: {
		title: `Home | ${siteConfig.title}`,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.title,
		type: "website",
	},
};

export default async function Home() {
	const queryClient = getQueryClient();

	// Prefetch data on the server
	await Promise.all([
		prefetchProducts(queryClient, {
			orderby: "date",
			order: "desc",
			per_page: 4,
		}),
		prefetchProducts(queryClient, {
			orderby: "popularity",
			order: "desc",
			per_page: 4,
		}),
		prefetchCategories(queryClient),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Hero />
			<CategorySliderClient />
			<ProductsGalleryClient
				name="New Arrivals"
				initialParams={{ orderby: "date", order: "desc", per_page: 4 }}
			/>
			<ProductsGalleryClient
				name="Best Sellings"
				initialParams={{ orderby: "popularity", order: "desc", per_page: 4 }}
			/>
		</HydrationBoundary>
	);
}
