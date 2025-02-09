"use client";

import {
	Loader,
	TextSection,
	GallerySection,
	useScrollAnimations,
} from "@/features/scroll";
import { useRef } from "react";

const ScrollPage: React.FC = () => {
	const loaderRef = useRef<HTMLDivElement>({} as HTMLDivElement);
	const progress = useScrollAnimations(loaderRef);

	return (
		<>
			<Loader ref={loaderRef} progress={progress} />

			<div className="demo-wrapper overflow-x-hidden">
				<header className="flex items-center justify-center h-screen">
					<div className="text-center">
						<h1 className="text-[5rem]">ScrollTrigger</h1>
						<h2 className="text-[2rem]">demo</h2>
					</div>
				</header>
				<TextSection text="ABCDEFGHIJKLMNOPQRSTUVWXYZ" />

				<GallerySection imageSigs={["178", "93", "163", "179"]} />
				<GallerySection imageSigs={["39", "76", "141"]} />
				<GallerySection imageSigs={["106", "4", "24"]} />
				<GallerySection imageSigs={["122", "59", "149", "107"]} />

				<TextSection text="ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
				<footer className="flex items-center justify-center h-[50vh]">
					<p>
						Images from{" "}
						<a href="https://unsplash.com/" className="text-[#4e9815]">
							Unsplash
						</a>
					</p>
				</footer>
			</div>
		</>
	);
};

export default ScrollPage;
