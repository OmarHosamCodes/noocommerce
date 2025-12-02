import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { prefetchCategories, prefetchProducts } from "@/hooks/useApi";
import { siteConfig } from "@/lib/config";
import { getQueryClient } from "@/lib/queryClient";
import ShopPage from "./ShopPage";

export const metadata: Metadata = {
	title: "Shop",
	description: "Browse our complete collection of products",
	openGraph: {
		title: `Shop | ${siteConfig.title}`,
		description: "Browse our complete collection of products",
		url: `${siteConfig.url}/shop`,
		siteName: siteConfig.title,
		type: "website",
	},
};

export default async function page() {
	const queryClient = getQueryClient();

	// Prefetch initial shop data
	await Promise.all([
		prefetchProducts(queryClient, {
			page: 1,
			per_page: 12,
			orderby: "date",
			order: "asc",
		}),
		prefetchCategories(queryClient),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense
				fallback={
					<div className="flex justify-center items-center min-h-[50vh]">
						<Loader2 className="h-8 w-8 animate-spin text-gray-500" />
					</div>
				}
			>
				<ShopPage />
			</Suspense>
		</HydrationBoundary>
	);
}
