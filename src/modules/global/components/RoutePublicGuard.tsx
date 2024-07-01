import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedState } from "../../authentification/state";

export const RoutePublicGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useRecoilValue(loggedState);

  if (isLoggedIn) return <Navigate to="/" />;

  return <>{children}</>;
};
