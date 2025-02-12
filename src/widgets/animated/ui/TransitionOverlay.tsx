"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TransitionOverlayProps {
	duration: number;
	pathname: string;
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
	duration,
	pathname,
}) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				className="fixed top-0 left-0 w-full h-full z-50 bg-black pointer-events-none opacity-100"
				initial={{ opacity: 1 }}
				animate={{ opacity: 0 }}
				exit={{ opacity: [0, 1] }}
				transition={{ duration, ease: "easeInOut" }}
			/>
		</AnimatePresence>
	);
};
