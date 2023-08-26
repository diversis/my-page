import { ReactNode } from "react";
import { Playfair } from "next/font/google";
import { useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

import Meta from "./meta";
import BodyBG from "@/components/layout/bg";
import Header from "./header";
import Mouse from "./mouse";
import MouseClick from "./click";

const playfair = Playfair({ subsets: ["latin"] });

export default function Layout({
	children,
}: {
	children: ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [clicked, setClicked] = useState(false);
	const [mousePosition, setMousePosition] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [clickPosition, setClickPosition] = useState<
		| {
				x: number;
				y: number;
		  }
		| undefined
	>(undefined);
	const handleMouseMove = async (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setMousePosition({
			x: e.clientX,
			y: e.clientY,
		});
	};
	const handleMouseClick = async (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setClickPosition({ x: e.clientX, y: e.clientY });
	};
	return (
		<>
			<Meta />
			<a
				href='#main'
				className='absolute top-0 z-[9000] mx-auto -translate-y-full bg-white px-4 py-2 transition-transform focus:translate-y-0'>
				Skip to content
			</a>
			<div
				onMouseMove={handleMouseMove}
				onClick={handleMouseClick}
				ref={ref}
				id='layout'>
				<Header />
				{/* <BodyBG /> */}
				<Mouse mousePosition={mousePosition} />
				<MouseClick />
				{/* <AnimatePresence>
					{clicked ? <m.div></m.div> : null}
				</AnimatePresence> */}
				<main
					className={`z-10 flex min-h-screen pt-24 flex-col items-center justify-between ${playfair.className}`}></main>
			</div>
		</>
	);
}
