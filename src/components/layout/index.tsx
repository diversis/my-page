import {
	ReactNode,
	useRef,
	useState,
	useEffect,
	PointerEvent,
} from "react";
import { Playfair_Display } from "next/font/google";
import { useWindowSize } from "usehooks-ts";

import Meta from "./Meta";
import Header from "./Header";
import Mouse from "./Mouse";
import MouseClick from "./Click";
import Footer from "./Footer";
import Filters from "../shared/Filters";
import { useModal } from "@/lib/hooks/use-modal";
import { usePointerPosition } from "@/lib/hooks/use-pointer-position";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Layout({
	children,
}: {
	children: ReactNode;
}) {
	const { width } = useWindowSize();

	const { show } = useModal((state) => ({
		show: state.show,
	}));

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

	const handlePointerDown = async (
		event: PointerEvent<HTMLDivElement>
	) => {
		const timeKey = Date.now();
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
					return clickState;
				}),
			2100
		);
	};

	useEffect(() => {
		document.body.className = show
			? "overflow-hidden pr-[min(0.5rem,0.5vw)]"
			: "";
	}, [show]);

	return (
		<>
			<Meta />
			<a
				href='#main'
				className='absolute top-0 z-[9000] mx-auto -translate-y-full bg-white px-4 py-2 transition-transform focus:translate-y-0'>
				Skip to content
			</a>
			<div
				onPointerDownCapture={handlePointerDown}
				ref={ref}
				id='layout'
				className='w-full overflow-x-hidden relative'>
				<Filters />
				<Header />
				{width >= 1024 ? <Mouse /> : null}
				<MouseClick />
				<div id='page-top' />
				<main
					className={`z-10 flex overflow-x-hidden min-h-screen lg:[&>*:is(:first-child)]:mt-24 flex-col items-center justify-between ${playfair.className}`}>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}
