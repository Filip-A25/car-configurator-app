import { InputHTMLAttributes } from "react";
import { RegisterOptions, useFormContext, FieldValues } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  validation?: RegisterOptions<FieldValues>;
}

export default function InputField({ name, validation, ...props }: Props) {
  const { register } = useFormContext();

  return (
    <input
      {...register(name, { ...validation })}
      className="h-[48px] sm:h-[32px] lg:h-[44px] 3xl:h-[52px] 3xl:text-lg border input-padding outline-none rounded-[3px] border-input-border-gray form-input-margin"
      {...props}
    />
  );
}
