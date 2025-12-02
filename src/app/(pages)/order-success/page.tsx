"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderSuccessPage = () => {
	const router = useRouter();

	return (
		<div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
			<CheckCircle className="text-blue-500 w-36 h-36 mb-4" />
			<h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
			<p className="text-gray-600 max-w-md mb-8">
				Thank you for your purchase. We’ve received your order and it’s being
				processed. You’ll receive a confirmation email shortly.
			</p>

			<Button
				className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-6 text-lg"
				onClick={() => router.push("/")}
			>
				Back to Home
			</Button>
		</div>
	);
};

export default OrderSuccessPage;
