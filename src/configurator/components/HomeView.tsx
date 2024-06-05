import ConfigureLinkButton from "./ConfigureLinkButton";
import ConfigurationsEmpty from "./ConfigurationsEmpty";
import { useRecoilState } from "recoil";
import { userConfigurationsState } from "../state/configurationsState";
import ConfigurationsSaved from "./ConfigurationsSaved";

export default function HomeView() {
  const [userConfigurations] = useRecoilState(userConfigurationsState);

  return (
    <section className="text-center md:text-left px-10 sm:px-20 md:px-20 lg:px-36 py-20 flex flex-col">
      <header className="flex flex-col sm:flex-row justify-between">
        <h2 className="mb-6">View saved configurations</h2>
        <ConfigureLinkButton path="/configure-a-car" title="Configure a car" />
      </header>
      {!userConfigurations ? <ConfigurationsEmpty /> : <ConfigurationsSaved />}
    </section>
  );
}
