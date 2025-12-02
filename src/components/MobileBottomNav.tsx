"use client";

import { motion } from "framer-motion";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const MobileBottomNav = () => {
	const pathname = usePathname();
	const { items } = useCartStore();
	const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

	const navItems = [
		{ href: "/", icon: Home, label: "Home" },
		{ href: "/shop", icon: Search, label: "Search" },
		{ href: "/cart", icon: ShoppingCart, label: "Cart", badge: cartCount },
		{ href: "/profile", icon: User, label: "Account" },
	];

	return (
		<motion.nav
			initial={{ y: 100 }}
			animate={{ y: 0 }}
			className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 md:hidden"
		>
			<div className="flex justify-around items-center h-16 px-4">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className="relative flex flex-col items-center justify-center flex-1 h-full"
						>
							<motion.div whileTap={{ scale: 0.9 }} className="relative">
								<Icon
									className={`w-6 h-6 ${
										isActive ? "text-blue-600" : "text-gray-600"
									}`}
								/>
								{item.badge && item.badge > 0 && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
									>
										{item.badge}
									</motion.span>
								)}
							</motion.div>
							<span
								className={`text-xs mt-1 ${
									isActive ? "text-blue-600 font-medium" : "text-gray-600"
								}`}
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
		</motion.nav>
	);
};

export default MobileBottomNav;
