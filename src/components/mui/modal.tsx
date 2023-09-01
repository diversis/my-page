import { Modal, Button } from "@mui/base";
import { AnimatePresence, m } from "framer-motion";
import {
	ForwardedRef,
	ReactNode,
	forwardRef,
	useState,
} from "react";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

export type MUIBaseModalProps = {
	title: string;
	buttonText?: string;
	description?: string;
	children: ReactNode;
	className: string;
} & typeof Modal;

export default function MUIBaseModal({
	title,
	description,
	buttonText,
	children,
	className,
	...props
}: MUIBaseModalProps) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button
				type='button'
				onClick={handleOpen}
				className={className}>
				{buttonText || title}
			</Button>
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
				<MotionWrapper in={open}>
					<Box
						component={m.div}
						className='relative flex flex-col gap-2 lg:gap-4 max-w-[95vw] w-[30rem] px-6 py-4 rounded bg-surface-100/80 dark:bg-surface-800/80'>
						<Button
							onClick={handleClose}
							className='absolute rounded-[50%] w-8 h-8 flex items-center bg-tertiary-800 dark:bg-tertiary-500 top-2 right-2 group/close active:scale-90 transition-transform'>
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
				</MotionWrapper>
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
		<MotionWrapper in={open}>
			<div
				className='-z-[1] backdrop-blur fixed inset-0 bg-surface-900/50 [-webkit-tap-highlight-color: transparent]'
				ref={ref}
				{...other}
			/>
		</MotionWrapper>
	);
});

Backdrop.displayName = "Backdrop";

interface WrapperProps {
	children: React.ReactElement;
	in?: boolean;
	onClick?: any;
	onEnter?: (
		node: HTMLElement,
		isAppearing: boolean
	) => void;
	onExited?: (
		node: HTMLElement,
		isAppearing: boolean
	) => void;
}

const MotionWrapper = forwardRef(
	(
		{
			in: open,
			onEnter,
			onExited,
			children,
			...rest
		}: WrapperProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const handleAnimationStart = () => {
			if (open && onEnter) {
				onEnter(null as any, true);
			}
		};

		const handleAnimationComplete = () => {
			if (!open && onExited) {
				onExited(null as any, true);
			}
		};

		return (
			<m.div
				ref={ref}
				initial={{ translateY: "100%" }}
				exit={{ translateY: "100%" }}
				animate={{ translateY: "0%" }}
				onAnimationStart={handleAnimationStart}
				onAnimationComplete={
					handleAnimationComplete
				}
				{...rest}>
				{children}
			</m.div>
		);
	}
);

MotionWrapper.displayName = "MotionWrapper";
