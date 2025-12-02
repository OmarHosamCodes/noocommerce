"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Product {
	id: number;
	name: string;
	slug: string;
	price: string;
	regular_price?: string;
	sale_price?: string;
	images: { src: string; alt: string }[];
	on_sale: boolean;
}

interface BentoProductCardProps {
	product: Product;
	featured?: boolean;
}

const BentoProductCard = ({
	product,
	featured = false,
}: BentoProductCardProps) => {
	const [imageIndex, setImageIndex] = useState(0);
	const hasMultipleImages = product.images && product.images.length > 1;

	return (
		<Link href={`/products/${product.slug}`}>
			<motion.div
				whileHover={{ y: -8 }}
				whileTap={{ scale: 0.98 }}
				className={`group relative ${featured ? "row-span-2 col-span-2" : ""}`}
			>
				<Card className="overflow-hidden h-full border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
					{/* Image Container */}
					<div
						className={`relative bg-gray-50 overflow-hidden ${
							featured ? "h-96" : "h-64"
						}`}
						onMouseEnter={() => hasMultipleImages && setImageIndex(1)}
						onMouseLeave={() => setImageIndex(0)}
					>
						<Image
							src={product.images[imageIndex]?.src || "/placeholder.png"}
							alt={product.images[imageIndex]?.alt || product.name}
							fill
							className="object-cover group-hover:scale-110 transition-transform duration-500"
						/>

						{/* Sale Badge */}
						{product.on_sale && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className="absolute top-4 right-4 z-10"
							>
								<Badge className="bg-red-500 text-white px-3 py-1 text-sm font-medium">
									SALE
								</Badge>
							</motion.div>
						)}

						{/* Quick View Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							whileHover={{ opacity: 1 }}
							className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<span className="text-white font-medium bg-blue-600 px-6 py-2 rounded-full">
								View Details
							</span>
						</motion.div>
					</div>

					{/* Product Info */}
					<div className={`p-4 ${featured ? "p-6" : ""}`}>
						<h3
							className={`font-medium text-gray-900 mb-2 line-clamp-2 ${
								featured ? "text-2xl font-serif" : "text-lg"
							}`}
						>
							{product.name}
						</h3>

						<div className="flex items-center gap-2">
							{product.sale_price ? (
								<>
									<span
										className={`font-bold text-blue-600 ${
											featured ? "text-3xl" : "text-xl"
										}`}
									>
										${product.sale_price}
									</span>
									<span className="text-gray-400 line-through text-sm">
										${product.regular_price}
									</span>
								</>
							) : (
								<span
									className={`font-bold text-gray-900 ${
										featured ? "text-3xl" : "text-xl"
									}`}
								>
									${product.price}
								</span>
							)}
						</div>
					</div>
				</Card>
			</motion.div>
		</Link>
	);
};

export default BentoProductCard;
