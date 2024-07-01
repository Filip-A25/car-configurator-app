import { ConfigureLinkButton } from "./ConfigureLinkButton";
import { ConfigurationsEmpty } from "./ConfigurationsEmpty";
import { useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";
import { ConfigurationsSaved } from "./ConfigurationsSaved";

export default function Configurations() {
  const userConfigurations = useRecoilValue(userConfigurationsState);

  return (
    <section className="text-center md:text-left px-10 sm:px-20 md:px-20 lg:px-36 3xl:px-52 py-16 3xl:py-24 flex flex-col">
      <header className="flex flex-col sm:flex-row justify-between pb-10 3xl:pb-20">
        <h2 className="text-lg sm:text-sm 3xl:text-2xl py-5">
          View saved configurations
        </h2>
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
