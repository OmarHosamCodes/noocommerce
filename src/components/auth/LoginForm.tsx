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
import { useAuthStore } from "@/store/authStore";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
				toast.success("Welcome back!");
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
		<div className="w-full max-w-md mx-auto">
			<Card className="border-0 shadow-lg">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center mb-4">
						<div className="p-3 rounded-full bg-primary/10">
							<LogIn className="h-6 w-6 text-primary" />
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						Welcome Back
					</CardTitle>
					<CardDescription className="text-center">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
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

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link href="#" className="text-sm text-primary hover:underline">
									Forgot password?
								</Link>
							</div>
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

						<Button
							type="submit"
							className="w-full"
							size="lg"
							disabled={isLoading}
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</Button>
					</form>

					<Separator className="my-6" />

					<div className="text-center text-sm">
						<span className="text-muted-foreground">
							Don't have an account?{" "}
						</span>
						<Link
							href="/register"
							className="text-primary font-medium hover:underline"
						>
							Create account
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
