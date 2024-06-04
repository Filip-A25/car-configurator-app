import { useForm, FormProvider } from "react-hook-form";
import InputField from "./inputs/InputField";
import {
  passwordMaxLength,
  passwordMinLength,
  passwordRegexp,
} from "../const/userInputRequirements";

export default function AuthLoginForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form>
        <h2>Log In</h2>
        <label>E-mail address</label>
        <InputField
          name="email"
          placeholder="Enter your email..."
          validation={{ required: true }}
        />
        <label>Password</label>
        <InputField
          name="password"
          placeholder="Enter a password..."
          validation={{
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
          }}
        />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
