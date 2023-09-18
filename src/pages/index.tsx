import HeroSection from "@/components/hero";
import ProjectsDisplay from "@/components/projects";

export default function Home({ data }: { data: JSON }) {
	return (
		<>
			<>
				<div
					className={`w-full flex min-h-screen flex-col items-center justify-between p-0.5 md:p-2 gap-2 lg:gap-8`}>
					<HeroSection />

					<ProjectsDisplay />
				</div>
			</>
		</>
	);
}
