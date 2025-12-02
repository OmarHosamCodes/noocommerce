"use client";

import { Star, User } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const Reviews = ({
	id,
	reviews,
	setReviews,
	reviewsLoaded,
}: {
	id: number;
	reviews: any[];
	setReviews: React.Dispatch<React.SetStateAction<any[]>>;
	reviewsLoaded: boolean;
}) => {
	const { user, isAuthenticated } = useAuthStore();

	const [form, setForm] = React.useState({
		reviewer: "",
		reviewer_email: "",
		review: "",
		rating: 5,
	});

	const [submitting, setSubmitting] = React.useState(false);

	// Pre-fill form with user data if authenticated
	React.useEffect(() => {
		if (isAuthenticated && user) {
			setForm((prev) => ({
				...prev,
				reviewer: user.displayName || "",
				reviewer_email: user.email || "",
			}));
		}
	}, [isAuthenticated, user]);

	// ✅ Fetch only once if not already loaded
	React.useEffect(() => {
		if (reviewsLoaded || !id) return;
		const fetchReviews = async () => {
			try {
				const res = await fetch(`/api/products/reviews/${id}`);
				if (!res.ok) throw new Error("Failed to fetch reviews");
				const data = await res.json();
				setReviews(data);
			} catch (err) {
				console.error("Error fetching reviews:", err);
			}
		};
		fetchReviews();
	}, [id, reviewsLoaded, setReviews]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const reviewData = {
				...form,
				product_id: id,
				// Ensure we use authenticated user's info if available
				reviewer: isAuthenticated && user ? user.displayName : form.reviewer,
				reviewer_email:
					isAuthenticated && user ? user.email : form.reviewer_email,
			};

			const res = await fetch(`/api/products/reviews`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reviewData),
			});

			if (!res.ok) throw new Error("Failed to submit review");

			const { review } = await res.json();
			setReviews((prev) => [review, ...prev]);

			// Only reset review text and rating, keep user info if authenticated
			if (isAuthenticated && user) {
				setForm((prev) => ({ ...prev, review: "", rating: 5 }));
			} else {
				setForm({ reviewer: "", reviewer_email: "", review: "", rating: 5 });
			}

			toast.success("Review submitted successfully!");
		} catch (error) {
			console.error("Error submitting review:", error);
			toast.error("Failed to submit review. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="px-4 md:px-6 py-12 flex flex-col md:flex-row gap-8">
			{/* 📝 Reviews List */}
			<div className="w-full md:w-1/2 max-h-[500px] overflow-y-auto md:px-4">
				<h2 className="text-xl font-medium mb-4">
					{reviews.length} Review{reviews.length !== 1 && "s"} for this product
				</h2>
				<div className="space-y-4">
					{reviews.length === 0 ? (
						<p className="text-gray-500">
							No reviews yet. Be the first to review!
						</p>
					) : (
						reviews.map((r) => (
							<div key={r.id} className="bg-white p-4 rounded-lg shadow">
								<div className="w-full flex justify-between">
									<div className="flex items-center gap-4">
										<div className="w-8 h-8 bg-gray-300 rounded-full text-lg flex items-center justify-center text-white">
											<User className="w-5 h-5" />
										</div>
										<p className="font-medium capitalize text-lg">
											{r.reviewer}
										</p>
									</div>
									<div className="flex gap-0.5">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i.toString()}
												className={`w-5 h-5 ${
													i < r.rating
														? "fill-yellow-500 text-yellow-500"
														: "text-gray-200"
												}`}
											/>
										))}
									</div>
								</div>
								<div
									className="text-gray-700 text-sm my-4 mx-2 mt-6"
									dangerouslySetInnerHTML={{ __html: r.review }}
								/>
							</div>
						))
					)}
				</div>
			</div>

			{/* 💬 Add Review Form */}
			<div className="w-full md:w-1/2 space-y-2">
				<h3 className="text-xl font-medium text-gray-800">Add a Review</h3>
				<p className="text-gray-600 text-sm">
					Your email address will not be published. Required fields are marked{" "}
					<span className="text-red-500">*</span>
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* ⭐ Rating */}
					<div className="flex gap-4 items-center mt-4">
						<label className="block font-medium mb-1">
							Your Rating<span className="text-red-500">*</span>
						</label>
						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<label key={star}>
									<input
										type="radio"
										name="rating"
										value={star}
										checked={form.rating === star}
										onChange={() => setForm({ ...form, rating: star })}
										className="hidden"
									/>
									<Star
										className={`w-6 h-6 cursor-pointer transition ${
											star <= form.rating
												? "fill-yellow-500 text-yellow-500"
												: "text-gray-300"
										}`}
									/>
								</label>
							))}
						</div>
					</div>

					<div className="bg-white p-4 rounded-lg shadow-sm space-y-4 mt-4">
						{/* 💬 Review Text */}
						<div>
							<label className="block text-gray-800 mb-1">Your Review</label>
							<textarea
								className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-gray-700 placeholder:text-gray-500"
								rows={4}
								maxLength={250}
								placeholder="Write your review..."
								value={form.review}
								onChange={(e) => setForm({ ...form, review: e.target.value })}
								required
							></textarea>
							<div className=" flex justify-between text-right text-sm text-gray-500">
								<span>Maximum</span> {form.review.length}/250
							</div>
						</div>
						{!isAuthenticated && (
							<div className="flex flex-col md:flex-row gap-4">
								{/* 👤 Name */}
								<div className="w-full md:w-1/2">
									<label className="block text-gray-800 mb-1">
										Name<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-gray-700  placeholder:text-gray-500"
										value={form.reviewer}
										onChange={(e) =>
											setForm({ ...form, reviewer: e.target.value })
										}
										required
										placeholder="Name"
									/>
								</div>

								{/* 📧 Email */}
								<div className="w-full md:w-1/2">
									<label className="block text-gray-800 mb-1">
										Email<span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-gray-700  placeholder:text-gray-500"
										value={form.reviewer_email}
										onChange={(e) =>
											setForm({ ...form, reviewer_email: e.target.value })
										}
										required
										placeholder="Email"
									/>
								</div>
							</div>
						)}
						{isAuthenticated && (
							<div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
								Posting as <strong>{user?.displayName}</strong> ({user?.email})
							</div>
						)}{" "}
						{/* 🚀 Submit */}
						<button
							type="submit"
							disabled={submitting}
							className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
						>
							{submitting ? "Submitting..." : "Submit Review"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Reviews;
