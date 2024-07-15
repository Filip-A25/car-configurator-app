import { useState } from "react";
import { validation } from "../const/userInputRequirements";
import { Link } from "react-router-dom";
import InputField from "./inputs/InputField";
import googleLogoImg from "../assets/google-logo.png";
import Button from "../../../shared/Button";
import useAuthRegister from "../hooks/useAuthRegister";
import { FormProvider } from "react-hook-form";
import { authRoutes } from "../const";

export function AuthRegisterForm() {
  const { onSubmit, handleGoogleSignUp, form } = useAuthRegister();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative flex flex-col w-screen sm:w-[500px] lg:w-[550px] 3xl:w-[650px] bg-basic-white text-text-default-gray px-10 py-8 lg:pb-10 lg:pt10 3xl:pb-20 3xl:pt-12 sm:shadow-md">
      <h2 className="form-size-header font-bold 3xl:text-5xl 3xl:leading-relaxed">
        Sign Up
      </h2>
      <span className="max-md:text-sm md:text-md 3xl:text-lg">
        Already have an account?{" "}
        <Link to={authRoutes.logIn} className="text-text-purple">
          Sign in.
        </Link>
      </span>
      {!isFormOpen ? (
        <div className="mt-8 pt-6 pb-52">
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
            <section className="flex flex-col form-vertical-margin form-bottom-padding pb-10 md:pb-5">
              <section className="py-3">
                <div className="pt-3 flex flex-col">
                  <label className="leading-10">Nickname</label>
                  <InputField
                    name="name"
                    placeholder="Enter a nickname..."
                    type="text"
                    validation={validation.username}
                  />
                </div>
                <div className="pt-3 flex flex-col">
                  <label className="leading-10">E-mail address</label>
                  <InputField
                    name="email"
                    placeholder="Enter your email..."
                    type="email"
                    validation={validation.email}
                  />
                </div>
                <div className="pt-3 flex flex-col">
                  <label className="leading-10">Password</label>
                  <InputField
                    name="password"
                    placeholder="Enter a password..."
                    type="password"
                    validation={validation.password}
                  />
                </div>
              </section>
            </section>
            <Button label="Sign Up" variant="primary" />
          </form>
        </FormProvider>
      )}
    </section>
  );
}
