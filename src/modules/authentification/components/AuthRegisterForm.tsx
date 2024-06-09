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
        navigate("/home");
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
        navigate("/home");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

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
          <PrimaryButton
            label="Sign up with e-mail"
            variant="primary"
            onClick={() => setIsFormOpen(true)}
          />
          <PrimaryButton
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
            <PrimaryButton label="Sign Up" variant="primary" />
          </form>
        </FormProvider>
      )}
    </section>
  );
}
