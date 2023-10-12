"use client";
import { m, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import DiscordIcon from "@public/media/icons/discord.svg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import {
	SLIDE_Y_VARIANTS,
	STAGGER_VARIANTS,
} from "@/lib/constants/variants";

interface LinkItem {
	name: string;
	url: string;
	icon: ReactNode;
}

const socialLinks: LinkItem[] = [
	{
		name: "GitHub",
		url: "https://github.com/diversis",
		icon: (
			<GitHubIcon
				sx={{ transition: "all 500ms ease-out" }}
			/>
		),
	},
	{
		name: "Telegram",
		url: "https://t.me/Noxyangel",
		icon: (
			<TelegramIcon
				sx={{ transition: "all 500ms ease-out" }}
			/>
		),
	},
	{
		name: "Discord",
		url: "https://discordapp.com/users/212440343419813888",
		icon: (
			<DiscordIcon className='w-6 h-6 ease-out transition-all duration-500' />
		),
	},
	{
		name: "WhatsApp",
		url: "https://wa.me/+79151437060",
		icon: (
			<WhatsAppIcon
				sx={{ transition: "all 500ms ease-out" }}
			/>
		),
	},
];

export default function Social() {
	const ref = useRef(null);
	const isInView = useInView(ref);
	return (
		<m.div
			ref={ref}
			initial='hidden'
			variants={STAGGER_VARIANTS}
			animate={isInView ? "visible" : "exit"}
			exit='exit'
			className='flex flex-col lg:flex-row items-center gap-4 xl:items-start xl:gap-6'>
			{socialLinks.length > 0 &&
				socialLinks.map((item) => {
					return (
						<m.div
							variants={SLIDE_Y_VARIANTS}
							key={item.name}>
							<a
								href={item.url}
								aria-label={`contact me on ${item.name}`}
								title={`contact me on ${item.name}`}
								className='relative icon-button icon-button-primary button-rounded-full group/a [&:is(:hover,:focus-visible,:focus)>svg]:scale-150 [&>svg]:scale-100 '
								target='_blank'
								rel='noopener noreferrer'>
								{item.icon}
							</a>
						</m.div>
					);
				})}
		</m.div>
	);
}
