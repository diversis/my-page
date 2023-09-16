import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { Provider as RWBProvider } from "react-wrap-balancer";
import NProgress from "nprogress";
import {
	AnimatePresence,
	m,
	MotionConfig,
	LazyMotion,
	domMax,
} from "framer-motion";
import {
	CacheProvider,
	EmotionCache,
} from "@emotion/react";

import createEmotionCache from "@/components/mui/createEmotionCache";
import Layout from "@/components/layout";

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

NProgress.configure({ showSpinner: false });

export default function App({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: MyAppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const start = () => {
		setLoading(true);
		NProgress.start();
	};
	const end = () => {
		setLoading(false);
		NProgress.done();
	};

	useEffect(() => {
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
		<CacheProvider value={emotionCache}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem={true}
				themes={["light", "dark"]}>
				<LazyMotion
					features={domMax}
					strict>
					<MotionConfig reducedMotion='user'>
						<RWBProvider>
							<Layout>
								<AnimatePresence
									mode='sync'
									// initial={false}
									onExitComplete={() =>
										window.scrollTo(
											0,
											0
										)
									}>
									<m.div
										key={`wrap-${router.asPath}`}
										initial={{
											opacity: 0,

											translateX:
												"-100%",
										}}
										animate={{
											opacity: 1,

											translateX:
												"0%",
										}}
										exit={{
											opacity: 0,

											translateX:
												"100%",
											transition: {
												duration: 0.5,
											},
										}}
										transition={{
											type: "tween",
											easing: "easeOut",
											duration: 1,
										}}
										className='flex h-full w-full flex-col items-center'>
										<Component
											{...pageProps}
										/>
									</m.div>
								</AnimatePresence>
							</Layout>
						</RWBProvider>
					</MotionConfig>
				</LazyMotion>
			</ThemeProvider>
		</CacheProvider>
	);
}
