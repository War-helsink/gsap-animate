interface GallerySectionProps {
	imageSigs: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
	imageSigs,
}) => (
	<section className="demo-gallery pb-4">
		<ul className="wrapper flex">
			{imageSigs.map((sig) => (
				<li
					key={sig}
					className="flex-shrink-0 pr-4"
					style={{ width: "clamp(500px, 60vw, 800px)" }}
				>
					<img
						src={`https://source.unsplash.com/random/1240x874?sig=${sig}`}
						alt=""
						className="w-full h-auto bg-gray-200"
						height={874}
						width={1240}
					/>
				</li>
			))}
		</ul>
	</section>
);
