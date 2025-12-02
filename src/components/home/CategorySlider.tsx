"use client";

import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useRef } from "react";
import type { WooProductCategory } from "@/types/woo";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CategorySliderProps {
	categories: WooProductCategory[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories }) => {
	const swiperRef = useRef<any>(null);

	return (
		<section className="container mx-auto px-6 py-12 border-b border-gray-200">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-semibold text-gray-800">
					Shop by Category
				</h2>

				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => swiperRef.current?.slidePrev()}
						className="p-2 px-3 bg-white border-gray-200 border hover:bg-blue-50 transition"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						type="button"
						onClick={() => swiperRef.current?.slideNext()}
						className="p-2 px-3 bg-white border-gray-200 border hover:bg-blue-50 transition"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>

			{/* Swiper */}
			<Swiper
				modules={[Navigation, Autoplay]}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true,
				}}
				loop
				spaceBetween={20}
				slidesPerView={2}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				breakpoints={{
					640: { slidesPerView: 3 },
					768: { slidesPerView: 4 },
					1024: { slidesPerView: 6 },
				}}
			>
				{categories
					.filter((cat) => cat.id !== 15) // optional exclusion
					.map((cat) => (
						<SwiperSlide key={cat.id}>
							<Link
								href={`/shop?category=${cat.id}`}
								className="rounded-lg p-4 flex flex-col items-center justify-center transition"
							>
								{cat.image?.src ? (
									<div className="w-[120px] h-[120px] bg-gray-100 rounded-full flex items-center justify-center">
										<Image
											src={cat.image.src}
											alt={cat.name}
											width={60}
											height={60}
											loading="lazy"
										/>
									</div>
								) : (
									<div className="w-[120px] h-[120px] bg-gray-100 rounded-full flex items-center justify-center">
										<ImageIcon className="w-8 h-8 text-gray-400" />
									</div>
								)}
								<p className="mt-3 text-gray-700 font-medium text-center text-sm">
									{cat.name}
								</p>
							</Link>
						</SwiperSlide>
					))}
			</Swiper>
		</section>
	);
};

export default CategorySlider;
