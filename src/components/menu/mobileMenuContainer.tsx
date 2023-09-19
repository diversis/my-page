"use client";
import { Variants, m } from "framer-motion";
import {
	useRef,
	Dispatch,
	SetStateAction,
	useState,
} from "react";
import Link from "next/link";

import Social from "../shared/Social";
import ToggleTheme from "../shared/ToggleTheme";
import { MAIN_MENU } from "@/lib/nav/menu";
import SwitchLocale from "../layout/SwitchLocale";
import { SLIDE_Y_VARIANTS } from "@/lib/constants/variants";
import { useRouter } from "next/router";

export default function MobileMenuContainer({
	toggle,
}: {
	toggle: Dispatch<SetStateAction<boolean>>;
}) {
	const { locale, locales, defaultLocale, asPath } =
		useRouter();
	const resolvedLocale = locale || "ru-RU";

	const variants: Variants = {
		open: {
			transform: "translateX(0%)",
			opacity: 1,
			transition: {
				ease: [0.38, 0.65, 0.53, 0.56],
				duration: 0.4,
				when: "beforeChildren",
				staggerChildren: 0.25,
			},
		},
		closed: {
			transform: "translateX(100%)",
			opacity: 1,
			transition: {
				ease: [0.38, 0.65, 0.53, 0.56],
				duration: 0.3,
			},
		},
	};

	const variantsSlideBot: Variants = {
		open: {
			transform: "translateY(0%)",
			opacity: 1,
			transition: {
				ease: "easeOut",
				duration: 0.6,
				when: "beforeChildren",
			},
		},
		closed: {
			transform: "translateY(200%)",
			opacity: 0,
			transition: {
				ease: "easeOut",
				duration: 0.6,
				when: "afterChildren",
			},
		},
	};

	const variantsSlideTop: Variants = {
		open: {
			transform: "translateY(0%)",
			opacity: 1,
			transition: {
				ease: "easeOut",
				duration: 0.6,
				when: "beforeChildren",
			},
		},
		closed: {
			transform: "translateY(-200%)",
			opacity: 0,
			transition: {
				ease: "easeOut",
				duration: 0.6,
				when: "afterChildren",
			},
		},
	};

	return (
		<m.div
			id='nav-container'
			initial='closed'
			animate='open'
			exit='closed'
			variants={variants}
			className='absolute right-0 top-0 flex h-screen w-[50vw] min-w-[15rem] translate-x-full flex-col gap-8  overflow-hidden bg-surface-50/50 backdrop-blur-[8px] transition-colors duration-300 [transform:translateZ(0)] dark:bg-surface-900/50  '>
			<m.div className='mt-20 flex w-full flex-col items-center gap-8 place-self-start px-4'>
				<m.div
					variants={variantsSlideTop}
					className='flex items-center'>
					{MAIN_MENU.map((page) => (
						<Link
							key={`main-menu-${
								resolvedLocale === "ru-RU"
									? "На Главную"
									: "Home"
							}`}
							href={page.url || "#"}>
							{resolvedLocale === "ru-RU"
								? "На Главную"
								: "Home"}
						</Link>
					))}
				</m.div>

				<Social />
				<m.div
					variants={variantsSlideBot}
					key='switch-locale'>
					<SwitchLocale />
				</m.div>
			</m.div>

			<m.div
				id='theme-toggle '
				variants={variantsSlideBot}
				className='w-min place-self-center'>
				<ToggleTheme />
			</m.div>
		</m.div>
	);
}
