"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/axios";

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
				toast.success("Account created successfully! Please login.");
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
		<div className="w-full max-w-md mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">Create Account</h1>
				<p className="text-gray-600">
					Sign up to start shopping with us today.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
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

					<div>
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

				<div>
					<Label htmlFor="username">Username *</Label>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="Enter your username"
						value={formData.username}
						onChange={handleChange}
						required
						disabled={isLoading}
					/>
				</div>

				<div>
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

				<div>
					<Label htmlFor="password">Password *</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Minimum 6 characters"
						value={formData.password}
						onChange={handleChange}
						required
						disabled={isLoading}
					/>
				</div>

				<div>
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

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Creating Account..." : "Create Account"}
				</Button>
			</form>

			<div className="mt-6 text-center text-sm">
				<p className="text-gray-600">
					Already have an account?{" "}
					<Link href="/login" className="text-blue-600 hover:underline">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}
