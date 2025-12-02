"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import apiClient from "@/lib/axios";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			setIsLoading(false);
			return;
		}

		// Validate password length
		if (formData.password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			setIsLoading(false);
			return;
		}

		try {
			const response = await apiClient.post("/api/auth/register", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			});

			if (response.data.success) {
				toast.success("Account created successfully!");
				router.push("/login");
			}
		} catch (error: unknown) {
			const apiError = error as { response?: { data?: { error?: string } } };
			const errorMessage =
				apiError.response?.data?.error ||
				"Registration failed. Please try again.";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<Card className="border-0 shadow-lg">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center mb-4">
						<div className="p-3 rounded-full bg-primary/10">
							<UserPlus className="h-6 w-6 text-primary" />
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						Create Account
					</CardTitle>
					<CardDescription className="text-center">
						Join us today and start shopping
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									name="firstName"
									type="text"
									placeholder="John"
									value={formData.firstName}
									onChange={handleChange}
									disabled={isLoading}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									name="lastName"
									type="text"
									placeholder="Doe"
									value={formData.lastName}
									onChange={handleChange}
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="username">Username *</Label>
							<Input
								id="username"
								name="username"
								type="text"
								placeholder="Choose a username"
								value={formData.username}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email *</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="your.email@example.com"
								value={formData.email}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password *</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="At least 6 characters"
								value={formData.password}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password *</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Re-enter your password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<Button
							type="submit"
							className="w-full"
							size="lg"
							disabled={isLoading}
						>
							{isLoading ? "Creating account..." : "Create Account"}
						</Button>
					</form>

					<Separator className="my-6" />

					<div className="text-center text-sm">
						<span className="text-muted-foreground">
							Already have an account?{" "}
						</span>
						<Link
							href="/login"
							className="text-primary font-medium hover:underline"
						>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
