"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomNav = () => {
	const pathname = usePathname();
	const { items } = useCartStore();
	const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

	const navItems = [
		{ href: "/", icon: Home, label: "Home" },
		{ href: "/shop", icon: Search, label: "Shop" },
		{ href: "/checkout", icon: ShoppingCart, label: "Cart", badge: cartCount },
		{ href: "/profile", icon: User, label: "Account" },
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t md:hidden">
			<div className="flex justify-around items-center h-16 px-2 safe-area-bottom">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"relative flex flex-col items-center justify-center flex-1 h-full transition-colors",
								isActive ? "text-primary" : "text-muted-foreground",
							)}
						>
							<div className="relative">
								<Icon className="w-5 h-5" />
								{item.badge && item.badge > 0 && (
									<Badge
										variant="destructive"
										className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
									>
										{item.badge > 99 ? "99+" : item.badge}
									</Badge>
								)}
							</div>
							<span className="text-xs mt-1 font-medium">{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default MobileBottomNav;
