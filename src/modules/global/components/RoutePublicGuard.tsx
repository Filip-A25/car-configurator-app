import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedState } from "..//state";
import { configuratorRoutes } from "../../configurator/const";

export const RoutePublicGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useRecoilValue(loggedState);

  if (isLoggedIn) return <Navigate to={configuratorRoutes.configurations} />;

  return <>{children}</>;
};
