import { useEffect, PropsWithChildren } from "react";
import { useSetRecoilState } from "recoil";
import { loggedState } from "../state";
import { userState } from "../../authentification/state";
import { pageLoadingState } from "../state/loadingState";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseAuthProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const setIsLoggedIn = useSetRecoilState(loggedState);
  const setUserData = useSetRecoilState(userState);
  const setIsPageLoading = useSetRecoilState(pageLoadingState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !user.displayName || !user.email) {
        setIsLoggedIn(false);
        return setIsPageLoading(false);
      }

      setIsPageLoading(false);
      setUserData({
        id: user.uid,
        name: user.displayName,
        email: user.email,
      });
      setIsLoggedIn(true);
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};
