"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import type { WooAddress, WooCustomer } from "@/types/woo";

interface AddressManagerProps {
	customer?: WooCustomer;
	isLoading: boolean;
}

export function AddressManager({ customer, isLoading }: AddressManagerProps) {
	const { user } = useAuthStore();
	const queryClient = useQueryClient();
	const [isEditingBilling, setIsEditingBilling] = useState(false);
	const [isEditingShipping, setIsEditingShipping] = useState(false);

	const updateAddressMutation = useMutation({
		mutationFn: async (data: {
			billing?: WooAddress;
			shipping?: WooAddress;
		}) => {
			const res = await fetch(`/api/user/customer?id=${user?.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Failed to update address");
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customer", user?.id] });
			toast.success("Address updated successfully");
			setIsEditingBilling(false);
			setIsEditingShipping(false);
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update address");
		},
	});

	const handleBillingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		updateAddressMutation.mutate({
			billing: {
				first_name: formData.get("billing_first_name") as string,
				last_name: formData.get("billing_last_name") as string,
				company: formData.get("billing_company") as string,
				address_1: formData.get("billing_address_1") as string,
				address_2: formData.get("billing_address_2") as string,
				city: formData.get("billing_city") as string,
				state: formData.get("billing_state") as string,
				postcode: formData.get("billing_postcode") as string,
				country: formData.get("billing_country") as string,
				email: formData.get("billing_email") as string,
				phone: formData.get("billing_phone") as string,
			},
		});
	};

	const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		updateAddressMutation.mutate({
			shipping: {
				first_name: formData.get("shipping_first_name") as string,
				last_name: formData.get("shipping_last_name") as string,
				company: formData.get("shipping_company") as string,
				address_1: formData.get("shipping_address_1") as string,
				address_2: formData.get("shipping_address_2") as string,
				city: formData.get("shipping_city") as string,
				state: formData.get("shipping_state") as string,
				postcode: formData.get("shipping_postcode") as string,
				country: formData.get("shipping_country") as string,
			},
		});
	};

	if (isLoading) {
		return (
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<div className="h-6 bg-muted animate-pulse rounded w-32" />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="h-10 bg-muted animate-pulse rounded" />
							<div className="h-10 bg-muted animate-pulse rounded" />
							<div className="h-10 bg-muted animate-pulse rounded" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<div className="h-6 bg-muted animate-pulse rounded w-32" />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="h-10 bg-muted animate-pulse rounded" />
							<div className="h-10 bg-muted animate-pulse rounded" />
							<div className="h-10 bg-muted animate-pulse rounded" />
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* Billing Address */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Billing Address</CardTitle>
					{!isEditingBilling && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsEditingBilling(true)}
						>
							Edit
						</Button>
					)}
				</CardHeader>
				<CardContent>
					<form onSubmit={handleBillingSubmit} className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="billing_first_name">First Name</Label>
								<Input
									id="billing_first_name"
									name="billing_first_name"
									defaultValue={customer?.billing?.first_name || ""}
									disabled={!isEditingBilling}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="billing_last_name">Last Name</Label>
								<Input
									id="billing_last_name"
									name="billing_last_name"
									defaultValue={customer?.billing?.last_name || ""}
									disabled={!isEditingBilling}
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="billing_company">Company (Optional)</Label>
							<Input
								id="billing_company"
								name="billing_company"
								defaultValue={customer?.billing?.company || ""}
								disabled={!isEditingBilling}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="billing_address_1">Address Line 1</Label>
							<Input
								id="billing_address_1"
								name="billing_address_1"
								defaultValue={customer?.billing?.address_1 || ""}
								disabled={!isEditingBilling}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="billing_address_2">
								Address Line 2 (Optional)
							</Label>
							<Input
								id="billing_address_2"
								name="billing_address_2"
								defaultValue={customer?.billing?.address_2 || ""}
								disabled={!isEditingBilling}
							/>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="billing_city">City</Label>
								<Input
									id="billing_city"
									name="billing_city"
									defaultValue={customer?.billing?.city || ""}
									disabled={!isEditingBilling}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="billing_state">State</Label>
								<Input
									id="billing_state"
									name="billing_state"
									defaultValue={customer?.billing?.state || ""}
									disabled={!isEditingBilling}
									required
								/>
							</div>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="billing_postcode">Postcode</Label>
								<Input
									id="billing_postcode"
									name="billing_postcode"
									defaultValue={customer?.billing?.postcode || ""}
									disabled={!isEditingBilling}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="billing_country">Country</Label>
								<Input
									id="billing_country"
									name="billing_country"
									defaultValue={customer?.billing?.country || ""}
									disabled={!isEditingBilling}
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="billing_email">Email</Label>
							<Input
								id="billing_email"
								name="billing_email"
								type="email"
								defaultValue={customer?.billing?.email || ""}
								disabled={!isEditingBilling}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="billing_phone">Phone</Label>
							<Input
								id="billing_phone"
								name="billing_phone"
								type="tel"
								defaultValue={customer?.billing?.phone || ""}
								disabled={!isEditingBilling}
								required
							/>
						</div>

						{isEditingBilling && (
							<div className="flex gap-2">
								<Button
									type="submit"
									disabled={updateAddressMutation.isPending}
								>
									{updateAddressMutation.isPending ? "Saving..." : "Save"}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsEditingBilling(false)}
								>
									Cancel
								</Button>
							</div>
						)}
					</form>
				</CardContent>
			</Card>

			{/* Shipping Address */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Shipping Address</CardTitle>
					{!isEditingShipping && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsEditingShipping(true)}
						>
							Edit
						</Button>
					)}
				</CardHeader>
				<CardContent>
					<form onSubmit={handleShippingSubmit} className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="shipping_first_name">First Name</Label>
								<Input
									id="shipping_first_name"
									name="shipping_first_name"
									defaultValue={customer?.shipping?.first_name || ""}
									disabled={!isEditingShipping}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="shipping_last_name">Last Name</Label>
								<Input
									id="shipping_last_name"
									name="shipping_last_name"
									defaultValue={customer?.shipping?.last_name || ""}
									disabled={!isEditingShipping}
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="shipping_company">Company (Optional)</Label>
							<Input
								id="shipping_company"
								name="shipping_company"
								defaultValue={customer?.shipping?.company || ""}
								disabled={!isEditingShipping}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="shipping_address_1">Address Line 1</Label>
							<Input
								id="shipping_address_1"
								name="shipping_address_1"
								defaultValue={customer?.shipping?.address_1 || ""}
								disabled={!isEditingShipping}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="shipping_address_2">
								Address Line 2 (Optional)
							</Label>
							<Input
								id="shipping_address_2"
								name="shipping_address_2"
								defaultValue={customer?.shipping?.address_2 || ""}
								disabled={!isEditingShipping}
							/>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="shipping_city">City</Label>
								<Input
									id="shipping_city"
									name="shipping_city"
									defaultValue={customer?.shipping?.city || ""}
									disabled={!isEditingShipping}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="shipping_state">State</Label>
								<Input
									id="shipping_state"
									name="shipping_state"
									defaultValue={customer?.shipping?.state || ""}
									disabled={!isEditingShipping}
									required
								/>
							</div>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="shipping_postcode">Postcode</Label>
								<Input
									id="shipping_postcode"
									name="shipping_postcode"
									defaultValue={customer?.shipping?.postcode || ""}
									disabled={!isEditingShipping}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="shipping_country">Country</Label>
								<Input
									id="shipping_country"
									name="shipping_country"
									defaultValue={customer?.shipping?.country || ""}
									disabled={!isEditingShipping}
									required
								/>
							</div>
						</div>

						{isEditingShipping && (
							<div className="flex gap-2">
								<Button
									type="submit"
									disabled={updateAddressMutation.isPending}
								>
									{updateAddressMutation.isPending ? "Saving..." : "Save"}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsEditingShipping(false)}
								>
									Cancel
								</Button>
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
