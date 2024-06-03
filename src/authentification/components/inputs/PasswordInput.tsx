import {
  passwordMinLength,
  passwordMaxLength,
  passwordRegexp,
} from "../../const/userInputRequirements";
import { useFormContext } from "react-hook-form";

interface Props {
  password: string;
  placeholder: string;
}

export default function PasswordInput({ password, placeholder }: Props) {
  const { register } = useFormContext();

  return (
    <input
      type="password"
      className="h-[48px] sm:h-[32px] rounded-input-radius p-input-padding outline-none border-[1px] border-input-border-gray"
      {...register(password, {
        required: true,
        minLength: {
          value: passwordMinLength,
          message: `Password must be atleast ${passwordMinLength} characters long.`,
        },
        maxLength: {
          value: passwordMaxLength,
          message: `Password cannot be longer than ${passwordMaxLength} characters.`,
        },
        pattern: {
          value: passwordRegexp,
          message:
            "Password must contain atleast one uppercase letter, one lowercase letter and a number or a special character.",
        },
      })}
      placeholder={placeholder}
    />
  );
}
