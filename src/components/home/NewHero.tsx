"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NewHero = () => {
	const fadeInUp = {
		initial: { opacity: 0, y: 60 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6 },
	};

	return (
		<section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-[600px]">
			<div className="container mx-auto px-6 py-12">
				{/* Split-Screen Hero */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
					{/* Left: Static Lifestyle Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
					>
						<Image
							src="/slider/1.webp"
							alt="Featured Product"
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
						<div className="absolute bottom-8 left-8 text-white">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.6 }}
							>
								<span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
									20% OFF
								</span>
								<h2 className="text-3xl font-serif font-bold mb-2">
									Samsung Ultra S24
								</h2>
								<p className="text-gray-200">16/512 GB - Premium Edition</p>
							</motion.div>
						</div>
					</motion.div>

					{/* Right: Scrolling Content/CTA */}
					<div className="space-y-6">
						<motion.div {...fadeInUp}>
							<h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
								Discover Your
								<span className="block text-blue-600">Perfect Tech</span>
							</h1>
						</motion.div>

						<motion.p
							{...fadeInUp}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="text-lg text-gray-600 leading-relaxed"
						>
							Your one-stop shop for all your needs. Discover a wide range of
							premium products at unbeatable prices. Experience quality,
							innovation, and style.
						</motion.p>

						<motion.div
							{...fadeInUp}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="flex gap-4"
						>
							<Link
								href="/shop"
								className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg overflow-hidden transition-all hover:bg-blue-700 hover:scale-105"
							>
								<motion.span
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Shop Now
								</motion.span>
							</Link>
							<Link
								href="/products"
								className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all"
							>
								<motion.span
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Browse Products
								</motion.span>
							</Link>
						</motion.div>

						{/* Stats */}
						<motion.div
							{...fadeInUp}
							transition={{ delay: 0.6, duration: 0.6 }}
							className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
						>
							{[
								{ label: "Products", value: "500+" },
								{ label: "Happy Customers", value: "10K+" },
								{ label: "Brands", value: "50+" },
							].map((stat, index) => (
								<div key={index} className="text-center">
									<p className="text-3xl font-serif font-bold text-gray-900">
										{stat.value}
									</p>
									<p className="text-sm text-gray-600 mt-1">{stat.label}</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewHero;
