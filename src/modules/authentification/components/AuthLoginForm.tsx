import { validation } from "../const/userInputRequirements";
import { Link } from "react-router-dom";
import googleLogoImg from "../assets/google-logo.png";
import InputField from "./inputs/InputField";
import { FormProvider } from "react-hook-form";
import Button from "../../../shared/Button";
import useAuthLogin from "../hooks/useAuthLogin";

export default function AuthLoginForm() {
  const { handleGoogleSignIn, onSubmit, form } = useAuthLogin();

  return (
    <FormProvider {...form}>
      <form
        id="log-in-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col w-screen sm:w-[500px] bg-basic-white text-text-default-gray py-8 px-10 sm:shadow-md"
      >
        <h2 className="form-size-header font-bold">Sign In</h2>
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-text-purple">
            Create one now!
          </Link>
        </span>
        <section className="flex flex-col form-vertical-margin form-bottom-padding">
          <label>E-mail address</label>
          <InputField
            name="email"
            placeholder="Enter your email..."
            type="email"
            validation={validation.email}
          />
          <label>Password</label>
          <InputField
            name="password"
            placeholder="Enter your password..."
            type="password"
            validation={validation.password}
          />
        </section>
        <Button label="Sign In" variant="primary" />
        <Button
          label="Sign in with a Google account"
          variant="secondary"
          imgSrc={googleLogoImg}
          imgAlt="Google Logo"
          onClick={handleGoogleSignIn}
        />
      </form>
    </FormProvider>
  );
}
