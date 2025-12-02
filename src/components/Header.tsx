import { Phone, Truck } from "lucide-react";

const Header = () => {
	return (
		<div className="hidden md:block bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 py-2">
				<div className="flex justify-between items-center text-sm">
					<div className="flex items-center gap-2">
						<Truck className="h-4 w-4" />
						<p>Free Delivery on orders over $50</p>
					</div>
					<div className="flex items-center gap-2">
						<Phone className="h-4 w-4" />
						<a href="tel:03133430196" className="hover:underline">
							0313-3430196
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
