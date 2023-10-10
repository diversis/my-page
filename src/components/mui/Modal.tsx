import { Modal, Button } from "@mui/base";
import { m } from "framer-motion";
import {
	ReactNode,
	forwardRef,
	useEffect,
	useMemo,
} from "react";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { useModal } from "@/lib/hooks/use-modal";

export type MUIBaseModalProps = {
	title: string;
	buttonText?: string;
	description?: string;
	children?: ReactNode;
	className?: string;
	handleClose: () => Promise<void>;
	open: boolean;
} & Omit<typeof Modal, "children">;

export default function MUIBaseModal({
	title,
	description,
	buttonText,
	open,
	className,
	children,
	handleClose,
	...props
}: MUIBaseModalProps) {
	const { show, addModal, removeModal } = useModal(
		(state) => ({
			show: state.show,
			addModal: state.addModal,
			removeModal: state.removeModal,
		})
	);

	useEffect(() => {
		if (open) addModal({ key: title });
		else removeModal({ key: title });
	}, [open]);

	return (
		<div>
			<Modal
				aria-labelledby={`modal-${title}-title`}
				aria-describedby={`modal-${title}-description`}
				open={open}
				onClose={handleClose}
				slots={{ backdrop: Backdrop }}
				closeAfterTransition
				disableScrollLock
				{...props}
				className='fixed z-[1300] inset-0 flex items-center justify-center'>
				<Fade in={open}>
					<Box
						component={m.div}
						className={`relative flex flex-col gap-2 lg:gap-4 max-w-[95vw] w-[30rem] px-6 py-4 rounded bg-surface-100/80 dark:bg-surface-800/80 ${
							className || ""
						}`}>
						<Button
							onClick={handleClose}
							className='button button-primary button-rounded-full absolute rounded-[50%] w-8 h-8 shadow-inner shadow-surface-50 flex items-center bg-tertiary-800 dark:bg-tertiary-500 -top-2 -right-2 group/close active:scale-90 transition-transform'>
							<CloseIcon
								sx={{
									width: "32px",
									height: "32px",
								}}
								className=' text-accent-300 dark:text-accent-400'
							/>
						</Button>
						<m.h2
							className='h2'
							id={`modal-${title}-title`}>
							{title}
						</m.h2>
						<m.hr className='divider' />
						{description ? (
							<>
								<m.p
									id={`modal-${title}-description`}>
									{description}
								</m.p>
								<m.hr className='divider' />
							</>
						) : null}
						{children}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

const Backdrop = forwardRef<
	HTMLDivElement,
	{ open?: boolean; className: string; ownerState: any }
>((props, ref) => {
	const { open, className, ownerState, ...other } = props;
	return (
		<Fade in={open}>
			<div
				className='-z-[1] backdrop-blur fixed inset-0 bg-surface-900/50 [-webkit-tap-highlight-color: transparent]'
				ref={ref}
				{...other}
			/>
		</Fade>
	);
});

Backdrop.displayName = "Backdrop";
