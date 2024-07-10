import { ConfigProperty } from "./ConfigProperty";
import { CarProperty } from "../types";
import { decimalRegexp } from "../const";

export function ConfigPropertyView({ ...props }: CarProperty) {
  return (
    <div className="flex items-center justify-between cursor-text">
      <ConfigProperty disabled {...props} />
      <span className="text-md sm:text-xl text-property-name-grey 3xl:text-2xl">
        {props.price.toFixed(2).replace(decimalRegexp, ",")} €
      </span>
    </div>
  );
}
