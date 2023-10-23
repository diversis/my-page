import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
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
import { SnackbarProvider, closeSnackbar } from "notistack";

import createEmotionCache from "@/components/mui/createEmotionCache";
import Layout from "@/components/layout";
import { useWindowSize } from "usehooks-ts";
import { Button } from "@mui/base";

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
	const { width } = useWindowSize();
	const router = useRouter();
	const { locale } = router;
	const resolvedLocale = locale || "ru_RU";
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
				<SnackbarProvider
					anchorOrigin={{
						horizontal: "left",
						vertical:
							width >= 1024
								? "bottom"
								: "top",
					}}
					action={(snackbarId) => (
						<Button
							onClick={() =>
								closeSnackbar(snackbarId)
							}
							className='button button-tertiary button-rounded-lg relative'>
							{resolvedLocale === "ru-RU"
								? "Закрыть"
								: "Dismiss"}
						</Button>
					)}>
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
												transition:
													{
														duration: 0.5,
													},
											}}
											transition={{
												type: "tween",
												ease: "easeOut",
												duration: 1,
											}}
											className='flex h-full w-full flex-col items-center'>
											<Component
												{...pageProps}
											/>
											<Analytics />
										</m.div>
									</AnimatePresence>
								</Layout>
							</RWBProvider>
						</MotionConfig>
					</LazyMotion>
				</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
