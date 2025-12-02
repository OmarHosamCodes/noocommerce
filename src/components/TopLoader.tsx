"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function TopLoader() {
	const _pathname = usePathname();

	useEffect(() => {
		NProgress.start();
		const timer = setTimeout(() => {
			NProgress.done();
		}, 400); // smooth finish delay

		return () => {
			clearTimeout(timer);
			NProgress.done();
		};
	}, []);

	return null;
}
