import { z } from "zod";

// Checkout Form Schema
export const checkoutSchema = z.object({
	// Shipping Details
	firstName: z.string().min(2, "First name must be at least 2 characters"),
	lastName: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email address"),
	address: z.string().min(5, "Address must be at least 5 characters"),
	country: z.string().min(2, "Please enter your country"),
	zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
	phone: z
		.string()
		.regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number")
		.min(10, "Phone number must be at least 10 digits"),

	// Payment Method
	paymentMethod: z.literal("cod"),
});

// Login Form Schema
export const loginSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register Form Schema
export const registerSchema = z
	.object({
		username: z.string().min(3, "Username must be at least 3 characters"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

// Newsletter Form Schema
export const newsletterSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
