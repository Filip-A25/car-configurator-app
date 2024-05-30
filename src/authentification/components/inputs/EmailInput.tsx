import { useFormContext } from "react-hook-form";

interface Props {
  email: string;
}

export default function EmailInput({ email }: Props) {
  const { register } = useFormContext();
  return (
    <input
      type="email"
      className="h-[32px] rounded-input-radius p-input-padding outline-none border-[1px] border-input-border-gray"
      {...register(email, {
        required: true,
      })}
      placeholder="Enter your e-mail..."
    />
  );
}
