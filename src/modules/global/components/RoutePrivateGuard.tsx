import React, { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { pathSelector } from "../state/navigationState";

export const RoutePrivateGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const filteredRoutesArray = useRecoilValue(pathSelector);
  const pathsArray = filteredRoutesArray.map((route) => {
    return route.path;
  });

  const { pathname } = useLocation();

  if (!pathsArray.includes(pathname)) return <Navigate to="/" />;

  return <>{children}</>;
};
