"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm() {
	const router = useRouter();
	const login = useAuthStore((state) => state.login);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await apiClient.post("/api/auth/login", formData);

			if (response.data.token) {
				login(response.data.token, response.data.user);
				toast.success("Login successful!");
				router.push("/");
			}
		} catch (error: unknown) {
			const apiError = error as { response?: { data?: { error?: string } } };
			const errorMessage =
				apiError.response?.data?.error || "Login failed. Please try again.";
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
				<h1 className="text-2xl font-bold mb-2">Login</h1>
				<p className="text-gray-600">
					Welcome back! Please login to your account.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="username">Username or Email</Label>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="Enter your username or email"
						value={formData.username}
						onChange={handleChange}
						required
						disabled={isLoading}
					/>
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						value={formData.password}
						onChange={handleChange}
						required
						disabled={isLoading}
					/>
				</div>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Logging in..." : "Login"}
				</Button>
			</form>

			<div className="mt-6 text-center text-sm">
				<p className="text-gray-600">
					Don't have an account?{" "}
					<Link href="/register" className="text-blue-600 hover:underline">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
}
