import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register - Noocommerce",
	description: "Create a new account",
};

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<RegisterForm />
		</div>
	);
}
