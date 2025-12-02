"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navItems, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartSlider from "./CartSlider";
import SearchDialog from "./SearchDialog";
import UserMenu from "./UserMenu";

export default function DesktopNavbar() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"hidden md:block w-full border-b sticky top-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md",
				isScrolled && "shadow-sm",
			)}
		>
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				{/* Logo */}
				<Link
					href="/"
					className="text-2xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
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

				{/* Desktop Navigation */}
				<NavigationMenu>
					<NavigationMenuList>
						{navItems.map((item) => (
							<NavigationMenuItem key={item.name}>
								{item.dropdown && item.dropdown.length > 0 ? (
									<>
										<NavigationMenuTrigger className="font-medium">
											{item.name}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[200px] gap-1 p-2">
												{item.dropdown.map((sub) => (
													<li key={sub.name}>
														<NavigationMenuLink asChild>
															<Link
																href={sub.href}
																className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
															>
																<div className="text-sm font-medium">
																	{sub.name}
																</div>
															</Link>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</NavigationMenuContent>
									</>
								) : (
									<Link
										href={item.href}
										className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
									>
										{item.name}
									</Link>
								)}
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right Icons */}
				<div className="flex items-center gap-2">
					<SearchDialog />
					<UserMenu />
					<CartSlider />
				</div>
			</div>
		</header>
	);
}
