"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomePage: React.FC = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const animatedDivRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		console.log("Start use GSAP");

		const scrollContainer = scrollContainerRef.current;
		const container = containerRef.current;
		const animatedDiv = animatedDivRef.current;

		if (!scrollContainer || !container || !animatedDiv) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					scroller: scrollContainer,
					start: "top top",
					end: "bottom top",
					scrub: 1,
					pin: container,
				},
			});
			tl.to(
				animatedDiv,
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				},
				0,
			);

			tl.fromTo(".test", { opacity: 0 }, { opacity: 1 }, 0);
		});

		return () => ctx.revert();
	}, []);

	return (
		<main ref={scrollContainerRef} className="overflow-y-scroll w-full h-full">
			<section ref={containerRef} className="relative h-dvh transform-3d">
				<Image
					src="/art.jpg"
					alt="Artwork"
					width={6067}
					height={3467}
					sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
					quality={100}
					priority
					className="w-full h-full object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center">
					<div
						className="w-full h-full bg-[#121212]"
						style={{
							clipPath: "polygon(0px 50%, 100% 50%, 100% 50%, 0px 50%)",
						}}
						ref={animatedDivRef}
					>
						<h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-medium w-2xl text-white test">
							We design for impact. See for yourself.
						</h3>
					</div>
				</div>
			</section>

			<section className="relative flex justify-center items-center h-screen">
				Section
			</section>
		</main>
	);
};

export default HomePage;
