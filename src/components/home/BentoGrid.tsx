"use client";

import { motion } from "framer-motion";
import BentoProductCard from "@/components/BentoProductCard";

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

interface BentoGridProps {
	products: Product[];
}

const BentoGrid = ({ products }: BentoGridProps) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section className="bg-white py-16">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
						Featured Collection
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our handpicked selection of premium products
					</p>
				</motion.div>

				{/* Bento Grid Layout */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr"
				>
					{products.slice(0, 6).map((product, index) => (
						<motion.div
							key={product.id}
							variants={itemVariants}
							className={`
								${index === 0 ? "md:col-span-2 md:row-span-2" : ""}
								${index === 1 ? "md:col-span-2" : ""}
								${index === 2 ? "md:col-span-2" : ""}
							`}
						>
							<BentoProductCard product={product} featured={index === 0} />
						</motion.div>
					))}
				</motion.div>

				{/* View All Button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="text-center mt-12"
				>
					<a
						href="/shop"
						className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
					>
						View All Products
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default BentoGrid;
