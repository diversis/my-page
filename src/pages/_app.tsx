import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import NProgress from "nprogress";
import {
	AnimatePresence,
	m,
	MotionConfig,
	LazyMotion,
	domMax,
} from "framer-motion";
import Layout from "@/components/layout";
NProgress.configure({ showSpinner: false });

export default function App({
	Component,
	pageProps,
}: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const start = () => {
		setLoading(true);
		NProgress.start();
		// console.log(`\n----------\n Loading: START ${loading} \n----------\n`);
	};
	const end = () => {
		setLoading(false);
		NProgress.done();
		// console.log(`\n----------\n Loading: END ${loading} \n----------\n`);
	};
	// useEffect(() => {
	//     console.log(`\n----------\n Loading: ${loading} \n----------\n`);
	// }, [loading]);

	useEffect(() => {
		// Used for page transition

		router.events.on("routeChangeStart", start);
		router.events.on("routeChangeComplete", end);
		router.events.on("routeChangeError", end);
		return () => {
			router.events.off("routeChangeStart", start);
			router.events.off("routeChangeComplete", end);
			router.events.off("routeChangeError", end);
		};
	}, [router.events]);

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem={true}
			themes={["light", "dark"]}>
			<LazyMotion
				features={domMax}
				strict>
				<MotionConfig reducedMotion='user'>
					<Layout>
						<AnimatePresence
							mode='sync'
							// initial={false}
							onExitComplete={() =>
								window.scrollTo(0, 0)
							}>
							{!loading ? (
								<m.div
									key='main-wrap'
									initial={{
										opacity: 0,
										translateX: "-100%",
									}}
									animate={{
										opacity: 1,
										translateX: "0%",
									}}
									exit={{
										opacity: 0,
										translateX: "100%",
										transition: {
											duration: 0.5,
										},
									}}
									transition={{
										duration: 0.5,
									}}
									className='flex h-full w-full flex-col items-center'>
									<Component
										{...pageProps}
									/>
								</m.div>
							) : null}
						</AnimatePresence>
					</Layout>
				</MotionConfig>
			</LazyMotion>
		</ThemeProvider>
	);
}
