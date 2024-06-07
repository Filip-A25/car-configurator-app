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
} from "../const/userInputRequirements";
import { userState, loggedState } from "../state/userState";
import { useSetRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import googleLogoImg from "../assets/google-logo.png";
import InputField from "./inputs/InputField";
import { useForm, FormProvider } from "react-hook-form";

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
    if (!data.email) return;
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
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
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
      navigate("/");
    });
  };

  return (
    <FormProvider {...form}>
      <form
        id="log-in-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col w-screen sm:w-[500px] h-full sm:h-[500px] bg-basic-white text-text-default-gray py-8 shadow-md"
      >
        <h2 className="text-[2.5rem] font-bold mx-auto w-[85%]">Sign In</h2>
        <span className="text-sm mx-auto w-[85%]">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-text-purple">
            Create one now!
          </Link>
        </span>
        <section className="flex flex-col justify-between h-[200px] w-[85%] mx-auto my-5 pb-5 sm:pb-10">
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
        <button
          form="log-in-form"
          type="submit"
          className="absolute bg-button-purple bottom-[180px] sm:bottom-[120px] right-0 left-0 h-[48px] sm:h-[44px] w-[85%] text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
        >
          Sign In
        </button>
        <button
          className="absolute flex justify-center items-center bottom-[60px] right-0 left-0 h-[48px] sm:h-[44px] w-[85%] text-button-purple border-[1px] mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
          onClick={handleGoogleSignIn}
        >
          <img
            src={googleLogoImg}
            alt="Google logo"
            className="w-[20px] h-[20px] mr-2"
          />
          <span>Sign in with a Google account</span>
        </button>
      </form>
    </FormProvider>
  );
}
