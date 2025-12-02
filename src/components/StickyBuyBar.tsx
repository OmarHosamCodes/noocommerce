"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

interface StickyBuyBarProps {
	productName: string;
	price: string;
	salePrice?: string;
	onAddToCart: () => void;
	inStock: boolean;
}

const StickyBuyBar = ({
	productName,
	price,
	salePrice,
	onAddToCart,
	inStock,
}: StickyBuyBarProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const { scrollY } = useScroll();
	const opacity = useTransform(scrollY, [300, 400], [0, 1]);

	useEffect(() => {
		const handleScroll = () => {
			// Show sticky bar when user scrolls past the main buy button (approx 400px)
			setIsVisible(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!isVisible) return null;

	return (
		<motion.div
			initial={{ y: 100 }}
			animate={{ y: 0 }}
			exit={{ y: 100 }}
			style={{ opacity }}
			className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg md:hidden"
		>
			<div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
				{/* Product Info */}
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate">
						{productName}
					</p>
					<div className="flex items-center gap-2">
						{salePrice ? (
							<>
								<span className="text-lg font-bold text-blue-600">
									{siteConfig.currency} {salePrice}
								</span>
								<span className="text-sm text-gray-400 line-through">
									{siteConfig.currency} {price}
								</span>
							</>
						) : (
							<span className="text-lg font-bold text-gray-900">
								{siteConfig.currency} {price}
							</span>
						)}
					</div>
				</div>

				{/* Add to Cart Button */}
				<motion.div whileTap={{ scale: 0.95 }}>
					<Button
						onClick={onAddToCart}
						disabled={!inStock}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 h-auto"
					>
						<ShoppingCart className="w-5 h-5 mr-2" />
						Add to Cart
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default StickyBuyBar;
