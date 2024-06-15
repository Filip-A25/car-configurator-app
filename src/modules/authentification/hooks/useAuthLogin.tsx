import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userState, loggedState } from "../state/userState";
import { useSetRecoilState } from "recoil";

interface LoginData {
  email: string;
  password: string;
}

export default function useAuthLogin() {
  const form = useForm<LoginData>();
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loggedState);

  const onSubmit = (data: LoginData) => {
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

  return { handleGoogleSignIn, onSubmit, form };
}
