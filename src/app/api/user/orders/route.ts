import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const customerId = searchParams.get("customer_id");
		const email = searchParams.get("email");
		const page = searchParams.get("page") || "1";
		const perPage = searchParams.get("per_page") || "10";

		if (!customerId && !email) {
			return NextResponse.json(
				{ error: "Customer ID or email is required" },
				{ status: 400 },
			);
		}

		let actualCustomerId = customerId;

		// If email is provided, look up customer ID
		if (email && !customerId) {
			const { data: customers } = await wcApi.get("customers", {
				email: email,
				per_page: 1,
			});
			if (customers && customers.length > 0) {
				actualCustomerId = customers[0].id;
			} else {
				// No customer found, return empty orders
				return NextResponse.json({
					orders: [],
					total: "0",
					totalPages: "0",
				});
			}
		}

		const { data, headers } = await wcApi.get("orders", {
			customer: actualCustomerId,
			page: Number.parseInt(page, 10),
			per_page: Number.parseInt(perPage, 10),
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
