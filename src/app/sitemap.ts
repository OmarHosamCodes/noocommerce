import type { MetadataRoute } from "next";
import { env } from "@/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/shop`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/checkout`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];

	try {
		// Fetch products for dynamic pages
		const productsRes = await fetch(`${baseUrl}/api/products?per_page=100`, {
			next: { revalidate: 3600 }, // Revalidate every hour
		});

		if (productsRes.ok) {
			const products = await productsRes.json();
			const productPages: MetadataRoute.Sitemap = products.map(
				(product: { slug: string; date_modified: string }) => ({
					url: `${baseUrl}/products/${product.slug}`,
					lastModified: new Date(product.date_modified),
					changeFrequency: "weekly" as const,
					priority: 0.8,
				}),
			);

			return [...staticPages, ...productPages];
		}
	} catch (error) {
		console.error("Error generating sitemap:", error);
	}

	return staticPages;
}
