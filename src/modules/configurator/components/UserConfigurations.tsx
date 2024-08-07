import { ConfigureLinkButton } from "./ConfigureLinkButton";
import { ConfigurationsEmpty } from "./ConfigurationsEmpty";
import { ConfigurationsSaved } from "./ConfigurationsSaved";
import { useRecoilState, useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";
import { useEffect, useState } from "react";
import { userState } from "../../authentification/state";
import { fetchAllUserConfigurations } from "../services";
import { PageLoading } from "../../global/components";
import { configuratorRoutes } from "../const";

export function UserConfigurations() {
  const [userConfigurations, setUserConfigurations] = useRecoilState(
    userConfigurationsState
  );
  const currentUser = useRecoilValue(userState);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const handleUserConfigurationsFetch = async (id: string) => {
    try {
      const response = await fetchAllUserConfigurations(id);
      setUserConfigurations(response);
    } catch (err: any) {
      throw Error(err);
    } finally {
      setIsDataFetching(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    handleUserConfigurationsFetch(currentUser.id);
  }, []);

  if (isDataFetching) return <PageLoading />;

  return (
    <section className="text-center md:text-left px-10 sm:px-20 md:px-20 lg:px-20 2xl:px-48 3xl:px-52 max-xs:py-10 py-10 sm:py-16 3xl:py-24 flex flex-col">
      <header className="flex flex-col sm:flex-row max-sm:items-center items-start justify-between max-sm:pb-4 pb-8 3xl:pb-20">
        <h2 className="text-xl sm:text-sm lg:text-lg 3xl:text-2xl max-sm:pb-6 pb-10 sm:py-3 md:py-4 3xl:py-5">
          View saved configurations
        </h2>
        <ConfigureLinkButton
          path={configuratorRoutes.carSelect}
          title="Configure a car"
        />
      </header>
      {!Boolean(userConfigurations.length) ? (
        <ConfigurationsEmpty />
      ) : (
        <ConfigurationsSaved />
      )}
    </section>
  );
}
