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
					className='pointer-events-none fixed bg-gradient-radial opacity-10 from-primary-900/10 via-secondary-300/10 to-transparent transition-colors animate-pulse rounded-[50%] w-32 h-32 '
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
					className='pointer-events-none fixed  w-14 h-14'
					animate={{
						x: mousePosition.x - 24,
						y: mousePosition.y - 24,
					}}
					transition={{
						type: "spring",
						damping: 50,
						stiffness: 150,
					}}>
					<span className='pointer-events-none absolute -inset-6 animate-rotate-slow flex items-start '>
						<span className='pointer-events-none rounded-[50%] w-14 h-14 bg-gradient-to-l from-transparent to-secondary-600/60  dark:to-secondary-300/60'></span>
					</span>
				</m.div>

				<m.div
					className='pointer-events-none   fixed w-36 h-36 '
					animate={{
						x:
							mousePosition.x +
							(60 - Math.random() * 120),
						y:
							mousePosition.y +
							(60 - Math.random() * 120),
					}}
					transition={{
						type: "spring",
						damping: 120,
						stiffness: 140,
					}}>
					<span className='pointer-events-none absolute inset-0 animate-rotate-slow flex items-start '>
						<span className='pointer-events-none rounded-[50%] w-12 h-12 bg-gradient-to-l from-transparent to-tertiary-600/50  dark:to-tertiary-400/50'></span>
					</span>
				</m.div>
			</m.div>

			<m.div
				className='pointer-events-none z-[9000] fixed border-2 border-primary-400/80 animate-pulse rounded-[50%] w-8 h-8 '
				animate={{
					x: mousePosition.x - 12,
					y: mousePosition.y - 12,
				}}
				transition={{
					type: "tween",
					duration: "0",
				}}></m.div>
		</>
	);
}
