import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return NextResponse.json(
				{ error: "Username and password are required" },
				{ status: 400 },
			);
		}

		// Authenticate with WordPress/WooCommerce
		const response = await fetch(
			`${env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/jwt-auth/v1/token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ error: data.message || "Authentication failed" },
				{ status: response.status },
			);
		}

		// Return user data and token
		return NextResponse.json({
			token: data.token,
			user: {
				id: data.user_id,
				email: data.user_email,
				displayName: data.user_display_name,
				username: data.user_nicename,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
