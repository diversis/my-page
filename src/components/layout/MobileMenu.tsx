import { AnimatePresence, m } from "framer-motion";
import { forwardRef, useRef, useState } from "react";

import { MenuToggle } from "../menu/menuToggle";
import { useOnClickOutside } from "usehooks-ts";
import MobileMenuContainer from "../menu/mobileMenuContainer";
import { SwipeableDrawer } from "@mui/material";

export default function MobileMenu() {
	const [menuOpen, setMenuOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	// useOnClickOutside(ref, async () => {
	// 	if (menuOpen) {
	// 		return await setMenuOpen(false);
	// 	}
	// });

	return (
		<m.div className='absolute right-0 top-0 h-screen w-0'>
			<SwipeableDrawer
				disableSwipeToOpen
				// PaperProps={{ component: MainMenuWrap }}
				ref={ref}
				classes={{
					paper: "overflow-hidden h-screen w-screen xs:w-[50vw] md:min-w-[15rem] !bg-surface-50/50 backdrop-blur-[8px] transition-colors duration-300 dark:!bg-surface-900/50 ",
				}}
				anchor='right'
				open={menuOpen}
				onClose={() => {
					setMenuOpen(false);
				}}
				onOpen={() => {
					setMenuOpen(true);
				}}
				variant='temporary'>
				<MobileMenuContainer
					toggle={setMenuOpen}
					open={menuOpen}
				/>
			</SwipeableDrawer>

			{/* <AnimatePresence>
				{menuOpen ? (
					<MobileMenuContainer
						toggle={setMenuOpen}
					/>
				) : null}
			</AnimatePresence> */}
			<MenuToggle
				toggle={setMenuOpen}
				menuOpen={menuOpen}
			/>
		</m.div>
	);
}
