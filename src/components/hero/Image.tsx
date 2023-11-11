import { m, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import { OPACITY_VARIANTS } from "@/lib/constants/variants";

import heroImage from "@public/media/hero.png";
import { imageSizes } from "@/lib/constants/vars";



export default function Hero({
	mousePosition,
}: {
	mousePosition: { x: number; y: number };
	// mouseX: number;
	// mouseY: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref);
	return (
		<m.div
			data-test='hero-section-image'
			key='hero-image'
			ref={ref}
			className='relative flex  max-h-full w-full max-w-[80%] md:max-w-[60%] items-center justify-center place-self-center [grid-area:2/1/3/2] lg:max-w-full lg:[grid-area:1/8/3/13]'
			variants={OPACITY_VARIANTS}
			initial='hidden'
			animate={isInView ? "visible" : "hidden"}
			exit='hidden'>
			<div className='relative isolate flex aspect-square  max-h-full w-full'>
				{/* <div className="radial-mask absolute -bottom-[10%] -left-[10%] -right-[10%] -top-[10%] isolate -z-[1] bg-black bg-gradient-to-t from-tertiary-200 to-primary-100"></div> */}
				<div className='relative isolate z-10 aspect-[640/951] h-auto w-full'>
					<Image
						placeholder='blur'
						fill
						sizes={imageSizes}
						src={heroImage}
						alt='Site Hero'
						className='absolute inset-0 aspect-[640/951] h-auto w-full object-contain [filter:url(#hero-noise)]'
						priority
					/>
					<svg>
						<defs>
							<filter
								id='noise-lightning'
								x='-20%'
								y='-20%'
								width='140%'
								height='140%'
								filterUnits='objectBoundingBox'
								primitiveUnits='userSpaceOnUse'
								colorInterpolationFilters='linearRGB'></filter>
						</defs>
					</svg>
				</div>
			</div>
		</m.div>
	);
}
