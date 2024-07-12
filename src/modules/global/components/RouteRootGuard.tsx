import { PropsWithChildren, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { loggedState } from "../state";
import { useSetRecoilState, useRecoilState } from "recoil";
import { userState } from "../../authentification/state";
import { configuratorRoutes } from "../../configurator/const";
import { Navigate } from "react-router-dom";
import { PageLoading } from "./PageLoading";
import { NotFoundPage } from "../../../shared/NotFoundPage";

interface Props extends PropsWithChildren {
  isErrorPage?: boolean;
}

export const RouteRootGuard = ({ children, isErrorPage }: Props) => {
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

  if (!isLoggedIn && !isErrorPage) return <Navigate to="/auth/log-in" />;
  if (!isLoggedIn && isErrorPage)
    return (
      <NotFoundPage returnPageTitle="sign in" returnPagePath="/auth/log-in" />
    );

  if (!isErrorPage) return <Navigate to={configuratorRoutes.configurations} />;
  return (
    <NotFoundPage
      returnPageTitle="your configurations"
      returnPagePath={configuratorRoutes.configurations}
    />
  );
};
