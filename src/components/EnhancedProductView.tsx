"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
	CheckCircle,
	Heart,
	Package,
	ShoppingCart,
	Star,
	TruckIcon,
	XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

// Types
interface WooImage {
	id: number;
	src: string;
	alt: string;
}

interface WooCategory {
	id: number;
	name: string;
	slug: string;
}

interface WooProduct {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	description: string;
	short_description: string;
	price: string;
	regular_price: string;
	sale_price: string;
	price_html: string;
	on_sale: boolean;
	stock_status: string;
	average_rating: string;
	rating_count: number;
	type: string;
	sku: string;
	categories: WooCategory[];
	images: WooImage[];
}

const EnhancedProductView = ({ product }: { product: WooProduct }) => {
	const [selectedImage, setSelectedImage] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const rating = parseFloat(product.average_rating || "0");

	const handleFavoriteClick = () => {
		setIsFavorite(!isFavorite);
	};

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
				{/* Left: Image Gallery */}
				<div className="space-y-4">
					<motion.div
						key={selectedImage}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted border shadow-sm"
					>
						<Image
							src={product.images?.[selectedImage]?.src || "/placeholder.png"}
							alt={product.images?.[selectedImage]?.alt || product.name}
							fill
							className="object-contain p-4"
							sizes="(max-width: 1024px) 100vw, 50vw"
							priority
						/>
					</motion.div>

					{/* Thumbnail Grid */}
					{product.images?.length > 1 && (
						<div className="grid grid-cols-5 gap-2">
							{product.images.map((img, index) => (
								<button
									key={img.id}
									type="button"
									onClick={() => setSelectedImage(index)}
									className={cn(
										"relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
										selectedImage === index
											? "border-primary ring-2 ring-primary/20"
											: "border-border hover:border-primary/50",
									)}
								>
									<Image
										src={img.src}
										alt={img.alt}
										fill
										className="object-contain p-1"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Right: Product Info */}
				<div className="space-y-6">
					{/* Sale Badge */}
					{product.on_sale && (
						<Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
							On Sale
						</Badge>
					)}

					{/* Product Title */}
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight">
						{product.name}
					</h1>

					{/* Price + Rating Card */}
					<Card>
						<div className="p-4 space-y-3">
							<div className="flex items-center gap-4 flex-wrap">
								<div className="text-3xl font-bold">
									{product.sale_price ? (
										<>
											<span className="text-primary">
												{siteConfig.currency} {product.sale_price}
											</span>
											<span className="text-xl text-muted-foreground line-through ml-2">
												{siteConfig.currency} {product.regular_price}
											</span>
										</>
									) : (
										<span>
											{siteConfig.currency} {product.price}
										</span>
									)}
								</div>

								{/* Star Rating */}
								{product.rating_count > 0 && (
									<div className="flex items-center gap-2">
										<div className="flex items-center gap-1">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i.toString()}
													className={cn(
														"w-4 h-4",
														i < Math.round(rating)
															? "fill-yellow-400 text-yellow-400"
															: "text-muted",
													)}
												/>
											))}
										</div>
										<span className="text-sm text-muted-foreground">
											({product.rating_count})
										</span>
									</div>
								)}
							</div>

							{/* Stock Status */}
							<div className="flex items-center gap-2">
								{product?.stock_status === "instock" ? (
									<Badge
										variant="outline"
										className="text-green-600 border-green-600"
									>
										<CheckCircle className="w-3 h-3 mr-1" /> In Stock
									</Badge>
								) : (
									<Badge
										variant="outline"
										className="text-destructive border-destructive"
									>
										<XCircle className="w-3 h-3 mr-1" /> Out of Stock
									</Badge>
								)}
							</div>
						</div>
					</Card>

					{/* Short Description */}
					{product.short_description && (
						<div
							className="text-muted-foreground leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: product.short_description,
							}}
						/>
					)}

					{/* Delivery Info Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Card>
							<div className="p-4 flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
									<TruckIcon className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="font-medium text-sm">Free Delivery</p>
									<p className="text-xs text-muted-foreground">
										Orders over $50
									</p>
								</div>
							</div>
						</Card>
						<Card>
							<div className="p-4 flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
									<Package className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="font-medium text-sm">Easy Returns</p>
									<p className="text-xs text-muted-foreground">
										30-day guarantee
									</p>
								</div>
							</div>
						</Card>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						{product?.stock_status === "instock" ? (
							<Button size="lg" className="flex-1">
								<ShoppingCart className="w-4 h-4 mr-2" />
								Add to Cart
							</Button>
						) : (
							<Button size="lg" className="flex-1" disabled>
								Out of Stock
							</Button>
						)}

						<Button
							size="lg"
							variant="outline"
							onClick={handleFavoriteClick}
							className={cn(isFavorite && "text-red-500 border-red-500")}
						>
							<Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
						</Button>
					</div>

					{/* Product Meta */}
					<Card>
						<div className="p-4 space-y-2 text-sm">
							<div className="flex items-center gap-2">
								<span className="text-muted-foreground">SKU:</span>
								<span className="font-medium">{product?.sku || "N/A"}</span>
							</div>
							{product.categories?.length > 0 && (
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground">Categories:</span>
									<div className="flex gap-2 flex-wrap">
										{product.categories.map((cat) => (
											<Badge key={cat.id} variant="secondary">
												{cat.name}
											</Badge>
										))}
									</div>
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>

			{/* Tabs for Description and Reviews */}
			<div className="mt-16">
				<Tabs defaultValue="description" className="w-full">
					<TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
						<TabsTrigger
							value="description"
							className="text-lg font-medium px-8 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
						>
							Description
						</TabsTrigger>
						<TabsTrigger
							value="reviews"
							className="text-lg font-medium px-8 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
						>
							Reviews ({product.rating_count})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="description" className="mt-8">
						<div
							className="prose prose-lg max-w-none"
							dangerouslySetInnerHTML={{
								__html: product.description || "No description available.",
							}}
						/>
					</TabsContent>

					<TabsContent value="reviews" className="mt-8">
						<div className="text-gray-600">
							<p>Customer reviews will be displayed here.</p>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
export default EnhancedProductView;
