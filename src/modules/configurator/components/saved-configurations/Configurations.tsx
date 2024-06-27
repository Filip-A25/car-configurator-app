import ConfigureLinkButton from "../ConfigureLinkButton";
import ConfigurationsEmpty from "./ConfigurationsEmpty";
import { useRecoilValue } from "recoil";
import { userConfigurationsState } from "../../state";
import ConfigurationsSaved from "./ConfigurationsSaved";

export default function Configurations() {
  const userConfigurations = useRecoilValue(userConfigurationsState);

  return (
    <section className="text-center md:text-left px-10 sm:px-20 md:px-20 lg:px-36 py-16 flex flex-col">
      <header className="flex flex-col sm:flex-row justify-between">
        <h2 className="mb-6 text-lg sm:text-sm">View saved configurations</h2>
        <ConfigureLinkButton path="/configure-a-car" title="Configure a car" />
      </header>
      {!Boolean(userConfigurations.length) ? (
        <ConfigurationsEmpty />
      ) : (
        <ConfigurationsSaved />
      )}
    </section>
  );
}
