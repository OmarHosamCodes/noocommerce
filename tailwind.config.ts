import animate from "tailwindcss-animate";

export default {
	content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-almarai)", "var(--font-poppins)", "sans-serif"],
				almarai: ["var(--font-almarai)", "sans-serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
		},
	},
	plugins: [animate],
};
