import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const customerId = searchParams.get("id");
		const email = searchParams.get("email");

		if (!customerId && !email) {
			return NextResponse.json(
				{ error: "Customer ID or email is required" },
				{ status: 400 },
			);
		}

		let data: unknown;
		if (email) {
			// Search for customer by email
			const { data: customers } = await wcApi.get("customers", {
				email: email,
				per_page: 1,
			});
			if (customers && customers.length > 0) {
				data = customers[0];
			} else {
				return NextResponse.json(
					{ error: "Customer not found" },
					{ status: 404 },
				);
			}
		} else {
			const response = await wcApi.get(`customers/${customerId}`);
			data = response.data;
		}

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
