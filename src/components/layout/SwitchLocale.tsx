import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import TranslateIcon from "@mui/icons-material/Translate";
import { useRouter } from "next/router";

export default function SwitchLocale() {
	const router = useRouter();
	const { pathname, asPath, query } = router;

	const createHandleMenuClick = (menuItem: string) => {
		return () => {
			console.log(`Clicked on ${menuItem}`);
		};
	};

	return (
		<Dropdown>
			<MenuButton className='relative icon-button icon-button-primary button-rounded-full bg-transparent px-2 py-1'>
				<TranslateIcon />
			</MenuButton>
			<Menu
				slotProps={{
					root: { className: "z-[9000]" },
					listbox: {
						className:
							"p-2 mt-1 min-w-[8rem] flex flex-col gap-2 rounded-lg bg-surface-100/50 dark:bg-surface-800/50 backdrop-blur shadow-sm shadow-accent-400/20 dark:shadow-secondary-400/20 [&>li]:link uppercase [&>li:is(:hover,:focus)]:text-secondary-300 [&>li]:transition-colors",
					},
				}}>
				<MenuItem
					onClick={() =>
						router.push(
							{ pathname, query },
							asPath,
							{ locale: "ru-RU" }
						)
					}>
					Русский
				</MenuItem>
				<MenuItem
					onClick={() =>
						router.push(
							{ pathname, query },
							asPath,
							{ locale: "en-US" }
						)
					}>
					English
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}
