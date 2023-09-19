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

import { ControlledInputField } from "@/components/mui/fields/ControlledInputField";
import { STAGGER_VARIANTS } from "@/lib/constants/variants";
import AnimatedDiv from "../shared/AnimatedDiv";
import { Button } from "@mui/base";
import { useRouter } from "next/router";
import LoaderDots from "../shared/LoaderDots";

const endpoint = "/api/sendmail";

const localeFormData = require("@/locales/modals/contact.json");
const localeModalData = require("@/locales/modals/buttons.json");
interface MailFields {
	name: string;
	email: string;
	message: string;
}

interface MailModalProps
	extends ComponentPropsWithoutRef<"div"> {
	handleClose: () => Promise<void>;
}

async function sendFormData({
	data,
	url,
}: {
	data: MailFields;
	url: string;
}): Promise<AxiosResponse<any, any>> {
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
	const { locale, locales, defaultLocale, asPath } =
		useRouter();
	const resolvedLocale = locale || "ru-RU";
	const schema = z.object({
		name: z
			.string()
			.min(
				3,
				localeFormData[resolvedLocale].form.name
					.error.min
			)
			.max(
				50,
				localeFormData[resolvedLocale].form.name
					.error.max
			),
		email: z
			.string()
			.email(
				localeFormData[resolvedLocale].form.email
					.error
			),
		message: z
			.string()
			.min(
				3,
				localeFormData[resolvedLocale].form.message
					.error.min
			)
			.max(
				1200,
				localeFormData[resolvedLocale].form.message
					.error.max
			),
	});

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
			message: "",
		},
	});

	const onSubmit: SubmitHandler<MailFields> = async (
		data,
		e
	) => {
		try {
			const response = await sendFormData({
				data: { ...data },
				url: endpoint,
			});
			if (response.status) {
				enqueueSnackbar({
					message:
						localeFormData[resolvedLocale].form
							.toast.success,
					variant: "success",
					autoHideDuration: 6000,
				});
				handleClose();
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				enqueueSnackbar({
					message:
						error.response?.data?.message ||
						"Something went wrong",
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
		{ name, email, message: text },
		e
	) => {
		try {
			const errorFields = Object.entries(
				errors
			).reduce(
				(m, [field, message]) => m + field + ", ",
				""
			);
			enqueueSnackbar({
				message:
					`${localeFormData[resolvedLocale].errors} : ${errorFields}` ||
					"Something went wrong",
				variant: "error",
			});
		} catch (e) {
			console.log(errors, e);
		}
	};

	return (
		<m.form
			variants={STAGGER_VARIANTS}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className='relative w-full flex min-w-[20rem] flex-col gap-4  '
			onSubmit={handleSubmit(onSubmit, onError)}>
			<div className='relative w-full grid gap-4  '>
				<AnimatedDiv
					classNameWrapper='[grid-area:1/1/2/2]'
					direction='left'
					className='flex flex-row gap-4 flex-wrap items-center w-full '>
					<label
						htmlFor='name'
						className='w-[11ch]'>
						{
							localeFormData[resolvedLocale]
								?.form?.name.label
						}
					</label>
				</AnimatedDiv>
				<AnimatedDiv
					classNameWrapper='[grid-area:2/1/3/2]'
					direction='right'
					className='flex flex-row gap-4 flex-wrap items-center '>
					<label
						htmlFor='email'
						className='w-[11ch]'>
						{
							localeFormData[resolvedLocale]
								?.form?.email.label
						}
					</label>
				</AnimatedDiv>
				<AnimatedDiv
					classNameWrapper='[grid-area:3/1/4/2]'
					direction='bottom'
					className='flex flex-row gap-4 flex-wrap items-center'>
					<label
						htmlFor='text'
						className='w-[11ch]'>
						{
							localeFormData[resolvedLocale]
								?.form?.message.label
						}
					</label>
				</AnimatedDiv>

				<AnimatedDiv
					classNameWrapper='[grid-area:1/2/2/3]'
					direction='left'
					className='flex flex-row gap-4 flex-wrap items-center w-full '>
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
					classNameWrapper='[grid-area:2/2/3/3]'
					direction='right'
					className='flex flex-row gap-4 flex-wrap items-center'>
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
					classNameWrapper='[grid-area:3/2/4/3]'
					direction='bottom'
					className='flex flex-row gap-4 flex-wrap items-center'>
					<span className='flex-grow'>
						<ControlledInputField
							name='message'
							control={control}
							label='Message'
							className='flex-grow  w-full'
							multiline={true}
						/>
					</span>
				</AnimatedDiv>
			</div>
			<AnimatedDiv
				overflowHidden={false}
				direction='bottom'
				className='mt-2 lg:mt-4 flex flex-row flex-wrap mr-0 ml-auto w-fit gap-4 lg:gap-8'>
				<AnimatedDiv
					overflowHidden={false}
					direction='bottom'>
					<Button
						onClick={handleClose}
						className='button button-tertiary button-rounded-lg relative'>
						{
							localeModalData[resolvedLocale]
								?.cancel
						}
					</Button>
				</AnimatedDiv>

				<AnimatedDiv
					overflowHidden={false}
					direction='bottom'>
					<Button
						disabled={isSubmitting}
						type='submit'
						className='button button-primary button-rounded-lg relative flex items-center'>
						{isSubmitting ? (
							<LoaderDots className='absolute inset-x-0' />
						) : null}

						<span
							className={`${
								isSubmitting
									? "opacity-0 pointer-events-none"
									: ""
							}`}>
							{
								localeModalData[
									resolvedLocale
								]?.submit
							}
						</span>
					</Button>
				</AnimatedDiv>
			</AnimatedDiv>
		</m.form>
	);
}
