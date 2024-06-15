import { useState } from "react";
import { validation } from "../const/userInputRequirements";
import { Link } from "react-router-dom";
import InputField from "./inputs/InputField";
import googleLogoImg from "../assets/google-logo.png";
import Button from "../../../shared/Button";
import useAuthRegister from "../hooks/useAuthRegister";
import { FormProvider } from "react-hook-form";

export default function AuthRegisterForm() {
  const { onSubmit, handleGoogleSignUp, form } = useAuthRegister();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative flex flex-col w-screen sm:w-[500px] bg-basic-white text-text-default-gray px-10 py-8 sm:shadow-md">
      <h2 className="form-size-header font-bold">Sign Up</h2>
      <span className="text-sm">
        Already have an account?{" "}
        <Link to="/auth/log-in" className="text-text-purple">
          Sign in.
        </Link>
      </span>
      {!isFormOpen ? (
        <div className="mt-8">
          <Button
            label="Sign up with e-mail"
            variant="primary"
            onClick={() => setIsFormOpen(true)}
          />
          <Button
            label="Sign up with Google"
            variant="secondary"
            onClick={handleGoogleSignUp}
            imgSrc={googleLogoImg}
            imgAlt="Google Logo"
          />
        </div>
      ) : (
        <FormProvider {...form}>
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <section className="flex flex-col form-vertical-margin form-bottom-padding">
              <label>Nickname</label>
              <InputField
                name="name"
                placeholder="Enter a nickname..."
                type="text"
                validation={validation.username}
              />
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
                placeholder="Enter a password..."
                type="password"
                validation={validation.password}
              />
            </section>
            <Button label="Sign Up" variant="primary" />
          </form>
        </FormProvider>
      )}
    </section>
  );
}
