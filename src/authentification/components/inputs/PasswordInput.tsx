import {
  passwordMinLength,
  passwordMaxLength,
  passwordRegexp,
} from "../../const/userInputRequirements";
import { useFormContext } from "react-hook-form";

interface Props {
  password: string;
}

export default function PasswordInput({ password }: Props) {
  const { register } = useFormContext();

  return (
    <input
      type="password"
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
    />
  );
}
