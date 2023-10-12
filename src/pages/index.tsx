import Head from "next/head";
import { useRouter } from "next/router";

import HeroSection from "@/components/hero";
import Meta from "@/components/layout/Meta";
import ProjectsDisplay from "@/components/projects";

const localeData = require("@/locales/home/index.json");

export default function Home({ data }: { data: JSON }) {
	const { locale } = useRouter();
	const resolvedLocale = locale || "ru-RU";
	const resolvedDescription =
		localeData[resolvedLocale]?.description ||
		"description";

	const resolvedTitle =
		localeData[resolvedLocale]?.title || "title";
	return (
		<>
			<Meta
				description={resolvedDescription}
				title={resolvedTitle}
			/>

			<div
				className={`w-full flex min-h-screen flex-col items-center justify-between px-0 py-4 lg:py-8 gap-2 lg:gap-8`}>
				<HeroSection />

				<ProjectsDisplay />
			</div>
		</>
	);
}
