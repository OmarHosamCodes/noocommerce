"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { siteConfig } from "@/lib/config";
import { type CheckoutFormData, checkoutSchema } from "@/lib/schemas";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

const AccordionCheckout = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [activeStep, setActiveStep] = useState("shipping");
	const { items, clearCart } = useCartStore();
	const { user, isAuthenticated } = useAuthStore();

	const form = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			paymentMethod: "cod",
		},
	});

	// Pre-fill form with user data if authenticated
	useEffect(() => {
		if (isAuthenticated && user) {
			const [firstName, ...lastNameParts] = user.displayName.split(" ");
			form.setValue("firstName", firstName || "");
			form.setValue("lastName", lastNameParts.join(" ") || "");
			form.setValue("email", user.email || "");
		}
	}, [isAuthenticated, user, form]);

	const orderItems = items;
	const subtotal = orderItems.reduce(
		(sum, item) => sum + +item.price * item.quantity,
		0,
	);
	const shipping = 250;
	const total = subtotal + shipping;

	const onSubmit = async (data: CheckoutFormData) => {
		setLoading(true);
		try {
			const orderData = {
				...data,
				customer_id: isAuthenticated && user ? user.id : undefined,
				items: orderItems.map((item) => {
					const isVariation = item.type === "variable";
					return {
						product_id: isVariation ? item.parentId : item.id,
						variation_id: isVariation && item.id,
						quantity: item.quantity,
					};
				}),
				totals: {
					subtotal,
					shipping,
					total,
				},
			};

			const res = await fetch(`${baseUrl}/api/order/create`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(orderData),
			});

			if (!res.ok) throw new Error("Failed to place order");

			clearCart();
			form.reset();
			router.push("/order-success");
		} catch (err) {
			console.error("Order error:", err);
			alert("Error placing order. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const steps = [
		{ id: "shipping", title: "Shipping Details", completed: false },
		{ id: "delivery", title: "Delivery Method", completed: false },
		{ id: "payment", title: "Payment", completed: false },
	];

	return (
		<section className="checkout w-full bg-gray-50 py-12">
			<div className="container mx-auto px-6">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-4xl font-serif font-bold text-gray-900 mb-8"
				>
					Checkout
				</motion.h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-1 lg:grid-cols-5 gap-8"
					>
						{/* Left: Accordion Form */}
						<div className="lg:col-span-3 space-y-6">
							<Accordion
								type="single"
								collapsible
								value={activeStep}
								onValueChange={setActiveStep}
								className="space-y-4"
							>
								{/* Step 1: Shipping Details */}
								<AccordionItem
									value="shipping"
									className="border rounded-lg bg-white"
								>
									<AccordionTrigger className="px-6 py-4 hover:no-underline">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
												1
											</div>
											<span className="text-lg font-medium">
												Shipping Details
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-6 pb-6">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
											<FormField
												control={form.control}
												name="firstName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input placeholder="John" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Last Name</FormLabel>
														<FormControl>
															<Input placeholder="Doe" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem className="sm:col-span-2">
														<FormLabel>Email Address</FormLabel>
														<FormControl>
															<Input
																type="email"
																placeholder="john@example.com"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="address"
												render={({ field }) => (
													<FormItem className="sm:col-span-2">
														<FormLabel>Address</FormLabel>
														<FormControl>
															<Input
																placeholder="House no, Street, City"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="country"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Country</FormLabel>
														<FormControl>
															<Input placeholder="Pakistan" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="zip"
												render={({ field }) => (
													<FormItem>
														<FormLabel>ZIP / Postal Code</FormLabel>
														<FormControl>
															<Input placeholder="12345" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="phone"
												render={({ field }) => (
													<FormItem className="sm:col-span-2">
														<FormLabel>Phone Number</FormLabel>
														<FormControl>
															<Input placeholder="+92 300 1234567" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<Button
											type="button"
											onClick={() => setActiveStep("delivery")}
											className="mt-6 w-full"
										>
											Continue to Delivery
										</Button>
									</AccordionContent>
								</AccordionItem>

								{/* Step 2: Delivery Method */}
								<AccordionItem
									value="delivery"
									className="border rounded-lg bg-white"
								>
									<AccordionTrigger className="px-6 py-4 hover:no-underline">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
												2
											</div>
											<span className="text-lg font-medium">
												Delivery Method
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-6 pb-6">
										<div className="mt-4 space-y-4">
											<Card className="border-2 border-blue-200 bg-blue-50">
												<CardContent className="p-4">
													<div className="flex justify-between items-center">
														<div>
															<p className="font-medium">Standard Delivery</p>
															<p className="text-sm text-gray-600">
																3-5 business days
															</p>
														</div>
														<p className="font-bold">
															{siteConfig.currency} {shipping}
														</p>
													</div>
												</CardContent>
											</Card>
										</div>
										<Button
											type="button"
											onClick={() => setActiveStep("payment")}
											className="mt-6 w-full"
										>
											Continue to Payment
										</Button>
									</AccordionContent>
								</AccordionItem>

								{/* Step 3: Payment */}
								<AccordionItem
									value="payment"
									className="border rounded-lg bg-white"
								>
									<AccordionTrigger className="px-6 py-4 hover:no-underline">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
												3
											</div>
											<span className="text-lg font-medium">Payment</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-6 pb-6">
										<FormField
											control={form.control}
											name="paymentMethod"
											render={({ field }) => (
												<FormItem className="mt-4">
													<FormControl>
														<RadioGroup
															onValueChange={field.onChange}
															defaultValue={field.value}
															className="space-y-3"
														>
															<div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
																<RadioGroupItem value="cod" id="cod" />
																<FormLabel
																	htmlFor="cod"
																	className="flex-1 cursor-pointer"
																>
																	<div>
																		<p className="font-medium">
																			Cash on Delivery
																		</p>
																		<p className="text-sm text-gray-600">
																			Pay when you receive your order
																		</p>
																	</div>
																</FormLabel>
															</div>
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>

						{/* Right: Order Summary */}
						<Card className="lg:col-span-2 h-fit sticky top-4">
							<CardHeader>
								<CardTitle className="text-2xl font-serif">
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* Order Items */}
								<div className="space-y-3 max-h-64 overflow-y-auto">
									{orderItems.map((item) => (
										<div
											key={item.id}
											className="flex gap-3 pb-3 border-b border-gray-100"
										>
											<div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
												<Image
													src={item.images}
													alt={item.name}
													fill
													className="object-cover"
												/>
												<span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
													{item.quantity}
												</span>
											</div>
											<div className="flex-1 min-w-0">
												<p className="font-medium text-sm truncate">
													{item.name}
												</p>
												{item.type === "variable" && (
													<p className="text-xs text-gray-500">
														{item.variationName}
													</p>
												)}
												<p className="text-sm font-medium text-blue-600 mt-1">
													{siteConfig.currency}{" "}
													{(+item.price * item.quantity).toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>

								<Separator />

								{/* Totals */}
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-medium">
											{siteConfig.currency} {subtotal.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Shipping</span>
										<span className="font-medium">
											{siteConfig.currency} {shipping.toFixed(2)}
										</span>
									</div>
									<Separator />
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<span className="text-blue-600">
											{siteConfig.currency} {total.toFixed(2)}
										</span>
									</div>
								</div>

								{/* Place Order Button */}
								<motion.div whileTap={{ scale: 0.98 }}>
									<Button
										type="submit"
										className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700"
										disabled={loading || orderItems.length === 0}
									>
										{loading ? "Placing Order..." : "Place Order"}
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default AccordionCheckout;
