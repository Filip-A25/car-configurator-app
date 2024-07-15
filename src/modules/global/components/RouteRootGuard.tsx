import { PropsWithChildren } from "react";
import { loggedState } from "../state";
import { pageLoadingState } from "../state/loadingState";
import { useRecoilValue } from "recoil";
import { configuratorRoutes } from "../../configurator/const";
import { Navigate } from "react-router-dom";
import { PageLoading } from "./PageLoading";
import { NotFoundPage } from "../../../shared/NotFoundPage";

interface Props extends PropsWithChildren {
  isErrorPage?: boolean;
}

export const RouteRootGuard = ({ children, isErrorPage }: Props) => {
  const isLoggedIn = useRecoilValue(loggedState);
  const isPageLoading = useRecoilValue(pageLoadingState);

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
