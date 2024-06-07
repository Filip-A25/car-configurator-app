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
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { formOpenState } from "../state/formState";
import googleLogoImg from "../assets/google-logo.png";

interface UserCred extends User {
  password: string;
}

export default function AuthRegisterForm() {
  const navigate = useNavigate();

  const form = useForm<UserCred>();
  const [userData, setUserData] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const [isFormOpen, setIsFormOpen] = useRecoilState(formOpenState);

  const onSubmit = (data: UserCred) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async () => {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: data.name,
          });
        }
        setUserData({
          name: data.name,
          email: data.email,
        });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userCredential = GoogleAuthProvider.credentialFromResult(result);
        const token = userCredential?.accessToken;
        const user = result.user;

        if (!user.displayName || !user.email || !token)
          throw new Error("User data could not be found.");

        setUserData({
          name: user.displayName,
          email: user.email,
          googleAccessToken: token,
        });

        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <section className="relative flex flex-col w-screen sm:w-[500px] h-full sm:h-[500px] bg-basic-white text-text-default-gray px-10 py-8 shadow-md">
      <h2 className="text-[2.5rem] font-bold">Sign Up</h2>
      <span className="text-sm">
        Already have an account?{" "}
        <Link to="/auth/log-in" className="text-text-purple">
          Sign in.
        </Link>
      </span>

      {!isFormOpen ? (
        <div className="mt-8 flex flex-col items-center justify-evenly h-[30%] sm:h-[40%]">
          <button
            className="bg-button-purple right-0 left-0 h-[60px] sm:h-[52px] w-full text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
            onClick={() => setIsFormOpen(true)}
          >
            Sign up with e-mail
          </button>
          <button
            className="flex justify-center items-center right-0 left-0 h-[60px] sm:h-[52px] w-full text-button-purple border-[1px] mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
            onClick={handleGoogleSignUp}
          >
            <img
              src={googleLogoImg}
              alt="Google logo"
              className="w-[20px] h-[20px] mr-2"
            />
            <span>Sign up with a Google account</span>
          </button>
        </div>
      ) : (
        <FormProvider {...form}>
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <section className="flex flex-col justify-between h-[280px] my-5 pb-5 sm:pb-10">
              <label>Nickname</label>
              <input
                className="h-[48px] sm:h-[32px] rounded-input-radius p-input-padding outline-none border-[1px] border-input-border-gray mb-2"
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
              <PasswordInput
                password="password"
                placeholder="Enter a password..."
              />
            </section>
            <button
              form="register-form"
              type="submit"
              className="absolute bg-button-purple bottom-[50px] right-0 left-0 h-[48px] sm:h-[44px] w-[85%] text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>
      )}
    </section>
  );
}
