import { PropsWithChildren, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { loggedState } from "../state";
import { useSetRecoilState, useRecoilState } from "recoil";
import { userState } from "../../authentification/state";
import { configuratorRoutes } from "../../configurator/const";
import { Navigate } from "react-router-dom";
import { PageLoading } from "./PageLoading";

export const FirebaseAuthProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const setUserData = useSetRecoilState(userState);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !user.displayName || !user.email) {
        setIsLoggedIn(false);
        return setIsPageLoading(false);
      }
      setUserData({
        id: user.uid,
        name: user.displayName,
        email: user.email,
      });
      setIsLoggedIn(true);
      setIsPageLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isPageLoading) return <PageLoading />;

  if (!isLoggedIn) return <Navigate to="/auth/log-in" />;

  return <Navigate to={configuratorRoutes.configurations} />;
};
