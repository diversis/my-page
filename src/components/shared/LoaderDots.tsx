"use client";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import { HTMLMotionProps, m } from "framer-motion";

interface LoaderDotsProps extends HTMLMotionProps<"div"> {
	className?: string;
}

export default function LoaderDots({
	className,
	...rest
}: LoaderDotsProps) {
	return (
		<>
			<m.span
				initial='hidden'
				animate='visible'
				exit='exit'
				variants={OPACITY_VARIANTS}
				className={`pointer-events-none flex aspect-[6/1] w-full flex-row gap-1 ${className}`}
				{...rest}>
				{[1, 2, 3, 4, 5].map((i, id) => (
					<span
						key={`loader-${i}`}
						style={{
							animation: `1s scale-pulse-full ${
								id / 10
							}s infinite cubic-bezier(0.650, -0.600, 0.585, 1.540)`,
						}}
						className={`pointer-events-none aspect-square h-full rounded-[50%] ${
							"bg-secondary-" + i + "00"
						}`}></span>
				))}
			</m.span>
		</>
	);
}
