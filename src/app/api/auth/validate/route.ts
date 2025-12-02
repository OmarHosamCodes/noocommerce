import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(request: Request) {
	try {
		const { token } = await request.json();

		if (!token) {
			return NextResponse.json({ error: "Token is required" }, { status: 400 });
		}

		// Validate token with WordPress/WooCommerce
		const response = await fetch(
			`${env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/jwt-auth/v1/token/validate`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ valid: false }, { status: 401 });
		}

		return NextResponse.json({ valid: true, data });
	} catch (error) {
		console.error("Token validation error:", error);
		return NextResponse.json({ valid: false }, { status: 500 });
	}
}
