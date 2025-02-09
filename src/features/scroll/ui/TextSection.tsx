interface TextSectionProps {
	text: string;
}

export const TextSection: React.FC<TextSectionProps> = ({ text }) => (
	<section className="demo-text">
		<div
			className="wrapper font-black leading-none"
			style={{ fontSize: "clamp(8rem, 15vw, 16rem)" }}
		>
			{text}
		</div>
	</section>
);
