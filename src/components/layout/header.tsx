import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useScrollTrigger, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ToggleTheme from "../shared/toggle-theme";
import ScrollTop from "./scrollTop";
import { useIsClient } from "usehooks-ts";

export default function Header() {
	const isClient = useIsClient();
	const scrolled = useScrollTrigger({
		target: isClient ? window : undefined,
		threshold: 300,
	});
	return (
		<header>
			<m.div
				variants={OPACITY_VARIANTS}
				key='menu'
				className={`${
					scrolled
						? "bg-surface-50/60 after:opacity-100 dark:bg-surface-900/60"
						: "after:opacity-0"
				} fixed left-0 top-0 z-30 !h-24 w-screen  backdrop-blur-[8px] transition-colors duration-300 after:absolute after:inset-0  after:shadow-lg after:shadow-accent-500/50 dark:after:shadow-secondary-500/50 after:transition-opacity after:duration-500 `}>
				<div className='overflow-hidden h-full w-full flex items-center justify-center'>
					<div className='container  flex justify-between gap-2 lg:gap-4 '>
						<div className='flex gap-x-4 text-2xl text-primary-200 dark:text-primary-600 font-black [&>a]:link uppercase [&>a:is(:hover,:focus)]:text-secondary-300 [&>a]:transition-colors'>
							<Link href='/'>HOME</Link>
							<Link href='/about'>About</Link>
						</div>
						<div>
							<ToggleTheme />
						</div>
					</div>
				</div>
			</m.div>
			<ScrollTop trigger={scrolled}>
				<Fab
					size='small'
					aria-label='scroll back to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</header>
	);
}
