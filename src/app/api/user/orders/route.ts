import { wcApi } from "@/lib/woocommerce";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const customerId = searchParams.get("customer_id");
		const page = searchParams.get("page") || "1";
		const perPage = searchParams.get("per_page") || "10";

		if (!customerId) {
			return NextResponse.json(
				{ error: "Customer ID is required" },
				{ status: 400 },
			);
		}

		const { data, headers } = await wcApi.get("orders", {
			customer: customerId,
			page: Number.parseInt(page),
			per_page: Number.parseInt(perPage),
			orderby: "date",
			order: "desc",
		});

		return NextResponse.json({
			orders: data,
			total: headers["x-wp-total"],
			totalPages: headers["x-wp-totalpages"],
		});
	} catch (error) {
		console.error("Get orders error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch orders" },
			{ status: 500 },
		);
	}
}
