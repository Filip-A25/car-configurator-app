import { auth, provider } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  passwordMaxLength,
  passwordMinLength,
  passwordRegexp,
  emailRegexp,
} from "../const/userInputRequirements";
import { userState, loggedState } from "../state/userState";
import { useSetRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import googleLogoImg from "../assets/google-logo.png";
import InputField from "./inputs/InputField";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../../shared/Button";

interface LoginData {
  email: string;
  password: string;
}

export default function AuthLoginForm() {
  const navigate = useNavigate();

  const form = useForm<LoginData>();
  const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loggedState);

  const onSubmit = (data: LoginData) => {
    if (
      (!data.email && !emailRegexp.test(data.email)) ||
      (!data.password && !emailRegexp.test(data.email))
    )
      return;
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        if (!userCredential.user.displayName) {
          throw new Error("User display name could not be found.");
        }

        setUserData({
          name: userCredential.user.displayName,
          email: data.email,
        });

        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userCredential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = userCredential?.accessToken;
        const user = result.user;

        if (!user.displayName || !user.email || !accessToken) {
          throw new Error("User data could not be found.");
        }
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
            validation={{ required: true }}
          />
          <label>Password</label>
          <InputField
            name="password"
            placeholder="Enter your password..."
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
