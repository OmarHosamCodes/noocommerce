import { wcApi } from "@/lib/woocommerce";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const reviewerEmail = searchParams.get("reviewer_email");
		const page = searchParams.get("page") || "1";
		const perPage = searchParams.get("per_page") || "10";

		if (!reviewerEmail) {
			return NextResponse.json(
				{ error: "Reviewer email is required" },
				{ status: 400 },
			);
		}

		const { data, headers } = await wcApi.get("products/reviews", {
			reviewer_email: reviewerEmail,
			page: Number.parseInt(page),
			per_page: Number.parseInt(perPage),
		});

		return NextResponse.json({
			reviews: data,
			total: headers["x-wp-total"],
			totalPages: headers["x-wp-totalpages"],
		});
	} catch (error) {
		console.error("Get reviews error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch reviews" },
			{ status: 500 },
		);
	}
}
