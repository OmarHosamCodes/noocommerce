import { wcApi } from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		const { data } = await wcApi.get(`orders/${id}`);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Get order error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch order details" },
			{ status: 500 },
		);
	}
}
