"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { TransitionOverlay } from "./TransitionOverlay";

interface TransitionProviderApi {
	pathname: string;
	isTransitioning: boolean;
	navigateWithTransition: (url: string) => Promise<void>;
}

const TransitionContext = createContext<TransitionProviderApi | null>(null);

interface TransitionProviderProps {
	delay?: number;
}

export const TransitionProvider: React.FC<
	TransitionProviderProps & React.PropsWithChildren
> = ({ children, delay = 600 }) => {
	const router = useRouter();
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [pathname, setIsPathname] = useState("");

	const navigateWithTransition = async (url: string) => {
		setIsTransitioning(true);
		setIsPathname(url);
		await new Promise((resolve) => setTimeout(resolve, delay));
		router.push(url);
		setTimeout(() => setIsTransitioning(false), delay);
	};

	return (
		<TransitionContext.Provider
			value={{ isTransitioning, navigateWithTransition, pathname }}
		>
			{children}
			<TransitionOverlay duration={delay / 1000} pathname={pathname} />
		</TransitionContext.Provider>
	);
};

export function useTransition() {
	const isTransitioning = useContext(TransitionContext);

	if (!isTransitioning) {
		throw new Error("Missing TransitionContext");
	}

	return isTransitioning;
}
