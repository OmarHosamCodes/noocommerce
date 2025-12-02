"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/lib/config";
import CartSlider from "./CartSlider";
import SearchDialog from "./SearchDialog";
import UserMenu from "./UserMenu";

export default function DesktopNavbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const { scrollY } = useScroll();
	const backgroundColor = useTransform(
		scrollY,
		[0, 100],
		["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"],
	);
	const backdropBlur = useTransform(
		scrollY,
		[0, 100],
		["blur(0px)", "blur(12px)"],
	);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			style={{
				backgroundColor,
				backdropFilter: backdropBlur,
				WebkitBackdropFilter: backdropBlur,
			}}
			className={`hidden md:block w-full border-b sticky top-0 z-50 transition-all duration-300 ${
				isScrolled ? "border-gray-200 shadow-sm" : "border-transparent"
			}`}
		>
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link
					href="/"
					className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2"
				>
					{siteConfig.logo ? (
						<Image
							src={siteConfig.logo}
							alt={siteConfig.logoName}
							height={40}
							width={40}
							className="object-contain"
						/>
					) : (
						siteConfig.logoName
					)}
				</Link>

				{/* Desktop Navigation - Mega Menu Style */}
				<nav className="flex items-center space-x-8 relative">
					{navItems.map((item) => (
						<div key={item.name} className="relative group">
							{item.dropdown && item.dropdown.length > 0 ? (
								<>
									<motion.button
										type="button"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="text-gray-700 font-medium hover:text-blue-600 transition flex items-center gap-1"
									>
										{item.name}
										<ChevronDown className="w-4 h-4" />
									</motion.button>
									{/* Mega Dropdown */}
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										whileHover={{ opacity: 1, y: 0 }}
										className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block
                    w-64 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
									>
										{item?.dropdown.map((sub) => (
											<Link
												key={sub.name}
												href={sub.href}
												className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
											>
												{sub.name}
											</Link>
										))}
									</motion.div>
								</>
							) : (
								<Link
									href={item.href}
									className="text-gray-700 font-medium hover:text-blue-600 transition"
								>
									<motion.span
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="inline-block"
									>
										{item.name}
									</motion.span>
								</Link>
							)}
						</div>
					))}
				</nav>

				{/* Right Icons */}
				<div className="flex items-center gap-3">
					<SearchDialog />
					<UserMenu />
					<CartSlider />
				</div>
			</div>
		</motion.header>
	);
}
