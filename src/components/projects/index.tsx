import { Fragment } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

import { PROJECTS } from "@/lib/constants/projects";
import ProjectCard from "./Card";
import codeImage from "@public/media/code.png";
import { imageSizes } from "@/lib/constants/vars";

const localeData = require("@/locales/projects/projects.json");

export default function ProjectsDisplay() {
	const { locale, locales, defaultLocale, asPath } =
		useRouter();

	const resolvedLocale = locale || "ru-RU";

	return (
		<section className='relative container flex flex-col items-center gap-4 px-1 lg:px-2'>
			<div className='absolute w-screen -top-24 -left-1/8 opacity-30 -z-10 horizontal-frame-mask'>
				<Image
					placeholder='blur'
					src={codeImage}
					sizes={imageSizes}
					alt='VSCode screenshot'
					className='wave-vertical'
				/>
			</div>
			<h2
				id='projects-title'
				className='h2'>
				{localeData[resolvedLocale]?.title}
			</h2>
			<m.div className='flex flex-col gap-y-4 lg:gap-y-12 bg-surface-100/25 dark:bg-surface-800/25 px-1 py-2 lg:py-4 lg:px-2 shadow-md backdrop-blur-sm shadow-primary-700 dark:shadow-primary-300 rounded-sm'>
				{PROJECTS.map((project, id) => {
					return (
						<Fragment
							key={`project-${project.name}`}>
							<ProjectCard
								project={project}
							/>
							{id < PROJECTS.length - 1 ? (
								<hr className='divider' />
							) : null}
						</Fragment>
					);
				})}
			</m.div>
		</section>
	);
}
