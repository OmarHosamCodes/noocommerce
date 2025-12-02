"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { WooOrder } from "@/types/woo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
	const params = useParams();
	const orderId = params.id as string;

	const { data: order, isLoading } = useQuery<WooOrder>({
		queryKey: ["order", orderId],
		queryFn: async () => {
			const res = await fetch(`/api/user/orders/${orderId}`);
			if (!res.ok) throw new Error("Failed to fetch order details");
			return res.json();
		},
		enabled: !!orderId,
	});

	if (isLoading) {
		return (
			<div className="container mx-auto py-10">
				<div className="space-y-4">
					<div className="h-8 bg-muted animate-pulse rounded w-48" />
					<Card>
						<CardContent className="py-6">
							<div className="space-y-3">
								<div className="h-6 bg-muted animate-pulse rounded w-32" />
								<div className="h-4 bg-muted animate-pulse rounded w-full" />
								<div className="h-4 bg-muted animate-pulse rounded w-3/4" />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (!order) {
		return (
			<div className="container mx-auto py-10">
				<Card>
					<CardContent className="py-10">
						<p className="text-center text-muted-foreground">Order not found</p>
						<div className="flex justify-center mt-4">
							<Button asChild>
								<Link href="/profile">Back to Profile</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
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
		<div className="container mx-auto py-10">
			<div className="mb-6">
				<Button asChild variant="outline" size="sm">
					<Link href="/profile">← Back to Profile</Link>
				</Button>
			</div>

			<div className="space-y-6">
				{/* Order Header */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Order #{order.number}</CardTitle>
							<Badge className={getStatusColor(order.status)}>
								{order.status}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							Placed on {new Date(order.date_created).toLocaleDateString()} at{" "}
							{new Date(order.date_created).toLocaleTimeString()}
						</p>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<h3 className="font-semibold mb-2">Payment Method</h3>
								<p className="text-sm">{order.payment_method_title}</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Order Total</h3>
								<p className="text-lg font-bold">
									{order.currency_symbol}
									{order.total}
								</p>
							</div>
						</div>
						{order.needs_payment && (
							<div className="mt-4">
								<Button asChild>
									<a
										href={order.payment_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										Pay Now
									</a>
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Order Items */}
				<Card>
					<CardHeader>
						<CardTitle>Order Items</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{order.line_items.map((item, index) => (
								<div key={item.id}>
									<div className="flex justify-between items-start gap-4">
										<div className="flex-1">
											<h4 className="font-medium">{item.name}</h4>
											{item.meta_data && item.meta_data.length > 0 && (
												<div className="text-sm text-muted-foreground mt-1">
													{item.meta_data
														.filter(
															(meta) =>
																!meta.key.startsWith("_") && meta.display_key,
														)
														.map((meta) => (
															<div key={meta.id}>
																{meta.display_key}: {meta.display_value}
															</div>
														))}
												</div>
											)}
											<p className="text-sm text-muted-foreground mt-1">
												Quantity: {item.quantity}
											</p>
										</div>
										<div className="text-right">
											<p className="font-medium">
												{order.currency_symbol}
												{item.total}
											</p>
											<p className="text-sm text-muted-foreground">
												{order.currency_symbol}
												{item.price} each
											</p>
										</div>
									</div>
									{index < order.line_items.length - 1 && (
										<Separator className="mt-4" />
									)}
								</div>
							))}
						</div>

						<Separator className="my-4" />

						{/* Order Totals */}
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Subtotal:</span>
								<span>
									{order.currency_symbol}
									{(
										Number.parseFloat(order.total) -
										Number.parseFloat(order.shipping_total) -
										Number.parseFloat(order.total_tax)
									).toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Shipping:</span>
								<span>
									{order.currency_symbol}
									{order.shipping_total}
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Tax:</span>
								<span>
									{order.currency_symbol}
									{order.total_tax}
								</span>
							</div>
							<Separator className="my-2" />
							<div className="flex justify-between font-bold text-lg">
								<span>Total:</span>
								<span>
									{order.currency_symbol}
									{order.total}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Addresses */}
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Billing Address</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-1 text-sm">
								<p className="font-medium">
									{order.billing.first_name} {order.billing.last_name}
								</p>
								{order.billing.company && <p>{order.billing.company}</p>}
								<p>{order.billing.address_1}</p>
								{order.billing.address_2 && <p>{order.billing.address_2}</p>}
								<p>
									{order.billing.city}, {order.billing.state}{" "}
									{order.billing.postcode}
								</p>
								<p>{order.billing.country}</p>
								<Separator className="my-2" />
								{order.billing.email && <p>{order.billing.email}</p>}
								{order.billing.phone && <p>{order.billing.phone}</p>}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Shipping Address</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-1 text-sm">
								<p className="font-medium">
									{order.shipping.first_name} {order.shipping.last_name}
								</p>
								{order.shipping.company && <p>{order.shipping.company}</p>}
								<p>{order.shipping.address_1}</p>
								{order.shipping.address_2 && <p>{order.shipping.address_2}</p>}
								<p>
									{order.shipping.city}, {order.shipping.state}{" "}
									{order.shipping.postcode}
								</p>
								<p>{order.shipping.country}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
