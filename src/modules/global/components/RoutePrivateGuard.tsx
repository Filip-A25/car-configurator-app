import React, { PropsWithChildren, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedState, userState } from "../../authentification/state";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { PageLoading } from "./PageLoading";

export const RoutePrivateGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const setUserData = useSetRecoilState(userState);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) throw new Error("User could not be found.");
      if (!user.displayName || !user.email)
        throw new Error("User data coult not be found");
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

  if (isPageLoading) return <PageLoading />;

  if (!isLoggedIn) return <Navigate to="/auth/log-in" />;

  return <>{children}</>;
};
