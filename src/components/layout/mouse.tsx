import { m } from "framer-motion";
import { SetStateAction, useState, Dispatch } from "react";

export default function SVGMouse({
	mousePosition,
}: {
	mousePosition: { x: number; y: number };
}) {
	// const ref = useRef<HTMLDivElement>(null);

	// const handleMouseMove = async (
	// 	e: React.MouseEvent<HTMLElement, MouseEvent>
	// ) => {
	// 	// setMouseX(e.clientX);
	// 	// setMouseY(e.clientY);
	// 	setMousePosition({
	// 		x: e.clientX,
	// 		y: e.clientY,
	// 	});
	// };
	return (
		<>
			<m.div className='pointer-events-none [mask-image:url(/media/1.svg)] bg-transparent fixed inset-x-0 top-0 h-screen'>
				<m.div
					className='pointer-events-none fixed bg-gradient-radial opacity-10 from-primary-900/10 via-secondary-300/10 to-transparent border-primary-400 animate-pulse rounded-[50%] w-32 h-32 '
					animate={{
						x: mousePosition.x - 60,
						y: mousePosition.y - 60,
					}}
					transition={{
						type: "tween",
					}}></m.div>
			</m.div>
			<m.div className='pointer-events-none [mask-image:url(/media/2.svg)] bg-transparent fixed inset-x-0 top-0 h-screen'>
				<m.div
					className='pointer-events-none fixed rounded-[50%] w-14 h-14 bg-gradient-to-l from-accent-400/50 to-secondary-500/70'
					animate={{
						x: mousePosition.x - 24,
						y: mousePosition.y - 24,
					}}
					transition={{
						type: "spring",
						damping: 50,
						stiffness: 150,
					}}></m.div>

				<m.div
					className='pointer-events-none fixed rounded-[50%] w-12 h-12 bg-gradient-to-l from-tertiary-400/50 to-primary-300/70'
					animate={{
						x:
							mousePosition.x +
							(10 - Math.random() * 20),
						y:
							mousePosition.y +
							(10 - Math.random() * 20),
					}}
					transition={{
						type: "spring",
						damping: 120,
						stiffness: 140,
					}}></m.div>
			</m.div>

			<m.div
				className='pointer-events-none z-[9000] fixed border-2 border-primary-400/50 animate-pulse rounded-[50%] w-6 h-6 '
				animate={{
					x: mousePosition.x - 8,
					y: mousePosition.y - 8,
				}}
				transition={{
					type: "tween",
					duration: "0",
				}}></m.div>
		</>
	);
}
