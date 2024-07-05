import { ConfigProperty } from "./ConfigProperty";
import { CarProperty } from "../types";

export function ConfigPropertyView({
  index,
  propertyName,
  modelName,
  label,
  name,
  description,
  price,
}: CarProperty) {
  return (
    <div className="flex items-center justify-between cursor-text">
      <ConfigProperty
        index={index}
        propertyName={propertyName}
        modelName={modelName}
        label={label}
        name={name}
        description={description}
        price={price}
        isDescriptionDisplayed={false}
      />
      <span className="text-xl text-property-name-grey">{price} €</span>
    </div>
  );
}
