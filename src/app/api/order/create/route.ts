import { type NextRequest, NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const {
			firstName,
			lastName,
			email,
			address,
			country,
			zip,
			phone,
			paymentMethod,
			items,
			total,
			shipping,
			customer_id,
		} = body;

		// Map cart items to WooCommerce order line_items
		const line_items = items.map((item: any) => ({
			product_id: +item.product_id,
			variation_id: +item.variation_id,
			quantity: item.quantity,
		}));

		const orderData: any = {
			payment_method: paymentMethod,
			payment_method_title:
				paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod,
			set_paid: false,
			billing: {
				first_name: firstName,
				last_name: lastName,
				address_1: address,
				city: "",
				state: "",
				postcode: zip,
				country,
				email,
				phone,
			},
			shipping: {
				first_name: firstName,
				last_name: lastName,
				address_1: address,
				city: "",
				state: "",
				postcode: zip,
				country,
			},
			line_items,
			shipping_lines: [
				{
					method_id: "flat_rate",
					method_title: "Flat Rate",
					total: shipping,
				},
			],
		};

		// Link order to customer if authenticated
		// Try to find customer by email first, then use provided customer_id
		if (customer_id || email) {
			try {
				// Search for existing customer by email
				const { data: customers } = await wcApi.get("customers", {
					email: email,
					per_page: 1,
				});

				if (customers && customers.length > 0) {
					// Use the WooCommerce customer ID
					orderData.customer_id = customers[0].id;
				} else if (customer_id) {
					// Fallback to provided customer_id (WordPress user ID might match)
					orderData.customer_id = customer_id;
				}
			} catch (error) {
				console.error("Error fetching customer:", error);
				// If lookup fails, still try with the provided customer_id
				if (customer_id) {
					orderData.customer_id = customer_id;
				}
			}
		}

		const { data } = await wcApi.post("orders", orderData);

		return NextResponse.json(
			{ message: "Order Created Successfully", order: data },
			{ status: 200 },
		);
	} catch (error: any) {
		console.error("WooCommerce Order Error:", error.response?.data || error);
		return NextResponse.json(
			{ error: "Failed to create order", details: error.message },
			{ status: 500 },
		);
	}
}
