"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/hooks/useApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategorySliderClient() {
	const { data: categories, isLoading, error } = useCategories();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader2 className="h-8 w-8 animate-spin text-gray-500" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center py-20">
				<p className="text-red-500">Failed to load categories</p>
			</div>
		);
	}

	if (!categories || categories.length === 0) {
		return null;
	}

	return (
		<div className="container mx-auto px-4 py-10">
			<h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={2}
				navigation
				pagination={{ clickable: true }}
				breakpoints={{
					640: { slidesPerView: 3 },
					768: { slidesPerView: 4 },
					1024: { slidesPerView: 5 },
				}}
				className="category-swiper"
			>
				{categories.map((category) => (
					<SwiperSlide key={category.id}>
						<Link
							href={`/shop?category=${category.id}`}
							className="block group"
						>
							<div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
								{category.image && (
									<Image
										src={category.image.src}
										alt={category.name}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								)}
							</div>
							<h3 className="mt-3 text-center font-medium group-hover:text-blue-600 transition-colors">
								{category.name}
							</h3>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
