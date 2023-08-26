import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import useScrolled from "@/lib/hooks/use-scrolled";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";

export default function Header() {
	const scrolled = useScrolled(100);
	return (
		<header>
			{" "}
			<m.div
				variants={OPACITY_VARIANTS}
				key='menu'
				className={`${
					scrolled
						? "bg-surface-50/60 after:opacity-100 dark:bg-surface-900/60"
						: "after:opacity-0"
				} fixed left-0 top-0 z-30 flex !h-24  w-screen items-center backdrop-blur-[8px] transition-colors duration-300 after:absolute after:inset-0  after:shadow-md after:shadow-surface-500/50 after:transition-opacity after:duration-500 `}>
				<div className='container'>
					<Link href='/'>HOME</Link>
					<Link href='/about'>About</Link>
				</div>
			</m.div>
		</header>
	);
}
