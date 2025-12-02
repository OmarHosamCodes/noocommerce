"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import type { WooProduct } from "@/types/woo";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

const ProductCard: React.FC<{ product: WooProduct }> = ({ product }) => {
	const {
		name,
		slug,
		price,
		regular_price,
		sale_price,
		on_sale,
		average_rating,
		rating_count,
		categories,
		images,
	} = product;

	const imageUrl = images?.[0]?.src || "/no-image.png";
	const rating = parseFloat(average_rating || "0");

	return (
		<Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
			{/* Product Image */}
			<Link href={`/products/${slug}`} className="block relative">
				<div className="relative w-full aspect-square bg-muted overflow-hidden">
					<Image
						src={imageUrl}
						alt={name}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-500"
						loading="lazy"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
					/>
					{on_sale && (
						<Badge className="absolute top-3 right-3 bg-destructive hover:bg-destructive">
							Sale
						</Badge>
					)}
				</div>
			</Link>

			{/* Product Details */}
			<CardContent className="p-4 space-y-2">
				{/* Category */}
				{categories && categories.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{categories.slice(0, 2).map((cat) => (
							<Badge key={cat.id} variant="secondary" className="text-xs">
								{cat.name}
							</Badge>
						))}
					</div>
				)}

				{/* Title */}
				<Link
					href={`/products/${slug}`}
					className="block font-medium text-foreground hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]"
				>
					{name}
				</Link>

				{/* Ratings */}
				{rating_count > 0 && (
					<div className="flex items-center gap-1">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-3.5 h-3.5 ${
										i < Math.round(rating)
											? "fill-yellow-400 text-yellow-400"
											: "text-muted"
									}`}
								/>
							))}
						</div>
						<span className="text-xs text-muted-foreground">
							({rating_count})
						</span>
					</div>
				)}

				{/* Price */}
				<div className="flex items-center gap-2">
					{on_sale ? (
						<>
							<span className="text-lg font-bold text-foreground">
								{siteConfig.currency}
								{sale_price}
							</span>
							<span className="text-sm line-through text-muted-foreground">
								{siteConfig.currency}
								{regular_price}
							</span>
						</>
					) : (
						<span className="text-lg font-bold text-foreground">
							{siteConfig.currency}
							{regular_price || price || "—"}
						</span>
					)}
				</div>
			</CardContent>

			<CardFooter className="p-4 pt-0">
				<Button asChild className="w-full group/btn" variant="default">
					<Link href={`/products/${slug}`}>
						<ShoppingCart className="mr-2 h-4 w-4" />
						View Details
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
