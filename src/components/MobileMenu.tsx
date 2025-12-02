"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "Shop", href: "/shop" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

const MobileMenu = () => {
	return (
		<div className="md:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon">
						<Menu className="w-6 h-6" />
					</Button>
				</SheetTrigger>

				<SheetContent side="right" className="w-100 bg-white">
					<div className="flex items-center justify-between border-b border-gray-200 p-4  transition-transform duration-300">
						<SheetTitle>
							Zain<span className="text-blue-400">Mart</span>
						</SheetTitle>
						<SheetClose asChild>
							<button type="button">
								<X className="w-6 h-6" />
							</button>
						</SheetClose>
					</div>

					<nav className="flex flex-col space-y-4 p-4">
						{navItems.map((item) => (
							<SheetClose asChild key={item.name}>
								<Link
									href={item.href}
									className="text-gray-700 font-medium hover:text-blue-600 transition"
								>
									{item.name}
								</Link>
							</SheetClose>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default MobileMenu;
