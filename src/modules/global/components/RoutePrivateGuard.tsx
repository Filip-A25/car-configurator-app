import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedState } from "../state";
import { pageLoadingState } from "../state/loadingState";
import { PageLoading } from "./PageLoading";
import { authRoutes } from "../../authentification/const";

export const RoutePrivateGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const isLoggedIn = useRecoilValue(loggedState);
  const isPageLoading = useRecoilValue(pageLoadingState);

  if (isPageLoading) return <PageLoading />;

  if (!isLoggedIn) return <Navigate to={authRoutes.logIn} />;

  return <>{children}</>;
};
