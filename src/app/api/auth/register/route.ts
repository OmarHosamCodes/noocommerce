import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function POST(request: Request) {
	try {
		const { username, email, password, firstName, lastName } =
			await request.json();

		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "Username, email, and password are required" },
				{ status: 400 },
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			);
		}

		// Password validation (minimum 6 characters)
		if (password.length < 6) {
			return NextResponse.json(
				{ error: "Password must be at least 6 characters long" },
				{ status: 400 },
			);
		}

		// Create customer via WooCommerce API
		const response = await wcApi.post("customers", {
			username,
			email,
			password,
			first_name: firstName || "",
			last_name: lastName || "",
		});

		if (response.status === 201) {
			return NextResponse.json({
				success: true,
				message: "Account created successfully",
				user: {
					id: response.data.id,
					email: response.data.email,
					username: response.data.username,
					firstName: response.data.first_name,
					lastName: response.data.last_name,
				},
			});
		}

		return NextResponse.json(
			{ error: "Failed to create account" },
			{ status: 500 },
		);
	} catch (error: unknown) {
		console.error("Registration error:", error);

		// Handle WooCommerce API errors
		if (error && typeof error === "object" && "response" in error) {
			const apiError = error as {
				response?: { data?: { message?: string }; status?: number };
			};
			if (apiError.response?.data) {
				const errorMessage =
					apiError.response.data.message || "Registration failed";
				return NextResponse.json(
					{ error: errorMessage },
					{ status: apiError.response.status || 400 },
				);
			}
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
