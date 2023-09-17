import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Tooltip from "@mui/material/Tooltip";

import { Project } from "@/lib/constants/projects";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";

const localeData = require("@/locales/projects/card.json");

export default function ProjectCard({
	project,
}: {
	project: Project;
}) {
	const { locale, locales, defaultLocale, asPath } =
		useRouter();
	const resolvedLocale = locale || "ru-RU";
	const ref = useRef(null);
	const isInView = useInView(ref);
	const Hosting = project.hosting.Icon;
	const TypeIcon = project.typeIcon;
	return (
		<m.div
			ref={ref}
			variants={OPACITY_VARIANTS}
			initial='hidden'
			animate={isInView ? "visible" : "hidden"}
			exit='hidden'
			className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
			<div className='flex flex-col gap-2 lg:gap-4'>
				<span className='flex flex-col gap-2'>
					<h3 className='h3'>{project.name}</h3>
					<p className='h5'>{project.type}</p>
				</span>
				<Image
					alt={project.name}
					src={`/media/projects/${project.image}`}
					width={500}
					height={500}
					className='h-auto rounded'
				/>
			</div>
			<div className='grid grid-cols-[auto_1fr] h-min gap-2 place-items-center justify-items-start'>
				<h5 className='h5 w-full text-left bg-surface-100/50 dark:bg-surface-800/50 p-2 rounded transition-colors'>
					{localeData[resolvedLocale]?.stack}:
				</h5>
				<div className='flex gap-2 items-center bg-surface-50/80 transition-colors flex-wrap p-2 rounded'>
					{project.tech.map(({ name, Icon }) => {
						// const Icon = icon;
						return (
							<div
								key={`tech-${name}`}
								className='inline-flex icon-button icon-button-primary relative button-rounded-full'>
								<Tooltip
									// disableFocusListener
									title={name}>
									<button>
										<Icon
											alt={name}
											width={32}
											height={32}
										/>
									</button>
								</Tooltip>
							</div>
						);
					})}
				</div>
				<h5 className='h5 w-full text-left bg-surface-100/50 dark:bg-surface-800/50 p-2 rounded transition-colors'>
					{localeData[resolvedLocale]?.web}:
				</h5>
				<div className='flex gap-2 items-center bg-surface-50/80 transition-colors  p-2 rounded'>
					<a
						href={project.webLink}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-1 icon-button icon-button-primary relative button-rounded-full'>
						<Hosting
							width={32}
							height={32}
						/>
						<ArrowOutwardIcon
							width={16}
							height={16}
							className='self-start !text-black'
						/>
					</a>
				</div>
				<h5 className='h5 w-full text-left bg-surface-100/50 dark:bg-surface-800/50 p-2 rounded transition-colors'>
					{localeData[resolvedLocale]?.github}:
				</h5>
				<div className='flex gap-2 items-center bg-surface-50/80 transition-colors  p-2 rounded'>
					<a
						href={project.gitHub}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-1 icon-button icon-button-primary relative button-rounded-full'>
						<GitHubIcon
							width={32}
							height={32}
							className='!text-black !w-8 !h-8'
						/>
						<ArrowOutwardIcon
							width={16}
							height={16}
							className='self-start !text-black'
						/>
					</a>
				</div>
			</div>
		</m.div>
	);
}
