import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigEdit } from "./ConfigEdit";
import { ConfigurationSummaryDisplay } from "./ConfigurationSummaryDisplay";
import { useRecoilValue } from "recoil";
import { activePageState, userConfigurationState } from "../state";
import { PageLoading } from "../../global/components";
import { useConfigEdit } from "../hooks";

export function ConfigDisplay() {
  const activePage = useRecoilValue(activePageState);
  const configuration = useRecoilValue(userConfigurationState);

  const { isDropdownOpen, activeDropdownName } = useConfigEdit();

  if (!configuration) return <PageLoading />;

  return (
    <section className="relative h-full">
      <ConfigNavbar
        model={configuration.model}
        productionYear={configuration.productionYear}
      />
      {activePage && activePage.name === "Summary" ? (
        <ConfigurationSummaryDisplay userConfiguration={configuration} />
      ) : (
        <ConfigEdit
          isDropdownOpen={isDropdownOpen}
          activeDropdownName={activeDropdownName}
        />
      )}
    </section>
  );
}
