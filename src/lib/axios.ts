import axios from "axios";
import { env } from "@/env";

export const apiClient = axios.create({
	baseURL: env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	},
);

export default apiClient;
