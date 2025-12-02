import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TopLoader from "@/components/TopLoader";
import { siteConfig } from "@/lib/config";
import QueryProvider from "@/providers/QueryProvider";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { Almarai, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const almarai = Almarai({
	subsets: ["arabic"],
	variable: "--font-almarai",
	weight: ["300", "400", "700", "800"],
});

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${almarai.variable} ${poppins.variable}`}>
			<body
				className="font-sans antialiased"
				style={{
					fontFamily: "var(--font-almarai), var(--font-poppins), sans-serif",
				}}
			>
				<QueryProvider>
					<TopLoader />
					<Header />
					<Navbar />
					{children}
					<Footer />
					<Toaster
						position="top-center"
						toastOptions={{
							success: {
								duration: 2000,
								icon: <Check className="w-5 h-5" />,
								iconTheme: {
									secondary: "#00f",
									primary: "#fff",
								},
								style: {
									background: "fff",
									color: "#1E2939",
									padding: "10px 20px ",
									border: "1px solid #E2E8F0",
									boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
									borderRadius: "10px",
									fontWeight: "500",
								},
							},
						}}
					/>
				</QueryProvider>
			</body>
		</html>
	);
}
