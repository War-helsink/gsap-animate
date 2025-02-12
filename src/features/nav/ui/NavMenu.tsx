"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavLink } from "@/shared/ui";

export interface NavMenuProps {
	text: string;
	menuItems: MenuItem[];
}

interface MenuItem {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	href: string;
	title: string;
	description: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({ text, menuItems }) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((prev) => !prev);

	return (
		<div className="relative">
			<button
				type="button"
				className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 cursor-pointer"
				onClick={toggleOpen}
			>
				{text}
				{open ? <ChevronDown /> : <ChevronUp />}
			</button>
			<div
				className={cn(
					"hidden absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5",
					open && "block",
				)}
			>
				<div className="p-4">
					{menuItems.map((menuItem) => (
						<div
							key={menuItem.title}
							className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
						>
							<div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
								<menuItem.icon className="size-6 text-gray-600 group-hover:text-indigo-600" />
							</div>
							<div className="flex-auto">
								<NavLink
									href={menuItem.href}
									className="block font-semibold text-gray-900"
								>
									{menuItem.title}
									<span className="absolute inset-0" />
								</NavLink>
								<p className="mt-1 text-gray-600">{menuItem.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
