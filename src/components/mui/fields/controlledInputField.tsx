import { Controller, useController } from "react-hook-form";
import { Input, InputProps } from "@mui/base/Input";
import type {
	FieldValues,
	FieldPath,
	UseControllerProps,
} from "react-hook-form";
type InputFieldProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
};

export const ControlledInputField = <
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	name,
	control,
	label,
	...rest
}: InputFieldProps<TFieldValues, TName> & InputProps) => {
	const { field } = useController({ control, name });
	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<>
					<label htmlFor={name}>{label}</label>
					<Input
						name={name}
						error={!!error}
						onChange={onChange}
						value={value}
						{...rest}
					/>
					{error ? (
						<span className='p-1 text-xs lg:text-sm text-error-600'>
							{error.message}
						</span>
					) : null}
				</>
			)}
		/>
	);
};
