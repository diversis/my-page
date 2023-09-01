import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import { AnimatePresence, m } from "framer-motion";

export default function ScrollTop({
	children,
	trigger,
}: {
	children: React.ReactElement;
	trigger: boolean;
}) {
	const handleClick = (
		event: React.MouseEvent<HTMLDivElement>
	) => {
		const anchor = (
			(event.target as HTMLDivElement)
				.ownerDocument || document
		).querySelector("#page-top");

		if (anchor) {
			anchor.scrollIntoView({
				block: "end",
			});
		}
	};
	// const MBox = m(Box);
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
