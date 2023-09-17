import {
	OPACITY_VARIANTS,
	SUBTITLE_VARIANTS,
	TITLE_VARIANTS,
} from "@/lib/constants/variants";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	AnimatePresence,
	m,
	useInView,
	useSpring,
	useMotionValue,
	useTransform,
} from "framer-motion";
import Link from "next/link";
import { Permanent_Marker } from "next/font/google";

import Balancer from "react-wrap-balancer";
import AnimatedDiv from "@/components/shared/AnimatedDiv";
import { useWindowSize } from "usehooks-ts";
import { Button } from "@mui/base";
import MUIBaseModal from "../mui/Modal";
import MailForm from "../actions/Mail";
import { useRouter } from "next/router";

const localeData = require("@/locales/hero/hero.json");
const localeFormData = require("@/locales/modals/contact.json");

const permanentMarker = Permanent_Marker({
	subsets: ["latin"],
	weight: "400",
});

export default function CTA({
	containerVisible,
	mousePosition,
}: {
	containerVisible?: boolean;
	mousePosition: { x: number; y: number };
}) {
	const { locale, locales, defaultLocale, asPath } =
		useRouter();
	const resolvedLocale = locale || "ru-RU";
	const ref = useRef(null);
	const isInView = useInView(ref);
	const [open, setOpen] = useState(false);

	const { width, height } = useWindowSize();

	const handleOpen = async () => await setOpen(true);
	const handleClose = async () => await setOpen(false);

	const mouseX = useMotionValue(mousePosition.x);
	const mouseY = useMotionValue(mousePosition.y);
	const resX = useTransform(
		mouseX,
		(latest) =>
			-((width || 1) / 2 - mousePosition.x) /
			(width || 1)
	);
	const resY = useTransform(
		mouseY,
		(latest) =>
			-((height || 1) / 2 - mousePosition.y) /
			(height || 1)
	);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const anchor = (
			(event.target as HTMLButtonElement)
				.ownerDocument || document
		).querySelector("#projects-title");

		if (anchor) {
			anchor.scrollIntoView({
				block: "center",
			});
		}
	};

	return (
		<m.div
			data-test='hero-section-cta'
			key='hero-text'
			ref={ref}
			className='peer/cta  max-w-screen z-10 flex max-h-full flex-col items-center justify-center gap-y-4 px-4 [grid-area:1/1/2/3] lg:h-[calc(100vh_-_7rem)] lg:gap-y-8 lg:py-[5%]  lg:[grid-area:1/1/2/8]'
			variants={OPACITY_VARIANTS}
			initial='hidden'
			animate={isInView ? "visible" : "hidden"}
			exit='hidden'>
			<AnimatedDiv variants={TITLE_VARIANTS}>
				<m.h1
					style={{
						translateZ: 0,
						transform: "none",
						backgroundPosition: `${
							resX.get() * 50 + 50
						}% ${resY.get() * 50 + 50}%`,
					}}
					tabIndex={0}
					className={`spicy bg-gradient-radial dark:from-secondary-400 dark:via-accent-400 dark:to-primary-400 from-primary-500 via-secondary-500 to-accent-400 relative bg-[size:200%_200%] bg-no-repeat text-[10vw] font-black tracking-widest transition-[background-position] delay-100 duration-[2s] ease-out  will-change-[background-position] lg:text-[9vw] ${permanentMarker.className}`}>
					{localeData[
						resolvedLocale
					].content.title.toUpperCase()}
				</m.h1>
			</AnimatedDiv>
			<AnimatedDiv variants={SUBTITLE_VARIANTS}>
				<m.p
					tabIndex={0}
					className='text-shadow max-w-[50ch] text-center text-lg lg:text-xl xl:text-left xl:text-2xl'>
					{
						localeData[resolvedLocale].content
							.text
					}
				</m.p>
			</AnimatedDiv>
			<div className='flex flex-col flex-wrap md:flex-row items-center gap-2 md:gap-4 lg:gap-8 xl:gap-12 w-full justify-center'>
				<Button
					onClick={handleOpen}
					className='h5 button button-primary button-rounded-lg relative'>
					{
						localeData[resolvedLocale].content
							.contact
					}
				</Button>
				<MUIBaseModal
					open={open}
					handleClose={handleClose}
					title={
						localeFormData[resolvedLocale].title
					}
					className=''>
					<MailForm handleClose={handleClose} />
				</MUIBaseModal>
				<Button
					onClick={handleClick}
					className='h5 button button-tertiary button-rounded-lg relative'>
					{
						localeData[resolvedLocale].content
							.projects
					}
				</Button>
			</div>
		</m.div>
	);
}
