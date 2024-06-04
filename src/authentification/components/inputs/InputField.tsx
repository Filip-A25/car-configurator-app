import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  validation: any;
}

export default function InputField({ name, placeholder, validation }: Props) {
  const { register } = useFormContext();

  return (
    <input
      {...register(name, { ...validation })}
      className="h-[48px] sm:h-[32px] rounded-input-radius p-input-padding outline-none border border-input-border-gray"
      placeholder={placeholder}
    />
  );
}
