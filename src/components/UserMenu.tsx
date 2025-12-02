"use client";

import { useAuthStore } from "@/store/authStore";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function UserMenu() {
	const { isAuthenticated, user, logout } = useAuthStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		toast.success("Logged out successfully");
		router.push("/");
	};

	if (isAuthenticated && user) {
		return (
			<div className="relative group">
				<button
					type="button"
					className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
				>
					<User className="w-5 h-5" />
					<span className="hidden md:inline text-sm font-medium">
						{user.displayName || user.username}
					</span>
				</button>

				{/* Dropdown Menu */}
				<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-50">
					<div className="px-4 py-3 border-b border-gray-200">
						<p className="text-sm font-medium text-gray-900 truncate">
							{user.displayName}
						</p>
						<p className="text-xs text-gray-500 truncate">{user.email}</p>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
					>
						<LogOut className="w-4 h-4" />
						Logout
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<Link href="/login">
				<Button variant="ghost" size="sm" className="gap-2">
					<LogIn className="w-4 h-4" />
					<span className="hidden md:inline">Login</span>
				</Button>
			</Link>
			<Link href="/register" className="hidden md:block">
				<Button size="sm" className="gap-2">
					<UserPlus className="w-4 h-4" />
					Register
				</Button>
			</Link>
		</div>
	);
}
