"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	useGSAP(() => {
		const images = gsap.utils.toArray("img");
		const loader = document.querySelector(".loader--text");

		const updateProgress = (instance: any) => {
			if (loader) {
				loader.textContent = `${Math.round(
					(instance.progressedCount * 100) / images.length,
				)}%`;
			}
		};

		const showDemo = () => {
			document.body.style.overflow = "auto";
			document.scrollingElement?.scrollTo(0, 0);

			gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

			gsap.utils.toArray("section").forEach((section: any, index: number) => {
				const w = section.querySelector(".wrapper");
				if (!w) return;

				const xStart = index % 2 ? "100%" : `${-w.scrollWidth}px`;
				const xEnd =
					index % 2 ? `${-(w.scrollWidth - section.offsetWidth)}px` : "0";
				gsap.fromTo(
					w,
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

		(imagesLoaded(images as any) as any)
			.on("progress", updateProgress)
			.on("always", showDemo);
	}, []);

	return (
		<>
			<div className="loader fixed inset-0 flex items-center justify-center bg-black text-white z-50">
				<div className="text-center">
					<h1 className="text-[5rem]">Loading</h1>
					<h2 className="loader--text text-[2rem]">0%</h2>
				</div>
			</div>

			<div className="demo-wrapper overflow-x-hidden">
				<header className="flex items-center justify-center h-screen">
					<div className="text-center">
						<h1 className="text-[5rem]">ScrollTrigger</h1>
						<h2 className="text-[2rem]">demo</h2>
					</div>
				</header>

				<section className="demo-text">
					<div
						className="wrapper font-black leading-none"
						style={{ fontSize: "clamp(8rem, 15vw, 16rem)" }}
					>
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
					</div>
				</section>

				<section className="demo-gallery pb-4">
					<ul className="wrapper flex">
						{["178", "93", "163", "179"].map((sig) => (
							<li
								key={sig}
								className="flex-shrink-0 pr-4"
								style={{ width: "clamp(500px, 60vw, 800px)" }}
							>
								<img
									src={`https://source.unsplash.com/random/1240x874?sig=${sig}`}
									alt=""
									className="w-full h-auto bg-gray-200"
									height="874"
									width="1240"
								/>
							</li>
						))}
					</ul>
				</section>

				<section className="demo-gallery pb-4">
					<ul className="wrapper flex">
						{["39", "76", "141"].map((sig) => (
							<li
								key={sig}
								className="flex-shrink-0 pr-4"
								style={{ width: "clamp(500px, 60vw, 800px)" }}
							>
								<img
									src={`https://source.unsplash.com/random/1240x874?sig=${sig}`}
									alt=""
									className="w-full h-auto bg-gray-200"
									height="874"
									width="1240"
								/>
							</li>
						))}
					</ul>
				</section>

				<section className="demo-gallery pb-4">
					<ul className="wrapper flex">
						{["106", "4", "24"].map((sig) => (
							<li
								key={sig}
								className="flex-shrink-0 pr-4"
								style={{ width: "clamp(500px, 60vw, 800px)" }}
							>
								<img
									src={`https://source.unsplash.com/random/1240x874?sig=${sig}`}
									alt=""
									className="w-full h-auto bg-gray-200"
									height="874"
									width="1240"
								/>
							</li>
						))}
					</ul>
				</section>

				<section className="demo-gallery pb-4">
					<ul className="wrapper flex">
						{["122", "59", "149", "107"].map((sig) => (
							<li
								key={sig}
								className="flex-shrink-0 pr-4"
								style={{ width: "clamp(500px, 60vw, 800px)" }}
							>
								<img
									src={`https://source.unsplash.com/random/1240x874?sig=${sig}`}
									alt=""
									className="w-full h-auto bg-gray-200"
									height="874"
									width="1240"
								/>
							</li>
						))}
					</ul>
				</section>

				<section className="demo-text">
					<div
						className="wrapper font-black leading-none"
						style={{ fontSize: "clamp(8rem, 15vw, 16rem)" }}
					>
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
					</div>
				</section>

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
}
