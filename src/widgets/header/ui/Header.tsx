"use client";

import Link from "next/link";
import { NavButton } from "@/shared/ui";
import { routesConfig } from "@/shared/config";

export const Header: React.FC = () => {
	return (
		<header className="bg-white">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex flex-1">
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img
							className="h-8 w-auto"
							src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</Link>
				</div>
				<div className="flex gap-x-12">
					<NavButton href={routesConfig.scroll}>Scroll</NavButton>
					<NavButton href={routesConfig.horizontalScroll}>
						Horizontal Scroll
					</NavButton>
				</div>
				<div className="flex-1" />
			</nav>
		</header>
	);
};
