import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TopLoader from "@/components/TopLoader";
import { siteConfig } from "@/lib/config";
import QueryProvider from "@/providers/QueryProvider";
import "remixicon/fonts/remixicon.css";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
	weight: ["400", "500", "700"], // optional: choose weights you’ll use
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
		<html lang="en" className={dmSans.variable}>
			<body className="font-sans antialiased">
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
								icon: <i className="ri-check-line" />,
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
