import { ConfigProperty } from "./ConfigProperty";
import { CarProperty } from "../types";

export function ConfigPropertyView({ price, ...props }: CarProperty) {
  return (
    <div className="flex items-center justify-between cursor-text">
      <ConfigProperty price={price} disabled {...props} />
      <span className="text-md sm:text-xl text-property-name-grey">
        {price} €
      </span>
    </div>
  );
}
