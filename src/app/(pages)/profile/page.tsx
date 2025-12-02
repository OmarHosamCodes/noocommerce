"use client";

import { AddressManager } from "@/components/profile/AddressManager";
import { OrdersList } from "@/components/profile/OrdersList";
import { ReviewsList } from "@/components/profile/ReviewsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import type { WooCustomer, WooOrder, WooProductReview } from "@/types/woo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
	const { user } = useAuthStore();
	const queryClient = useQueryClient();
	const [isEditing, setIsEditing] = useState(false);

	// Fetch customer data from WooCommerce
	const { data: customer, isLoading: isLoadingCustomer } =
		useQuery<WooCustomer>({
			queryKey: ["customer", user?.id],
			queryFn: async () => {
				const res = await fetch(`/api/user/customer?id=${user?.id}`);
				if (!res.ok) throw new Error("Failed to fetch customer data");
				return res.json();
			},
			enabled: !!user?.id,
		});

	// Fetch orders
	const { data: ordersData, isLoading: isLoadingOrders } = useQuery<{
		orders: WooOrder[];
		total: string;
		totalPages: string;
	}>({
		queryKey: ["orders", user?.id],
		queryFn: async () => {
			const res = await fetch(`/api/user/orders?customer_id=${user?.id}`);
			if (!res.ok) throw new Error("Failed to fetch orders");
			return res.json();
		},
		enabled: !!user?.id,
	});

	// Fetch reviews
	const { data: reviewsData, isLoading: isLoadingReviews } = useQuery<{
		reviews: WooProductReview[];
		total: string;
		totalPages: string;
	}>({
		queryKey: ["reviews", user?.email],
		queryFn: async () => {
			const res = await fetch(
				`/api/user/reviews?reviewer_email=${encodeURIComponent(user?.email || "")}`,
			);
			if (!res.ok) throw new Error("Failed to fetch reviews");
			return res.json();
		},
		enabled: !!user?.email,
	});

	// Update customer mutation
	const updateCustomerMutation = useMutation({
		mutationFn: async (data: Partial<WooCustomer>) => {
			const res = await fetch(`/api/user/customer?id=${user?.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Failed to update profile");
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customer", user?.id] });
			toast.success("Profile updated successfully");
			setIsEditing(false);
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update profile");
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		updateCustomerMutation.mutate({
			first_name: formData.get("first_name") as string,
			last_name: formData.get("last_name") as string,
			email: formData.get("email") as string,
		});
	};

	if (!user) {
		return (
			<div className="container mx-auto py-10">
				<Card>
					<CardContent className="py-10">
						<p className="text-center text-muted-foreground">
							Please log in to view your profile
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">My Profile</h1>

			<Tabs defaultValue="profile" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="addresses">Addresses</TabsTrigger>
					<TabsTrigger value="orders">Orders</TabsTrigger>
					<TabsTrigger value="reviews">Reviews</TabsTrigger>
				</TabsList>

				<TabsContent value="profile" className="space-y-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle>Personal Information</CardTitle>
							{!isEditing && (
								<Button
									variant="outline"
									onClick={() => setIsEditing(true)}
									disabled={isLoadingCustomer}
								>
									Edit Profile
								</Button>
							)}
						</CardHeader>
						<CardContent>
							{isLoadingCustomer ? (
								<div className="space-y-4">
									<div className="h-10 bg-muted animate-pulse rounded" />
									<div className="h-10 bg-muted animate-pulse rounded" />
									<div className="h-10 bg-muted animate-pulse rounded" />
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid gap-4 md:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="first_name">First Name</Label>
											<Input
												id="first_name"
												name="first_name"
												defaultValue={customer?.first_name || ""}
												disabled={!isEditing}
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="last_name">Last Name</Label>
											<Input
												id="last_name"
												name="last_name"
												defaultValue={customer?.last_name || ""}
												disabled={!isEditing}
												required
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											type="email"
											defaultValue={customer?.email || user.email}
											disabled={!isEditing}
											required
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="username">Username</Label>
										<Input
											id="username"
											name="username"
											defaultValue={customer?.username || user.username}
											disabled
										/>
									</div>

									{isEditing && (
										<div className="flex gap-2">
											<Button
												type="submit"
												disabled={updateCustomerMutation.isPending}
											>
												{updateCustomerMutation.isPending
													? "Saving..."
													: "Save Changes"}
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => setIsEditing(false)}
											>
												Cancel
											</Button>
										</div>
									)}
								</form>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="addresses">
					<AddressManager customer={customer} isLoading={isLoadingCustomer} />
				</TabsContent>

				<TabsContent value="orders">
					<OrdersList
						orders={ordersData?.orders || []}
						isLoading={isLoadingOrders}
					/>
				</TabsContent>

				<TabsContent value="reviews">
					<ReviewsList
						reviews={reviewsData?.reviews || []}
						isLoading={isLoadingReviews}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
