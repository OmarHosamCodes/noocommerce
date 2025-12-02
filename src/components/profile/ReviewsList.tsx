"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WooProductReview } from "@/types/woo";

interface ReviewsListProps {
	reviews: WooProductReview[];
	isLoading: boolean;
}

export function ReviewsList({ reviews, isLoading }: ReviewsListProps) {
	if (isLoading) {
		return (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<Card key={i}>
						<CardContent className="py-6">
							<div className="space-y-3">
								<div className="h-6 bg-muted animate-pulse rounded w-32" />
								<div className="h-4 bg-muted animate-pulse rounded w-full" />
								<div className="h-4 bg-muted animate-pulse rounded w-3/4" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (!reviews || reviews.length === 0) {
		return (
			<Card>
				<CardContent className="py-10">
					<p className="text-center text-muted-foreground">
						No reviews yet. Share your experience with products you've
						purchased!
					</p>
					<div className="flex justify-center mt-4">
						<Button asChild>
							<Link href="/shop">Browse Products</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	const renderStars = (rating: number) => {
		return (
			<div className="flex gap-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<svg
						key={star}
						className={`w-4 h-4 ${
							star <= rating
								? "fill-yellow-400 text-yellow-400"
								: "fill-gray-300 text-gray-300"
						}`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						aria-label={`${star} star`}
					>
						<title>{star} star</title>
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
				))}
			</div>
		);
	};

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>My Reviews</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{reviews.map((review) => (
							<Card key={review.id} className="border">
								<CardContent className="py-4">
									<div className="space-y-3">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1 space-y-2">
												<div className="flex items-center gap-2">
													{renderStars(review.rating)}
													{review.verified && (
														<span className="text-xs text-green-600 font-medium">
															Verified Purchase
														</span>
													)}
												</div>
												<p className="text-sm text-muted-foreground">
													{new Date(review.date_created).toLocaleDateString()}
												</p>
											</div>
											<Button asChild variant="outline" size="sm">
												<Link href={`/products/${review.product_id}`}>
													View Product
												</Link>
											</Button>
										</div>

										<div className="space-y-2">
											<p className="text-sm whitespace-pre-wrap">
												{review.review}
											</p>
										</div>

										<div className="text-xs text-muted-foreground">
											Status:{" "}
											<span className="capitalize">{review.status}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
