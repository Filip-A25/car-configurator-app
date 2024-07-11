import { ConfigProperty } from "./ConfigProperty";
import { CarProperty } from "../types";
import { getDisplayPrice } from "../utilities/utils";

export function ConfigPropertyView({ ...props }: CarProperty) {
  const displayPrice = getDisplayPrice(props.price);

  return (
    <div className="flex items-center justify-between cursor-text">
      <ConfigProperty disabled {...props} />
      <span className="text-md sm:text-xl text-property-name-grey 3xl:text-2xl">
        {displayPrice} €
      </span>
    </div>
  );
}
