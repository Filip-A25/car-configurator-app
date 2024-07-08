import { currentConfigurationsState } from "../state";
import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigEdit } from "./ConfigEdit";
import { useRecoilValue } from "recoil";

export function ConfigDisplay() {
  const configurations = useRecoilValue(currentConfigurationsState);

  return (
    <section className="relative h-full">
      <ConfigNavbar
        returnPath="/home/configure-a-car/car-select"
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      <ConfigEdit />
    </section>
  );
}
