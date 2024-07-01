import { useEffect } from "react";
import { ConfigureLinkButton } from "./ConfigureLinkButton";
import { ConfigurationsEmpty } from "./ConfigurationsEmpty";
import { useRecoilState, useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";
import { ConfigurationsSaved } from "./ConfigurationsSaved";
import { fetchAllUserConfigurations } from "../services";
import { userState } from "../../authentification/state";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Configurations() {
  const [userConfigurations, setUserConfigurations] = useRecoilState(
    userConfigurationsState
  );
  const currentUser = useRecoilValue(userState);

  const handleUserConfigurationsFetch = async (id: string) => {
    try {
      const response = await fetchAllUserConfigurations(id);
      setUserConfigurations(response);
    } catch (err: any) {
      throw Error(err);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    handleUserConfigurationsFetch(currentUser.id);
  }, []);

  return (
    <section className="text-left px-10 sm:px-20 md:px-20 lg:px-36 3xl:px-52 py-16 3xl:py-24 flex flex-col">
      <ToastContainer />
      <header className="flex flex-col sm:flex-row justify-between pb-8 3xl:pb-20">
        <h2 className="text-xl sm:text-lg 3xl:text-2xl py-5">
          View saved configurations
        </h2>
        <ConfigureLinkButton
          path="/home/configure-a-car/car-select"
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
