"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/config";
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-muted/50 border-t">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Column 1: Brand Info */}
					<div className="space-y-4">
						<h2 className="text-xl font-bold">{siteConfig.title}</h2>
						<p className="text-sm text-muted-foreground">
							Your one-stop shop for quality products. Best prices and fast
							delivery guaranteed.
						</p>
						<div className="flex gap-3">
							<Button variant="ghost" size="icon" asChild>
								<Link href="#" aria-label="Facebook">
									<Facebook className="h-4 w-4" />
								</Link>
							</Button>
							<Button variant="ghost" size="icon" asChild>
								<Link href="#" aria-label="Twitter">
									<Twitter className="h-4 w-4" />
								</Link>
							</Button>
							<Button variant="ghost" size="icon" asChild>
								<Link href="#" aria-label="Instagram">
									<Instagram className="h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>

					{/* Column 2: Customer Service */}
					<div className="space-y-4">
						<h3 className="font-semibold">Customer Service</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									FAQs
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Returns & Refunds
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Shipping Info
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 3: Information */}
					<div className="space-y-4">
						<h3 className="font-semibold">Information</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Blog
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 4: Newsletter */}
					<div className="space-y-4">
						<h3 className="font-semibold">Newsletter</h3>
						<p className="text-sm text-muted-foreground">
							Subscribe for updates on new arrivals and offers.
						</p>
						<form className="flex gap-2">
							<Input
								type="email"
								placeholder="Enter your email"
								className="flex-1"
							/>
							<Button type="submit" size="icon">
								<Mail className="h-4 w-4" />
							</Button>
						</form>
						<div className="space-y-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								<span>0313-3430196</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								<span>support@{siteConfig.title.toLowerCase()}.com</span>
							</div>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				<div className="text-center text-sm text-muted-foreground">
					<p>
						© {new Date().getFullYear()} {siteConfig.title}. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
