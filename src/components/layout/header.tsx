import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import useScrolled from "@/lib/hooks/use-scrolled";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ToggleTheme from "../shared/toggle-theme";
import ScrollTop from "./scrollTop";

export default function Header() {
	const scrolled = useScrolled(100);
	return (
		<header>
			<m.div
				variants={OPACITY_VARIANTS}
				key='menu'
				className={`${
					scrolled
						? "bg-surface-50/60 after:opacity-100 dark:bg-surface-900/60"
						: "after:opacity-0"
				} fixed left-0 top-0 z-30 !h-24 w-screen  backdrop-blur-[8px] transition-colors duration-300 after:absolute after:inset-0  after:shadow-md after:shadow-surface-500/50 after:transition-opacity after:duration-500 `}>
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
			<ScrollTop>
				<Fab
					size='small'
					aria-label='scroll back to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</header>
	);
}
