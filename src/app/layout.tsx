import type { Metadata } from "next";
import { Almarai, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import DesktopNavbar from "@/components/DesktopNavbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";
import TopLoader from "@/components/TopLoader";
import { siteConfig } from "@/lib/config";
import Providers from "@/providers/Providers";
import "./globals.css";

const almarai = Almarai({
	weight: ["300", "400", "700", "800"],
	subsets: ["arabic"],
	variable: "--font-almarai",
});

const poppins = Poppins({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${almarai.variable} ${poppins.variable} antialiased`}>
				<Providers>
					<TopLoader />
					<Header />
					<DesktopNavbar />
					<main className="min-h-screen pb-20 md:pb-0">{children}</main>
					<MobileBottomNav />
					<Footer />
					<Toaster position="top-right" richColors />
				</Providers>
			</body>
		</html>
	);
}
