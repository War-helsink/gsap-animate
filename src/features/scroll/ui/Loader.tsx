interface LoaderProps {
	progress: number;
	ref?: React.RefObject<HTMLDivElement>;
}

const Loader: React.FC<LoaderProps> = ({ progress, ref }) => (
	<div
		ref={ref}
		className="loader absolute inset-0 flex items-center justify-center bg-black text-white z-10"
	>
		<div className="text-center">
			<h1 className="text-[5rem]">Loading</h1>
			<h2 className="loader--text text-[2rem]">{progress}%</h2>
		</div>
	</div>
);

export { Loader };
