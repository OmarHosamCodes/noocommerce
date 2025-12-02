"use client";

import { motion, useAnimation } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

const AnimatedCartIcon = () => {
	const { items } = useCartStore();
	const controls = useAnimation();
	const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

	// Shake animation when cart count changes
	useEffect(() => {
		if (cartCount > 0) {
			controls.start({
				x: [0, -10, 10, -10, 10, 0],
				transition: { duration: 0.5 },
			});
		}
	}, [cartCount, controls]);

	return (
		<motion.div
			animate={controls}
			className="relative cursor-pointer"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<ShoppingCart className="w-6 h-6 text-gray-700" />
			{cartCount > 0 && (
				<motion.span
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
				>
					{cartCount}
				</motion.span>
			)}
		</motion.div>
	);
};

export default AnimatedCartIcon;
