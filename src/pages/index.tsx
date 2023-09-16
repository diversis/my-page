import Image from "next/image";

import AboutSection from "@/components/about";
import HeroSection from "@/components/hero";
import ProjectsDisplay from "@/components/projects";
import Link from "next/link";
import { GetServerSideProps } from "next";

export default function Home({ data }: { data: JSON }) {

	return (
		<>
			<>
				<div
					className={`container flex min-h-screen flex-col items-center justify-between p-2 gap-2 lg:gap-8`}>
					<HeroSection />

					<ProjectsDisplay />
				</div>
			</>
		</>
	);
}
