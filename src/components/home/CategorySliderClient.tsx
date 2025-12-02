"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategories } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategorySliderClient() {
	const { data: categories, isLoading, error } = useCategories();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center py-20">
				<p className="text-destructive">Failed to load categories</p>
			</div>
		);
	}

	if (!categories || categories.length === 0) {
		return null;
	}

	return (
		<section className="w-full py-12 md:py-16 bg-background">
			<div className="container px-4">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="text-3xl font-bold tracking-tight">
							Shop by Category
						</h2>
						<p className="text-muted-foreground mt-1">
							Browse our collection by category
						</p>
					</div>
					<Button variant="outline" asChild className="hidden md:flex">
						<Link href="/shop">View All</Link>
					</Button>
				</div>

				<ScrollArea className="w-full whitespace-nowrap">
					<div className="flex gap-4 pb-4">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/shop?category=${category.id}`}
								className="group inline-block"
							>
								<Card className="w-[180px] md:w-[200px] border-0 shadow-sm hover:shadow-md transition-all">
									<CardContent className="p-0">
										<div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
											{category.image ? (
												<Image
													src={category.image.src}
													alt={category.name}
													fill
													className="object-cover group-hover:scale-110 transition-transform duration-300"
													sizes="200px"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center bg-muted">
													<span className="text-4xl text-muted-foreground">
														{category.name.charAt(0)}
													</span>
												</div>
											)}
										</div>
										<div className="p-4">
											<h3 className="font-medium text-sm text-center group-hover:text-primary transition-colors truncate">
												{category.name}
											</h3>
											{category.count > 0 && (
												<p className="text-xs text-muted-foreground text-center mt-1">
													{category.count}{" "}
													{category.count === 1 ? "item" : "items"}
												</p>
											)}
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>

				<Button variant="outline" asChild className="md:hidden w-full mt-4">
					<Link href="/shop">View All Categories</Link>
				</Button>
			</div>
		</section>
	);
}
