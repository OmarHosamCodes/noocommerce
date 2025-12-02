import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Sign in to your account",
};

export default function LoginPage() {
	return (
		<div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
			<LoginForm />
		</div>
	);
}
