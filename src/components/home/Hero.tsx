"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Hero = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			image: "/slider/1.webp",
			title: "Samsung Ultra S24",
			subtitle: "16/512 GB",
			discount: "20%",
			description:
				"Experience flagship performance with cutting-edge technology",
			slug: "brightening-base-spf-45",
			tag: "New Arrival",
		},
		{
			id: 2,
			image: "/slider/2.webp",
			title: " Apple EarPods",
			subtitle: "Lightning Connector",
			discount: "15%",
			description: "Premium audio quality in a sleek design",
			slug: "hydrating-face-serum",
			tag: "Best Seller",
		},
		{
			id: 3,
			image: "/slider/3.webp",
			title: "iPad Pro 11-inch",
			subtitle: "Wi-Fi 256GB",
			discount: "25%",
			description: "Power and portability in perfect harmony",
			slug: "natural-glow-cream",
			tag: "Hot Deal",
		},
	];

	const features = [
		{ icon: Zap, text: "Fast Delivery", desc: "Within 24 hours" },
		{ icon: ShoppingBag, text: "Easy Returns", desc: "30-day policy" },
		{ icon: Sparkles, text: "Best Quality", desc: "Guaranteed" },
	];

	const handleNext = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const handlePrev = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const slide = slides[currentSlide]!;

	return (
		<section className="w-full bg-gradient-to-b from-muted/50 to-background">
			<div className="container mx-auto px-4 py-8 md:py-12">
				{/* Main Hero Card */}
				<Card className="border-0 shadow-lg overflow-hidden">
					<CardContent className="p-0">
						<div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
							{/* Content Side */}
							<div className="p-6 md:p-12 space-y-6 order-2 md:order-1">
								<div className="space-y-3">
									<Badge variant="secondary" className="w-fit">
										<Sparkles className="mr-1 h-3 w-3" />
										{slide.tag}
									</Badge>
									<div className="space-y-2">
										<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
											{slide.title}
										</h1>
										<p className="text-xl md:text-2xl text-muted-foreground font-medium">
											{slide.subtitle}
										</p>
									</div>
								</div>

								<p className="text-base md:text-lg text-muted-foreground max-w-md">
									{slide.description}
								</p>

								<div className="flex items-center gap-4">
									<div className="flex items-baseline gap-2">
										<span className="text-5xl md:text-6xl font-bold text-primary">
											{slide.discount}
										</span>
										<span className="text-lg font-medium uppercase text-muted-foreground">
											Off
										</span>
									</div>
								</div>

								<div className="flex flex-wrap gap-3">
									<Button asChild size="lg" className="group">
										<Link href={`/products/${slide.slug}`}>
											Shop Now
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
									<Button asChild variant="outline" size="lg">
										<Link href="/shop">Browse All</Link>
									</Button>
								</div>
							</div>

							{/* Image Side */}
							<div className="relative h-[300px] md:h-[500px] lg:h-[600px] bg-muted/30 order-1 md:order-2">
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									className="object-contain p-8"
									priority
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</div>

						{/* Carousel Navigation */}
						<div className="flex justify-center items-center gap-4 pb-6">
							<Button
								variant="ghost"
								size="sm"
								onClick={handlePrev}
								aria-label="Previous slide"
							>
								Previous
							</Button>
							<div className="flex gap-2">
								{slides.map((_, index) => (
									<button
										type="button"
										key={index}
										onClick={() => setCurrentSlide(index)}
										className={`h-2 rounded-full transition-all ${
											index === currentSlide
												? "w-8 bg-primary"
												: "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
										}`}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleNext}
								aria-label="Next slide"
							>
								Next
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="border-0 shadow-sm hover:shadow-md transition-shadow"
						>
							<CardContent className="p-6 flex items-center gap-4">
								<div className="p-3 rounded-full bg-primary/10">
									<feature.icon className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-sm">{feature.text}</h3>
									<p className="text-xs text-muted-foreground">
										{feature.desc}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Hero;
