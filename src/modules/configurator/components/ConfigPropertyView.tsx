import { ConfigProperty } from "./ConfigProperty";
import { CarProperty } from "../types";

export function ConfigPropertyView({ ...props }: CarProperty) {
  return (
    <div className="flex items-center justify-between cursor-text">
      <ConfigProperty disabled {...props} />
      <span className="text-md sm:text-xl text-property-name-grey">
        {props.price} €
      </span>
    </div>
  );
}
