import {
	ComponentPropsWithoutRef,
	Dispatch,
	useState,
	SetStateAction,
} from "react";
import { AnimatePresence, m } from "framer-motion";
import { useSnackbar } from "notistack";
import {
	SubmitHandler,
	useForm,
	SubmitErrorHandler,
} from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ControlledInputField } from "../mui/fields/controlledInputField";
import { STAGGER_VARIANTS } from "@/lib/constants/variants";
import AnimatedDiv from "../shared/animatedDiv";

const endpoint = "/api/review";

interface MailFields {
	name: string;
	email: string;
	text: string;
}

interface MailModalProps
	extends ComponentPropsWithoutRef<"div"> {
	handleClose: () => Promise<void>;
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

export default function MailForm({
	handleClose,
	...rest
}: MailModalProps) {
	const { enqueueSnackbar, closeSnackbar } =
		useSnackbar();

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
		{ name, email, text },
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
		<m.form
			variants={STAGGER_VARIANTS}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className='relative w-full flex min-w-[20rem] flex-col gap-y-4  '
			onSubmit={handleSubmit(onSubmit, onError)}>
			<AnimatedDiv
				direction='left'
				className='flex flex-row gap-4 flex-wrap items-center w-full'>
				<label
					htmlFor='name'
					className='w-[6ch]'>
					Name
				</label>
				<hr className='divider-v h-5' />
				<span className='flex-grow'>
					<ControlledInputField
						name='name'
						control={control}
						label='Name'
						className='flex-grow w-full'
					/>
				</span>
			</AnimatedDiv>
			<AnimatedDiv
				direction='right'
				className='flex flex-row gap-4 flex-wrap items-center'>
				<label
					htmlFor='email'
					className='w-[6ch]'>
					Email
				</label>
				<hr className='divider-v h-5' />
				<span className='flex-grow'>
					<ControlledInputField
						name='email'
						control={control}
						label='Email'
						className='flex-grow w-full'
					/>
				</span>
			</AnimatedDiv>
			<AnimatedDiv
				direction='bottom'
				className='flex flex-row gap-4 flex-wrap items-center'>
				<label
					htmlFor='text'
					className='w-[6ch]'>
					Text
				</label>
				<hr className='divider-v h-5' />
				<span className='flex-grow'>
					<ControlledInputField
						name='text'
						control={control}
						label='text'
						className='flex-grow  w-full'
						multiline={true}
					/>
				</span>
			</AnimatedDiv>
		</m.form>
	);
}
