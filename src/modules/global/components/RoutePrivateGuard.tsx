import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedState, userState } from "../../authentification/state";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const RoutePrivateGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const setUserData = useSetRecoilState(userState);

  onAuthStateChanged(auth, (user) => {
    if (!user) throw new Error("User could not be found.");
    if (!user.displayName || !user.email)
      throw new Error("User data coult not be found");

    setUserData({
      id: user.uid,
      name: user.displayName,
      email: user.email,
    });
    setIsLoggedIn(true);
    return;
  });

  if (!isLoggedIn) return <Navigate to="/auth/log-in" />;

  return <>{children}</>;
};
