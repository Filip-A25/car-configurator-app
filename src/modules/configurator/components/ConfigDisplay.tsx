import { currentConfigurationsState, activePageState } from "../state";
import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigEdit } from "./ConfigEdit";
import { ConfigSummary } from "./ConfigSummary";
import { useRecoilValue } from "recoil";

export function ConfigDisplay() {
  const configurations = useRecoilValue(currentConfigurationsState);
  const activePage = useRecoilValue(activePageState);

  return (
    <section className="relative h-full">
      <ConfigNavbar
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      {activePage.name === "Summary" ? <ConfigSummary /> : <ConfigEdit />}
    </section>
  );
}
