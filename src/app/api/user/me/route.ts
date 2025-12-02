import { env } from "@/env";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.replace("Bearer ", "");

		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user data from WordPress
		const response = await fetch(
			`${env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wp/v2/users/me`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch user" },
				{ status: response.status },
			);
		}

		const userData = await response.json();

		return NextResponse.json(userData);
	} catch (error) {
		console.error("Get user error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user data" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.replace("Bearer ", "");

		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();

		// Update user data in WordPress
		const response = await fetch(
			`${env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wp/v2/users/me`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to update user" },
				{ status: response.status },
			);
		}

		const userData = await response.json();

		return NextResponse.json(userData);
	} catch (error) {
		console.error("Update user error:", error);
		return NextResponse.json(
			{ error: "Failed to update user data" },
			{ status: 500 },
		);
	}
}
