import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register",
	description: "Create a new account",
};

export default function RegisterPage() {
	return (
		<div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
			<RegisterForm />
		</div>
	);
}
