import animate from "tailwindcss-animate";

export default {
	content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [animate],
};
