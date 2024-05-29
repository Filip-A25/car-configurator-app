import { useForm, FormProvider } from "react-hook-form";
import EmailInput from "./inputs/EmailInput";
import PasswordInput from "./inputs/PasswordInput";

export default function AuthLoginForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form>
        <h2>Log In</h2>
        <label>Enter your e-mail</label>
        <EmailInput email="email" />
        <label>Enter a password</label>
        <PasswordInput password="password" />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
