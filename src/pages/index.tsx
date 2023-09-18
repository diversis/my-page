import HeroSection from "@/components/hero";
import ProjectsDisplay from "@/components/projects";
import Head from "next/head";

export default function Home({ data }: { data: JSON }) {
	return (
		<>
			<>
				<Head>
					<title>Diversis</title>
					<meta
						name='description'
						content="diversis' personal page with web developer portfolio"
						key='description'
					/>
				</Head>
				<div
					className={`w-full flex min-h-screen flex-col items-center justify-between px-0 py-4 lg:py-8 gap-2 lg:gap-8`}>
					<HeroSection />

					<ProjectsDisplay />
				</div>
			</>
		</>
	);
}
