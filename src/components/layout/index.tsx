import {
	ReactNode,
	SetStateAction,
	useRef,
	useState,
	Dispatch,
	useEffect,
	PointerEvent,
} from "react";
import { Playfair } from "next/font/google";
import { m, AnimatePresence } from "framer-motion";

import Meta from "./meta";
import BodyBG from "@/components/layout/bg";
import Header from "./header";
import Mouse from "./mouse";
import MouseClick from "./click";
import Footer from "./footer";

const playfair = Playfair({ subsets: ["latin"] });

export default function Layout({
	children,
}: {
	children: ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [clicks, setClicks] = useState<
		| {
				[key in keyof string]: {
					x: number;
					y: number;
				};
		  }
		| {}
	>({});
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

	const handlePointerDown = async (
		event: PointerEvent<HTMLDivElement>
	) => {
		const timeKey = Date.now();
		// console.log(event);
		await setClicks((state) => ({
			...state,
			[timeKey]: {
				x: event.clientX,
				y: event.clientY,
			},
		}));
		setTimeout(
			async () =>
				setClicks((state) => {
					const clickState = { ...state };
					delete clickState[timeKey];
					// console.log(clickState);
					return clickState;
				}),
			2100
		);
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
				onPointerDownCapture={handlePointerDown}
				ref={ref}
				id='layout'>
				<Header />
				{/* <BodyBG /> */}
				<Mouse mousePosition={mousePosition} />
				<MouseClick clicks={clicks} />
				{/* <AnimatePresence>
					{clicked ? <m.div></m.div> : null}
				</AnimatePresence> */}
				<main
					id='page-top'
					className={`z-10 flex min-h-screen [&>*:is(:first-child)]:mt-24 flex-col items-center justify-between ${playfair.className}`}>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}
