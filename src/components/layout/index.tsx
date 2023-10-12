import { ReactNode, useEffect } from "react";

import { Playfair_Display } from "next/font/google";
import { useWindowSize } from "usehooks-ts";

import Header from "./Header";
import Mouse from "./Mouse";
import MouseClick from "./Click";
import Footer from "./Footer";
import Filters from "@/components/shared/Filters";
import { useModal } from "@/lib/hooks/use-modal";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Layout({
	children,
}: {
	children: ReactNode;
}) {
	const { width } = useWindowSize();

	const { show } = useModal((state) => ({
		show: state.show,
	}));

	useEffect(() => {
		document.body.className = show
			? "overflow-hidden pr-[min(0.5rem,0.5vw)]"
			: "";
	}, [show]);

	return (
		<>
			<a
				href='#main'
				className='absolute top-0 z-[9000] mx-auto -translate-y-full bg-white px-4 py-2 transition-transform focus:translate-y-0'>
				Skip to content
			</a>
			<div
				id='layout'
				className='w-full overflow-x-hidden relative'>
				<Filters />
				<Header />
				{width >= 1024 ? <Mouse /> : null}
				<MouseClick />
				<div id='page-top' />
				<main
					className={`z-10 flex overflow-x-hidden min-h-screen lg:[&>*:is(:first-child)]:mt-24 flex-col items-center justify-between ${playfair.className}`}>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}
