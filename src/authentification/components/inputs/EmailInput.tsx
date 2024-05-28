import { emailRegexp } from "../../const/userInputRequirements";
import { useFormContext } from "react-hook-form";

interface Props {
  email: string;
}

export default function EmailInput({ email }: Props) {
  const { register } = useFormContext();
  return (
    <input
      type="email"
      {...register(email, {
        required: true,
      })}
      placeholder="Enter your e-mail..."
    />
  );
}
