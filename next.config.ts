import "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "primary-v2-b54a.up.railway.app",
				port: "",
				pathname: "/wp-content/uploads/**", // allow all images under this path
			},
		],
	},
};

export default nextConfig;
