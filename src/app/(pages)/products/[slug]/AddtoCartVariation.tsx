"use client";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const AddToCartVariation = ({
	product,
	variation,
}: {
	product: any;
	variation: any;
}) => {
	const { addToCart } = useCartStore();

	console.log(variation);
	const handleAdd = () => {
		addToCart({
			id: variation.id,
			name: product.name,
			slug: product.slug,
			price: variation.price,
			regular_price: variation.regular_price,
			sale_price: variation.sale_price,
			images: variation?.image?.src || "",
			type: "variable",
			parentId: variation.parent_id,
			variationName: variation.name,
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

export default AddToCartVariation;
