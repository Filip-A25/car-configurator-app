import { useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userConfigurationState } from "../state";
import { userState } from "../../authentification/state";
import { PageLoading } from "../../global/components";
import { ConfigNavbar } from "./ConfigNavbar";
import { useSearchParams } from "react-router-dom";
import { fetchUserConfiguration } from "../services";
import { configuratorRoutes } from "../const";
import { ConfigurationSummaryDisplay } from "./ConfigurationSummaryDisplay";

export function ConfigurationView() {
  const [configuration, setConfiguration] = useRecoilState(
    userConfigurationState
  );
  const user = useRecoilValue(userState);

  const [searchParams] = useSearchParams();

  const configId = searchParams.get("configId");

  const handleGetUserConfiguration = useCallback(async () => {
    if (!user || !configId) throw new Error("Incomplete data.");
    try {
      const response = await fetchUserConfiguration(user.id, configId);
      setConfiguration(response);
    } catch (err: any) {
      throw new Error(err);
    }
  }, [user, configId]);

  useEffect(() => {
    handleGetUserConfiguration();
  }, [handleGetUserConfiguration]);

  if (!configuration) return <PageLoading />;

  return (
    <>
      <ConfigNavbar
        returnPath={configuratorRoutes.configurations}
        model={configuration.model}
        productionYear={configuration.productionYear}
      />
      <ConfigurationSummaryDisplay />
    </>
  );
}
