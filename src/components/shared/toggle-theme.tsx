import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Switch } from "@mui/base/Switch";
import {
	useSwitch,
	UseSwitchParameters,
} from "@mui/base/useSwitch";
import { AnimatePresence, m } from "framer-motion";
import { THEME_TOGGLE_VARIANTS } from "@/lib/constants/variants";

export default function ToggleTheme() {
	const { systemTheme, theme, setTheme, resolvedTheme } =
		useTheme();
	const [checked, setChecked] = useState(false);
	const [mounted, setMounted] = useState(false);

	const label = {
		slotProps: {
			input: { "aria-label": "Demo switch" },
		},
	};

	useEffect(() => {
		setMounted(true);
	}, []);
	useIsomorphicLayoutEffect(() => {
		setChecked(resolvedTheme === "light");
		// if (
		//     resolvedTheme === "light" ||
		//     resolvedTheme === "dark"
		// ) {
		//     createTheme({
		//         palette: {
		//             mode: resolvedTheme,
		//         },
		//     });
		// }
	}, [resolvedTheme]);

	if (!mounted) return null;

	return (
		<div className='flex flex-row items-center gap-0'>
			<MUISwitch
				checked={resolvedTheme === "light"}
				onChange={async () =>
					await setTheme(
						theme === "dark" ? "light" : "dark"
					)
				}
			/>
		</div>
	);
}

function MUISwitch(props: UseSwitchParameters) {
	const {
		getInputProps,
		checked,
		disabled,
		focusVisible,
	} = useSwitch(props);

	const stateClasses = {
		checked,
		disabled,
		focusVisible,
	};

	return (
		<span className='inline-flex relative w-8 h-8 justify-center items-center'>
			<span
				className={`absolute inset-x-0 top-0 aspect-square block`}>
				<span className='absolute inset-0'>
					<AnimatePresence mode='sync'>
						{checked ? (
							<m.span
								initial='hidden'
								animate='visible'
								exit='exit'
								variants={
									THEME_TOGGLE_VARIANTS
								}
								key='sun-icon'
								className={`absolute -inset-x-full top-0 aspect-square flex justify-center `}>
								<span className='absolute inset-x-auto top-0 before:animate-pulse before:absolute before:duration-500 before:w-16 before:h-16 before:from-accent-400/50 before:transition-opacity before:-top-5 before:-left-8 before:bg-gradient-radial before:via-transparent before:to-transparent before:rounded-[50%]'></span>
								<LightModeIcon
									width={16}
									height={16}
									className='text-accent-500 relative transition-colors duration-500 '
								/>
							</m.span>
						) : (
							<m.span
								initial='hidden'
								animate='visible'
								exit='exit'
								variants={
									THEME_TOGGLE_VARIANTS
								}
								key='moon-icon'
								className={`absolute  -inset-x-full top-0 aspect-square flex justify-center `}>
								<span className='absolute inset-x-auto top-0 before:animate-pulse before:absolute before:duration-500 before:w-16 before:h-16 before:from-secondary-400/50 before:transition-opacity before:-top-5 before:-left-8 before:bg-gradient-radial before:via-transparent before:to-transparent before:rounded-[50%]'></span>
								<DarkModeIcon
									width={16}
									height={16}
									className='transition-colors  duration-500 text-secondary-500'
								/>
							</m.span>
						)}
					</AnimatePresence>
				</span>
			</span>
			<input
				{...getInputProps()}
				aria-label={`Switch to ${
					checked ? "light" : "dark"
				} theme`}
				className='peer absolute inset-0 -top-1 w-full h-full opacity-0 z-0 m-0 cursor-pointer'
			/>
			<span className='absolute  inset-x-0 -top-1 bottom-1 rounded-[50%] pointer-events-none peer-focus-visible:outline-double peer-focus-visible:outline-1 peer-focus-visible:border peer-focus-visible:outline-black border-white'></span>
		</span>
	);
}
