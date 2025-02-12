"use client";

import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SectionCallbacks {
	start: number;
	end: number;
	param?: any;
	onEnter?: () => void;
	onLeave?: () => void;
	onEnterBack?: () => void;
	onLeaveBack?: () => void;
}

function addSectionCallbacks(
	timeline: gsap.core.Timeline,
	{
		start,
		end,
		param,
		onEnter,
		onLeave,
		onEnterBack,
		onLeaveBack,
	}: SectionCallbacks,
): void {
	const trackDirection = (animation: gsap.core.Animation) => {
		const onUpdate = animation.eventCallback("onUpdate");
		let prevTime = animation.time();
		(animation as any).direction = animation.reversed() ? -1 : 1;
		animation.eventCallback("onUpdate", () => {
			const time = animation.time();
			if (prevTime !== time) {
				(animation as any).direction = time < prevTime ? -1 : 1;
				prevTime = time;
			}
			onUpdate?.call(animation);
		});
	};

	const empty = (v: any) => v;
	if (!(timeline as any).direction) {
		trackDirection(timeline);
	}
	if (start >= 0) {
		timeline.add(
			() =>
				((timeline as any).direction < 0 ? onLeaveBack : onEnter || empty)(
					param,
				),
			start,
		);
	}
	if (end <= timeline.duration()) {
		timeline.add(
			() =>
				((timeline as any).direction < 0 ? onEnterBack : onLeave || empty)(
					param,
				),
			end,
		);
	}
}

const useHorizontalScrollAnimation = (
	containerRef: React.RefObject<HTMLDivElement>,
): void => {
	useGSAP(() => {
		if (!containerRef.current) return;

		const duration = 10;
		const sections = gsap.utils.toArray<HTMLElement>(
			containerRef.current.querySelectorAll(".panel"),
		);
		const sectionCount = sections.length;
		if (sectionCount < 1) return;
		const sectionIncrement = duration / (sectionCount - 1);

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				pin: true,
				scrub: 1,
				snap: 1 / (sectionCount - 1),
				start: "top top",
				end: "+=5000",
			},
		});

		timeline.to(sections, {
			xPercent: -100 * (sectionCount - 1),
			duration: duration,
			ease: "none",
		});

		sections.forEach((section, index) => {
			const tween = gsap.from(section, {
				opacity: 0,
				scale: 0.6,
				duration: 1,
				force3D: true,
				paused: true,
			});
			addSectionCallbacks(timeline, {
				start: sectionIncrement * (index - 0.99),
				end: sectionIncrement * (index + 0.99),
				onEnter: () => tween.play(),
				onLeave: () => tween.reverse(),
				onEnterBack: () => tween.play(),
				onLeaveBack: () => tween.reverse(),
			});

			if (index === 0) {
				tween.progress(1);
			}
		});

		return () => {
			timeline.scrollTrigger?.kill();
			timeline.kill();
		};
	}, [containerRef]);
};

const HorizontalScrollPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
	useHorizontalScrollAnimation(containerRef);

	return (
		<>
			<div ref={containerRef} className="flex flex-nowrap w-[600vw] h-screen">
				{/* Первая (описательная) панель */}
				<div className="panel w-screen flex-shrink-0 bg-blue-500 text-white p-8 flex items-center justify-center">
					<div>
						<h1 className="text-4xl font-bold mb-4">
							Horizontal snapping sections (advanced)
						</h1>
						<p className="mb-4">
							Scroll vertically to scrub the horizontal animation. It also
							dynamically snaps to the sections in an organic way based on the
							velocity. The snapping occurs based on the natural ending position
							after momentum is applied, not a simplistic &quot;wherever it is
							when the user stops&quot;. The fading/scaling happens at a
							consistent rate, not based on how fast you scroll.
						</p>
						<div className="scroll-down flex items-center space-x-2">
							<span>Scroll down</span>
							<div className="arrow w-4 h-4 border-b-2 border-r-2 border-white transform rotate-45" />
						</div>
					</div>
				</div>
				<section className="panel w-screen flex-shrink-0 bg-red-500 text-white flex items-center justify-center text-3xl">
					ONE
				</section>
				<section className="panel w-screen flex-shrink-0 bg-orange-500 text-white flex items-center justify-center text-3xl">
					TWO
				</section>
				<section className="panel w-screen flex-shrink-0 bg-purple-500 text-white flex items-center justify-center text-3xl">
					THREE
				</section>
				<section className="panel w-screen flex-shrink-0 bg-green-500 text-white flex items-center justify-center text-3xl">
					FOUR
				</section>
				<section className="panel w-screen flex-shrink-0 bg-gray-500 text-white flex items-center justify-center text-3xl">
					FIVE
				</section>
			</div>
		</>
	);
};

export default HorizontalScrollPage;
