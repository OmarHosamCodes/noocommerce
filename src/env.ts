import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		WOO_KEY: z.string().min(1),
		WOO_SECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_BASE_URL: z.url().min(1),

		NEXT_PUBLIC_WOOCOMMERCE_URL: z.url().min(1),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	runtimeEnv: {
		WOO_KEY: process.env.WOO_KEY,
		WOO_SECRET: process.env.WOO_SECRET,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		NEXT_PUBLIC_WOOCOMMERCE_URL: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
	},
	skipValidation: true,
});
