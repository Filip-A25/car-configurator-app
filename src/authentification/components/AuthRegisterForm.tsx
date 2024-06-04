import { useForm, FormProvider } from "react-hook-form";
import { useRecoilState } from "recoil";
import { User } from "../types/userType";
import { userState, loggedState } from "../state/userState";
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength,
  passwordRegexp,
} from "../const/userInputRequirements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import InputField from "./inputs/InputField";

export default function AuthRegisterForm() {
  const navigate = useNavigate();

  const form = useForm<User>();
  const [userData, setUserData] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);

  const onSubmit = (data: User) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        if (!userCredential || !auth.currentUser)
          throw new Error("User data could not be found.");
        await updateProfile(auth.currentUser, {
          displayName: data.name,
        }).catch((err) => {
          throw new Error(err);
        });
        setUserData({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <FormProvider {...form}>
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-screen sm:w-[500px] bg-basic-white text-text-default-gray px-10 py-8 sm:shadow-md"
      >
        <h2 className="text-form-header font-bold">Sign Up</h2>
        <span className="text-sm">Don't have an account? Create one now!</span>
        <section className="flex flex-col justify-between h-[320px] my-5 pb-5 sm:pb-10">
          <label>Nickname</label>
          <InputField
            name="name"
            placeholder="Enter a nickname..."
            validation={{
              required: true,
              minLength: {
                value: usernameMinLength,
                message: `Nickname must be atleast ${usernameMinLength} characters long.`,
              },
              maxLength: {
                value: usernameMaxLength,
                message: `Nickname cannot be longer than ${usernameMaxLength} characters.`,
              },
            }}
          />
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
        </section>
        <button
          form="register-form"
          type="submit"
          className="bg-button-purple h-[48px] sm:h-[44px] w-full sm:w-[117px] text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
        >
          Sign Up
        </button>
      </form>
    </FormProvider>
  );
}
