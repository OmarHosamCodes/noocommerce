import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type {
	WooProduct,
	WooProductCategory,
	WooProductReview,
	WooProductVariation,
} from "@/types/woo";

// Query Keys
export const queryKeys = {
	products: {
		all: ["products"] as const,
		list: (params?: Record<string, unknown>) =>
			[...queryKeys.products.all, "list", params] as const,
		detail: (slug: string) =>
			[...queryKeys.products.all, "detail", slug] as const,
		variations: (id: number) =>
			[...queryKeys.products.all, "variations", id] as const,
		reviews: (id: number) =>
			[...queryKeys.products.all, "reviews", id] as const,
	},
	categories: {
		all: ["categories"] as const,
		list: () => [...queryKeys.categories.all, "list"] as const,
	},
};

// Products API
export const useProducts = (params?: Record<string, unknown>) => {
	return useQuery({
		queryKey: queryKeys.products.list(params),
		queryFn: async () => {
			const { data } = await apiClient.get<{
				products: WooProduct[];
				pagination: {
					total: number;
					totalPages: number;
					currentPage: number;
					perPage: number;
				};
			}>("/api/products", {
				params,
			});
			return data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useProduct = (slug: string) => {
	return useQuery({
		queryKey: queryKeys.products.detail(slug),
		queryFn: async () => {
			const { data } = await apiClient.get<WooProduct>(`/api/products/${slug}`);
			return data;
		},
		enabled: !!slug,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useProductVariations = (productId: number) => {
	return useQuery({
		queryKey: queryKeys.products.variations(productId),
		queryFn: async () => {
			const { data } = await apiClient.get<WooProductVariation[]>(
				`/api/products/variations/${productId}`,
			);
			return data;
		},
		enabled: !!productId,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useProductReviews = (productId: number) => {
	return useQuery({
		queryKey: queryKeys.products.reviews(productId),
		queryFn: async () => {
			const { data } = await apiClient.get<WooProductReview[]>(
				`/api/products/reviews/${productId}`,
			);
			return data;
		},
		enabled: !!productId,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Categories API
export const useCategories = () => {
	return useQuery({
		queryKey: queryKeys.categories.list(),
		queryFn: async () => {
			const { data } =
				await apiClient.get<WooProductCategory[]>("/api/categories");
			return data;
		},
		staleTime: 15 * 60 * 1000, // 15 minutes (categories change less frequently)
	});
};

// Order Mutation
export const useCreateOrder = () => {
	return useMutation({
		mutationFn: async (orderData: unknown) => {
			const { data } = await apiClient.post("/api/order/create", orderData);
			return data;
		},
	});
};

// Prefetch helpers for SSR
export const prefetchProducts = async (
	queryClient: QueryClient,
	params?: Record<string, unknown>,
) => {
	await queryClient.prefetchQuery({
		queryKey: queryKeys.products.list(params),
		queryFn: async () => {
			const { data } = await apiClient.get<{
				products: WooProduct[];
				pagination: {
					total: number;
					totalPages: number;
					currentPage: number;
					perPage: number;
				};
			}>("/api/products", {
				params,
			});
			return data;
		},
	});
};

export const prefetchProduct = async (
	queryClient: QueryClient,
	slug: string,
) => {
	await queryClient.prefetchQuery({
		queryKey: queryKeys.products.detail(slug),
		queryFn: async () => {
			const { data } = await apiClient.get<WooProduct>(`/api/products/${slug}`);
			return data;
		},
	});
};

export const prefetchCategories = async (queryClient: QueryClient) => {
	await queryClient.prefetchQuery({
		queryKey: queryKeys.categories.list(),
		queryFn: async () => {
			const { data } =
				await apiClient.get<WooProductCategory[]>("/api/categories");
			return data;
		},
	});
};
