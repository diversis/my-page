import {
	AnimatePresence,
	TapInfo,
	m,
	useAnimate,
} from "framer-motion";
import { set } from "nprogress";
import {
	SetStateAction,
	useState,
	Dispatch,
	useEffect,
	PointerEvent,
	useMemo,
} from "react";

export default function MouseClick({
	clicks,
}: {
	clicks:
		| {
				[key in keyof string]: {
					x: number;
					y: number;
				};
		  }
		| {};
}) {
	const [scope, animate] = useAnimate();
	// const [clicks, setClicks] = useState<
	// 	| {
	// 			[key in keyof string]: {
	// 				x: number;
	// 				y: number;
	// 			};
	// 	  }
	// 	| {}
	// >({});
	// const handleTap = async (
	// 	event: MouseEvent | TouchEvent | PointerEvent,
	// 	info: TapInfo
	// ) => {
	// 	const timeKey = Date.now();
	// 	await setClicks((state) => ({
	// 		...state,
	// 		[timeKey]: { event, info },
	// 	}));
	// 	setTimeout(
	// 		async () =>
	// 			setClicks((state) => {
	// 				const clickState = { ...state };
	// 				// delete clickState[timeKey];
	// 				// console.log();
	// 				return clickState;
	// 			}),
	// 		3000
	// 	);
	// };

	// const handlePointerDown = async (
	// 	event: PointerEvent<HTMLDivElement>
	// ) => {
	// 	const timeKey = Date.now();
	// 	console.log(event);
	// 	await setClicks((state) => ({
	// 		...state,
	// 		[timeKey]: {
	// 			x: event.clientX,
	// 			y: event.clientY,
	// 		},
	// 	}));
	// 	setTimeout(
	// 		async () =>
	// 			setClicks((state) => {
	// 				const clickState = { ...state };
	// 				// delete clickState[timeKey];
	// 				// console.log();
	// 				return clickState;
	// 			}),
	// 		3000
	// 	);
	// };

	// useEffect(() => {
	// 	console.log(clicks);
	// }, [clicks]);

	return (
		<>
			<m.div
				ref={scope}
				// onTap={handleTap}
				// onPointerDownCapture={handlePointerDown}
				className=' [mask-image:url(/media/2.svg)] bg-transparent fixed inset-x-0 top-0 h-screen'>
				<AnimatePresence>
					{clicks &&
						Object.entries(clicks).length > 0 &&
						Object.entries(clicks).map(
							([key, value]) => {
								if (!value) return null;
								const { x, y } = value;
								return (
									<TapAnimation
										key={key}
										value={value}
										// info={info}
									/>
								);
							}
						)}
				</AnimatePresence>
			</m.div>
		</>
	);
}

function TapAnimation({
	value,
	info,
}: {
	value: {
		x: number;
		y: number;
	};
	info?: TapInfo;
}) {
	const rotation = useMemo(() => Math.random() * 60, []);
	return (
		<m.div
			className='pointer-events-none transition-colors duration-300 [mask-image:repeating-conic-gradient(#000_0%,#000_0.5%,transparent_1%,transparent_16.66%)] rounded-[50%] fixed bg-[radial-gradient(transparent_50%,#5f33f3_50%,#ff33f3_60%,transparent_70%)] w-20 h-20'
			style={{
				x: value.x - 32,
				y: value.y - 32,
				rotate: rotation + "deg",
			}}
			animate={{
				scale: [0.1, 5, 10],
				keyTimes: [0, 0.5, 1],
				opacity: [0, 1, 0],
				// transitionEnd: {
				// 	x: mousePosition.x - 32,
				// 	y: mousePosition.y - 32,
				// },
			}}
			transition={{
				// repeatType: "loop",
				// repeat: 1,
				type: "tween",
				duration: 2,
				ease: "linear",
				repeatDelay: 2,
			}}></m.div>
	);
}
