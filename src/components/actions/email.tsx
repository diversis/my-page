import {
	Dialog,
	DialogTitle,
	Button,
	Typography,
	Box,
	Divider,
	FormGroup,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import {
	SubmitHandler,
	useForm,
	SubmitErrorHandler,
} from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StarIcon from "@mui/icons-material/Star";
import {
	ComponentPropsWithoutRef,
	Dispatch,
	forwardRef,
	useState,
	SetStateAction,
} from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { ControlledInputField } from "../mui/fields/controlledInputField";
import MUIBaseModal from "../mui/modal";

const endpoint = "/api/review";

interface MailFields {
	name: string;
	email: string;
	text: string;
}

interface MailModalProps
	extends ComponentPropsWithoutRef<"div"> {
	setPosted: Dispatch<SetStateAction<boolean>>;
}

const schema = z.object({
	name: z
		.string()
		.min(3, "Review must include at least 3 characters")
		.max(1200, "Review too long (1200 characters max)"),
	email: z.string().email(),
	text: z
		.string()
		.min(3, "Text must include at least 3 characters")
		.max(1200, "Text too long (1200 characters max)"),
});

async function sendFormData({
	data,
	url,
}: {
	data: MailFields;
	url: string;
}): Promise<AxiosResponse<any, any>> {
	console.info("sending data: ", data);
	return await axios({
		method: "post",
		url: url,
		data: { ...data },
	});
}

export default function MailModal({
	setPosted,
	...rest
}: MailModalProps) {
	const [open, setOpen] = useState(false);
	const { enqueueSnackbar, closeSnackbar } =
		useSnackbar();

	const handleOpen = async () => {
		await setOpen(true);
	};
	const handleClose = async () => {
		await setOpen(false);
	};

	const {
		control,
		register,
		handleSubmit,
		setError,
		reset,
		setFocus,
		getValues,
		trigger,
		setValue,
		formState: {
			isSubmitting,
			errors,
			isSubmitSuccessful,
			isDirty,
			isValid,
		},
	} = useForm<MailFields>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			text: "",
		},
	});

	const onSubmit: SubmitHandler<MailFields> = async (
		data,
		e
	) => {
		try {
			console.info("submit: ", data);
			const response = await sendFormData({
				data: { ...data },
				url: endpoint,
			});
			if (response.status) {
				console.log(
					"response.status ",
					response.status
				);
				enqueueSnackbar({
					message: "Your review was posted",
					variant: "success",
					autoHideDuration: 6000,
				});
				setPosted(true);
				handleClose();
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				enqueueSnackbar({
					message: error.response?.data?.message,
					variant: "error",
				});
			}
			console.log(error);
			const res = {
				error: error,
			};
		}
	};

	const onError: SubmitErrorHandler<MailFields> = (
		{ name,email,text },
		e
	) => {
		try {
			const errorFields = Object.entries(
				errors
			).reduce(
				(m, [field, message]) =>
					m +
					(field === "name" ? "Имя" : field) +
					", ",
				""
			);
			enqueueSnackbar({
				message: errorFields,
				variant: "error",
			});
		} catch (e) {
			console.log(errors, e);
		}
	};
	// console.log(errors);
	return (
		<>
			<Button
				variant='contained'
				onClick={handleOpen}
				className='ml-auto'>
				Post a Review
			</Button>
			<MUIBaseModal
				open={open}
				handleClose={handleClose}
				title='mail'
				className=''
				{...rest}>
				<form
					className='relative flex w-[30vw] min-w-[20rem] flex-col gap-y-4  px-6 py-4 lg:min-w-[30rem]'
					onSubmit={handleSubmit(
						onSubmit,
						onError
					)}>
					<ControlledInputField
						name='name'
						control={control}
						label='Name'
					/>
				</form>
			</MUIBaseModal>
		</>
	);
}
