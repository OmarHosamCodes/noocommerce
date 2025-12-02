import { env } from "@/env";
import axios from "axios";

export const apiClient = axios.create({
	baseURL: env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
	(config) => {
		// Get token from localStorage
		if (typeof window !== "undefined") {
			const authStorage = localStorage.getItem("auth-storage");
			if (authStorage) {
				try {
					const { state } = JSON.parse(authStorage);
					if (state?.token) {
						config.headers.Authorization = `Bearer ${state.token}`;
					}
				} catch (error) {
					console.error("Error parsing auth storage:", error);
				}
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);

		// Handle unauthorized errors
		if (error.response?.status === 401) {
			// Clear auth storage on unauthorized
			if (typeof window !== "undefined") {
				localStorage.removeItem("auth-storage");
				// Optionally redirect to login
				// window.location.href = '/login';
			}
		}

		return Promise.reject(error);
	},
);

export default apiClient;
