import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userState, loggedState } from "../state/userState";
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength,
  passwordRegexp,
} from "../const/userInputRequirements";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import InputField from "./inputs/InputField";
import googleLogoImg from "../assets/google-logo.png";
import PrimaryButton from "../../../shared/PrimaryButton";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function AuthRegisterForm() {
  const navigate = useNavigate();

  const form = useForm<RegisterData>();
  const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loggedState);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit = (data: RegisterData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        if (!userCredential || !auth.currentUser) {
          throw new Error("User data could not be found.");
        }
        await updateProfile(auth.currentUser, {
          displayName: data.name,
        }).catch((err) => {
          throw new Error(err);
        });
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
        });

        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <section className="relative flex flex-col w-screen sm:w-[500px] bg-basic-white text-text-default-gray px-10 py-8 sm:shadow-md">
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
          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <section className="flex flex-col my-5 pb-5 sm:pb-10">
              <label>Nickname</label>
              <InputField
                name="name"
                placeholder="Enter a nickname..."
                type="text"
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
                type="email"
                validation={{ required: true }}
              />
              <label>Password</label>
              <InputField
                name="password"
                placeholder="Enter a password..."
                type="password"
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
            <PrimaryButton label="Sign up" />
          </form>
        </FormProvider>
      )}
    </section>
  );
}
