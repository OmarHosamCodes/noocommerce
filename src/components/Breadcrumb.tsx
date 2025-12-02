import {
	Breadcrumb as BreadcrumbComponent,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

type Props = {
	links: {
		title: string;
		href: string;
	}[];
};

export function Breadcrumb({ links }: Props) {
	return (
		<BreadcrumbComponent>
			<BreadcrumbList>
				{links.map((link, index) => {
					const isLast = index === links.length - 1;
					return (
						<div key={index} className="flex items-center gap-2">
							<BreadcrumbItem>
								{link.href === "#" || isLast ? (
									<BreadcrumbPage>
										{link.title === "Home" && index === 0 ? (
											<Home className="h-4 w-4" />
										) : (
											link.title
										)}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={link.href}>
										{link.title === "Home" && index === 0 ? (
											<Home className="h-4 w-4" />
										) : (
											link.title
										)}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</div>
					);
				})}
			</BreadcrumbList>
		</BreadcrumbComponent>
	);
}
