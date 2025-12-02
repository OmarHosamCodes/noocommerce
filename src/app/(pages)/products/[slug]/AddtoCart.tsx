"use client";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const AddToCart = ({ product }: { product: any }) => {
	const { addToCart } = useCartStore();

	const handleAdd = () => {
		addToCart({
			id: product.id,
			name: product.name,
			slug: product.slug,
			price: product.price,
			regular_price: product.regular_price,
			sale_price: product.sale_price,
			images: product.images[0]?.src || "",
			type: "simple",
		});
		toast.success("Product added to cart!");
	};

	return (
		<button
			type="button"
			onClick={handleAdd}
			className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
		>
			<ShoppingCart className="w-4 h-4" /> Add to Cart
		</button>
	);
};

export default AddToCart;
