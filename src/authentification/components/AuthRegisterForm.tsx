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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <label>Enter a nickname</label>
        <input
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
        />
        <label>Enter your e-mail</label>
        <EmailInput email="email" />
        <label>Enter a password</label>
        <PasswordInput password="password" />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
