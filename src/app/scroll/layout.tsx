import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ScrollTrigger Demo",
};

export default function ScrollLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
