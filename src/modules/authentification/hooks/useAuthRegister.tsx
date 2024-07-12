import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userState } from "../state/userState";
import { loggedState } from "../../global/state";
import { auth, provider } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { validation } from "../const/userInputRequirements";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function useAuthRegister() {
  const navigate = useNavigate();

  const form = useForm<RegisterData>();
  const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loggedState);

  const onSubmit = (data: RegisterData) => {
    console.log(validation.email, validation.username, validation.password);
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
          id: auth.currentUser.uid,
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
        const accessToken = userCredential?.accessToken;
        const user = result.user;

        if (!user.displayName || !user.email || !accessToken) {
          throw new Error("User data could not be found.");
        }
        setUserData({
          id: user.uid,
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

  return { onSubmit, handleGoogleSignUp, form };
}
