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
} from "react";

export default function MouseClick() {
	const [scope, animate] = useAnimate();
	const [clicks, setClicks] = useState<
		| {
				[key in keyof string]: {
					event:
						| MouseEvent
						| TouchEvent
						| PointerEvent;
					info: TapInfo;
				};
		  }
		| {}
	>({});
	const handleTap = async (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: TapInfo
	) => {
		const timeKey = Date.now();
		await setClicks((state) => ({
			...state,
			[timeKey]: { event, info },
		}));
		setTimeout(
			async () =>
				setClicks((state) => {
					const clickState = { ...state };
					// delete clickState[timeKey];
					// console.log();
					return clickState;
				}),
			3000
		);
	};

	// useEffect(() => {
	// 	console.log(clicks);
	// }, [clicks]);

	return (
		<>
			<m.div
				ref={scope}
				onTap={handleTap}
				className=' [mask-image:url(/media/2.svg)] bg-transparent fixed inset-x-0 top-0 h-screen'>
				<AnimatePresence>
					{clicks &&
						Object.entries(clicks).length > 0 &&
						Object.entries(clicks).map(
							([key, value]) => {
								if (!value) return null;
								const { event, info } =
									value;
								return (
									<TapAnimation
										key={key}
										event={event}
										info={info}
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
	event,
	info,
}: {
	event: MouseEvent | TouchEvent | PointerEvent;
	info: TapInfo;
}) {
	return (
		<m.div
			className='pointer-events-none [mask-image:radial-gradient(transparent_50%,black_60%,transparent)] rounded-[50%] fixed bg-[repeating-conic-gradient(transparent_0%,transparent_15%,#ff33f3_15.5%,#ff3333_16%,transparent_16.66%)] w-20 h-20'
			style={{
				x: info.point.x - 32,
				y: info.point.y - 32,
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
