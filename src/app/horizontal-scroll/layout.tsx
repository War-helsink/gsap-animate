import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Horizontal Scroll",
};

export default function HorizontalScrollLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
