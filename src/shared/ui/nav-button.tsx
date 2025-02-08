import Link from "next/link";
import { cn } from "@/shared/lib/utils";

export const NavButton: React.FC<React.ComponentProps<typeof Link>> = ({
	className,
	...props
}) => {
	return (
		<Link
			className={cn("text-sm/6 font-semibold text-gray-900", className)}
			{...props}
		/>
	);
};
