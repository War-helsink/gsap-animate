"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { useTransition } from "@/widgets/animated";

export const NavLink: React.FC<React.ComponentProps<typeof Link>> = ({
	className,
	href,
	...props
}) => {
	const { navigateWithTransition } = useTransition();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		navigateWithTransition(href as string);
	};

	return (
		<Link
			className={cn("text-sm/6 font-semibold text-gray-900", className)}
			onClick={handleClick}
			href={href}
			{...props}
		/>
	);
};
