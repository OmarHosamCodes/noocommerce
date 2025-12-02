"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WooOrder } from "@/types/woo";

interface OrdersListProps {
	orders: WooOrder[];
	isLoading: boolean;
}

export function OrdersList({ orders, isLoading }: OrdersListProps) {
	if (isLoading) {
		return (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<Card key={i}>
						<CardContent className="py-6">
							<div className="space-y-3">
								<div className="h-6 bg-muted animate-pulse rounded w-32" />
								<div className="h-4 bg-muted animate-pulse rounded w-48" />
								<div className="h-4 bg-muted animate-pulse rounded w-24" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (!orders || orders.length === 0) {
		return (
			<Card>
				<CardContent className="py-10">
					<p className="text-center text-muted-foreground">
						No orders found. Start shopping to see your orders here!
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

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-500";
			case "processing":
				return "bg-blue-500";
			case "pending":
				return "bg-yellow-500";
			case "cancelled":
			case "failed":
				return "bg-red-500";
			case "refunded":
				return "bg-gray-500";
			default:
				return "bg-gray-400";
		}
	};

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Order History</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{orders.map((order) => (
							<Card key={order.id} className="border">
								<CardContent className="py-4">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
										<div className="space-y-2 flex-1">
											<div className="flex items-center gap-2 flex-wrap">
												<h3 className="font-semibold">Order #{order.number}</h3>
												<Badge className={getStatusColor(order.status)}>
													{order.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">
												Placed on{" "}
												{new Date(order.date_created).toLocaleDateString()}
											</p>
											<div className="space-y-1">
												<p className="text-sm">
													<span className="font-medium">Items:</span>{" "}
													{order.line_items.length}
												</p>
												<p className="text-sm">
													<span className="font-medium">Total:</span>{" "}
													{order.currency_symbol}
													{order.total}
												</p>
												<p className="text-sm">
													<span className="font-medium">Payment:</span>{" "}
													{order.payment_method_title}
												</p>
											</div>
										</div>
										<div className="flex flex-col gap-2">
											<Button asChild variant="outline" size="sm">
												<Link href={`/order-details/${order.id}`}>
													View Details
												</Link>
											</Button>
										</div>
									</div>

									{/* Order Items Preview */}
									<div className="mt-4 pt-4 border-t">
										<p className="text-sm font-medium mb-2">Items:</p>
										<div className="space-y-2">
											{order.line_items.map((item) => (
												<div
													key={item.id}
													className="flex justify-between text-sm"
												>
													<span>
														{item.name} x {item.quantity}
													</span>
													<span>
														{order.currency_symbol}
														{item.total}
													</span>
												</div>
											))}
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
