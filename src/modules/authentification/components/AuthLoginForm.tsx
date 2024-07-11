import { validation } from "../const/userInputRequirements";
import { Link } from "react-router-dom";
import googleLogoImg from "../assets/google-logo.png";
import InputField from "./inputs/InputField";
import { FormProvider } from "react-hook-form";
import Button from "../../../shared/Button";
import useAuthLogin from "../hooks/useAuthLogin";
import { authRoutes } from "../const";

export function AuthLoginForm() {
  const { handleGoogleSignIn, onSubmit, form } = useAuthLogin();

  return (
    <FormProvider {...form}>
      <form
        id="log-in-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col w-screen sm:w-[500px] lg:w-[550px] 3xl:w-[650px] bg-basic-white text-text-default-gray px-10 py-8 lg:pb-16 lg:pt10 3xl:pb-20 3xl:pt-12 sm:shadow-md"
      >
        <h2 className="form-size-header font-bold 3xl:text-5xl 3xl:leading-relaxed">
          Sign In
        </h2>
        <span className="max-md:text-sm md:text-md 3xl:text-lg">
          Don't have an account?{" "}
          <Link to={authRoutes.register} className="text-text-purple">
            Create one now!
          </Link>
        </span>
        <section className="flex flex-col form-vertical-margin form-bottom-padding pb-20 md:pb-32">
          <section className="py-3">
            <div className="py-3 flex flex-col">
              <label className="leading-10">E-mail address</label>
              <InputField
                name="email"
                placeholder="Enter your email..."
                type="email"
                validation={validation.email}
              />
            </div>
            <div className="py-3 flex flex-col">
              <label className="leading-10">Password</label>
              <InputField
                name="password"
                placeholder="Enter your password..."
                type="password"
                validation={validation.password}
              />
            </div>
          </section>
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
