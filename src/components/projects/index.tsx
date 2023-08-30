import { Fragment } from "react";
import { m } from "framer-motion";

import { PROJECTS } from "@/lib/constants/projects";
import ProjectCard from "./card";

export default function ProjectsDisplay() {
	return (
		<section className='container flex flex-col items-center gap-4'>
			<h2 className='h2'>My Projects</h2>
			<m.div className='flex flex-col gap-y-4 lg:gap-y-12 bg-surface-100/25 dark:bg-surface-800/25 px-1 py-2 lg:py-4 lg:px-2 shadow-md backdrop-blur-sm shadow-primary-700 dark:shadow-primary-300 rounded-sm'>
				{PROJECTS.map((project, id) => {
					return (
						<Fragment
							key={`project-${project.name}`}>
							<ProjectCard
								project={project}
							/>
							{id < PROJECTS.length - 1 ? (
								<hr className='border-t border-surface-200 dark:border-surface-700' />
							) : null}
						</Fragment>
					);
				})}
			</m.div>
		</section>
	);
}
