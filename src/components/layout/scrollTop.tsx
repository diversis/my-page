"use client";
import { AnimatePresence, m } from "framer-motion";
import useScrolled from "@/lib/hooks/use-scrolled";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";

export default function ScrollTop({
	children,
}: {
	children: React.ReactElement;
}) {
	// const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrolled(100);

	const handleClick = (
		event: React.MouseEvent<HTMLDivElement>
	) => {
		const anchor = (
			(event.target as HTMLDivElement)
				.ownerDocument || document
		).querySelector("#page-top");

		if (anchor) {
			anchor.scrollIntoView({
				block: "start",
			});
		}
	};
	return (
		<AnimatePresence>
			{trigger && (
				<m.div
					initial='hidden'
					animate='visible'
					exit='exit'
					variants={OPACITY_VARIANTS}
					onClick={handleClick}
					role='presentation'
					className='fixed bottom-16 right-4 z-[1000] lg:bottom-4'>
					{children}
				</m.div>
			)}
		</AnimatePresence>
	);
}
