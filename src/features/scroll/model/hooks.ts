"use client";

import gsap from "gsap";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import forEach from "lodash/forEach";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const useScrollAnimations = (
	loaderRef: React.RefObject<HTMLDivElement>,
): number => {
	const [progress, setProgress] = useState<number>(0);

	useGSAP(() => {
		const images = gsap.utils.toArray<HTMLImageElement>("img");

		if (!loaderRef.current) return;

		const updateProgress = (instance: any) => {
			const newProgress = Math.round(
				(instance.progressedCount * 100) / images.length,
			);
			setProgress(newProgress);
		};

		const showDemo = () => {
			document.body.style.overflow = "auto";
			document.scrollingElement?.scrollTo(0, 0);

			if (loaderRef.current) {
				gsap.to(loaderRef.current, { autoAlpha: 0 });
			}

			gsap.utils.toArray<HTMLElement>("section").forEach((section, index) => {
				const wrapper = section.querySelector<HTMLElement>(".wrapper");
				if (!wrapper) return;

				const xStart = index % 2 ? "100%" : `-${wrapper.scrollWidth}px`;
				const xEnd =
					index % 2 ? `${-(wrapper.scrollWidth - section.offsetWidth)}px` : "0";

				gsap.fromTo(
					wrapper,
					{ x: xStart },
					{
						x: xEnd,
						scrollTrigger: {
							trigger: section,
							scrub: 0.5,
						},
					},
				);
			});
		};

		const imgLoadInstance = imagesLoaded(images, { background: true });
		imgLoadInstance.on("progress", updateProgress);
		imgLoadInstance.on("always", showDemo);

		return () => {
			imgLoadInstance.off("progress", updateProgress);
			imgLoadInstance.off("always", showDemo);
			if (loaderRef.current) {
				gsap.killTweensOf(loaderRef.current);
			}
			forEach(ScrollTrigger.getAll(), (trigger) => trigger.kill());
		};
	}, [loaderRef]);

	return progress;
};
