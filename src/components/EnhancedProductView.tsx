"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart, ShoppingCart, Star, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/config";

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
		<div className="container mx-auto px-6 py-12">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* Left: Image Gallery */}
				<div className="space-y-4">
					<motion.div
						key={selectedImage}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border-2 border-gray-100"
					>
						<Image
							src={product.images?.[selectedImage]?.src || "/placeholder.png"}
							alt={product.images?.[selectedImage]?.alt || product.name}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
							priority
						/>
					</motion.div>

					{/* Thumbnail Grid */}
					{product.images?.length > 1 && (
						<div className="grid grid-cols-5 gap-3">
							{product.images.map((img, index) => (
								<motion.button
									key={img.id}
									type="button"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setSelectedImage(index)}
									className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
										selectedImage === index
											? "border-blue-600 ring-2 ring-blue-200"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<Image
										src={img.src}
										alt={img.alt}
										fill
										className="object-cover"
									/>
								</motion.button>
							))}
						</div>
					)}
				</div>

				{/* Right: Product Info - Buy Box Hierarchy */}
				<div className="space-y-6">
					{/* Sale Badge */}
					{product.on_sale && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="inline-block"
						>
							<span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
								On Sale 🎉
							</span>
						</motion.div>
					)}

					{/* Product Title (Serif H1) */}
					<h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
						{product.name}
					</h1>

					{/* Price + Social Proof (Star rating immediately next to price) */}
					<div className="flex items-center gap-6 flex-wrap">
						<div className="text-4xl font-bold text-gray-900">
							{product.sale_price ? (
								<>
									<span className="text-blue-600">
										{siteConfig.currency} {product.sale_price}
									</span>
									<span className="text-2xl text-gray-400 line-through ml-3">
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
											className={`w-5 h-5 ${
												i < Math.round(rating)
													? "fill-yellow-400 text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-600">
									({product.rating_count} reviews)
								</span>
							</div>
						)}
					</div>

					{/* Stock Status */}
					<div className="flex items-center gap-2">
						{product?.stock_status === "instock" ? (
							<span className="text-green-600 flex items-center gap-2 font-medium">
								<CheckCircle className="w-5 h-5" /> In Stock
							</span>
						) : (
							<span className="text-red-500 flex items-center gap-2 font-medium">
								<XCircle className="w-5 h-5" /> Out of Stock
							</span>
						)}
					</div>

					{/* Short Description */}
					{product.short_description && (
						<div
							className="text-lg text-gray-600 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: product.short_description,
							}}
						/>
					)}

					<Separator className="my-6" />

					{/* Action Buttons */}
					<div className="flex gap-4">
						{product?.stock_status === "instock" ? (
							<motion.div whileTap={{ scale: 0.95 }} className="flex-1">
								<Button className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700">
									<ShoppingCart className="w-5 h-5 mr-2" />
									Add to Cart
								</Button>
							</motion.div>
						) : (
							<Button className="flex-1 h-14 text-lg" disabled>
								Out of Stock
							</Button>
						)}

						<motion.button
							type="button"
							whileTap={{ scale: 0.9 }}
							onClick={handleFavoriteClick}
							className="h-14 w-14 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-red-500 transition-colors"
						>
							<motion.div
								animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
								transition={{ duration: 0.3 }}
							>
								<Heart
									className={`w-6 h-6 ${
										isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
									}`}
								/>
							</motion.div>
						</motion.button>
					</div>

					{/* Product Meta */}
					<div className="pt-6 space-y-2 text-gray-600">
						<div>SKU: {product?.sku || "N/A"}</div>
						{product.categories?.length > 0 && (
							<div className="flex items-center gap-2">
								<span>Categories:</span>
								<div className="flex gap-2">
									{product.categories.map((cat) => (
										<span
											key={cat.id}
											className="bg-gray-100 px-3 py-1 rounded-full text-sm"
										>
											{cat.name}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
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
