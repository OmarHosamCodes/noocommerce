import { wcApi } from "@/lib/woocommerce";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const customerId = searchParams.get("id");

		if (!customerId) {
			return NextResponse.json(
				{ error: "Customer ID is required" },
				{ status: 400 },
			);
		}

		const { data } = await wcApi.get(`customers/${customerId}`);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Get customer error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch customer data" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const customerId = searchParams.get("id");

		if (!customerId) {
			return NextResponse.json(
				{ error: "Customer ID is required" },
				{ status: 400 },
			);
		}

		const body = await request.json();

		const { data } = await wcApi.put(`customers/${customerId}`, body);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Update customer error:", error);
		return NextResponse.json(
			{ error: "Failed to update customer data" },
			{ status: 500 },
		);
	}
}
