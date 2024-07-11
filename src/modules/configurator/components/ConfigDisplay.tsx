import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigEdit } from "./ConfigEdit";
import { ConfigurationSummary } from "./ConfigurationSummary";
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
        returnPath=""
        isConfigurationEdit
      />
      {activePage?.name === "Summary" ? (
        <ConfigurationSummary />
      ) : (
        <ConfigEdit
          isDropdownOpen={isDropdownOpen}
          activeDropdownName={activeDropdownName}
        />
      )}
    </section>
  );
}
