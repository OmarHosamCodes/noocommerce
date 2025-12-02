import animate from "tailwindcss-animate";

export default {
	content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-poppins)", "Inter", "system-ui", "sans-serif"],
				serif: ["Georgia", "Playfair Display", "serif"],
				heading: ["Georgia", "Playfair Display", "serif"],
				almarai: ["var(--font-almarai)", "sans-serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
			backdropBlur: {
				xs: "2px",
			},
		},
	},
	plugins: [animate],
};
