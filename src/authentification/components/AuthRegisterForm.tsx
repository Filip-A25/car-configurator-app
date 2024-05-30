import { useForm, FormProvider } from "react-hook-form";
import { useRecoilState } from "recoil";
import { User } from "../types/userType";
import { userState, loggedState } from "../state/userState";
import {
  usernameMinLength,
  usernameMaxLength,
} from "../const/userInputRequirements";
import EmailInput from "./inputs/EmailInput";
import PasswordInput from "./inputs/PasswordInput";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AuthRegisterForm() {
  const navigate = useNavigate();

  const form = useForm<User>();
  const [userData, setUserData] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);

  const onSubmit = (data: User) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: data.name,
          });
        }
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
        className="flex flex-col w-[500px] h-[500px] bg-basic-white text-text-default-gray px-10 py-8 shadow-md"
      >
        <h2 className="text-[2.5rem] font-bold">Sign Up</h2>
        <span className="text-sm">Don't have an account? Create one now!</span>
        <section className="flex flex-col justify-between h-[300px] my-5 pb-10">
          <label>Nickname</label>
          <input
            className="h-[32px] rounded-input-radius p-input-padding outline-none border-[1px] border-input-border-gray"
            {...form.register("name", {
              required: true,
              minLength: {
                value: usernameMinLength,
                message: `Nickname must be atleast ${usernameMinLength} characters long.`,
              },
              maxLength: {
                value: usernameMaxLength,
                message: `Nickname cannot be longer than ${usernameMaxLength} characters.`,
              },
            })}
            placeholder="Enter a nickname..."
          />
          <label>E-mail address</label>
          <EmailInput email="email" />
          <label>Password</label>
          <PasswordInput password="password" />
        </section>
        <button
          form="register-form"
          type="submit"
          className="bg-button-purple h-[44px] w-[117px] text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
        >
          Sign Up
        </button>
      </form>
    </FormProvider>
  );
}
