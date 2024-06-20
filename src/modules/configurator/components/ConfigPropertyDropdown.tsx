import { ConfigProperty } from "./ConfigProperty";
import { currentConfiguration } from "../state";
import { useRecoilValue } from "recoil";

export function ConfigPropertyDropdown({
  propertyName,
}: {
  propertyName: string;
}) {
  const configuration = useRecoilValue(currentConfiguration);
  const currentProperties =
    propertyName === "color"
      ? configuration?.colors
      : configuration?.wheelVariants;

  return (
    <ul>
      {currentProperties &&
        currentProperties.length > 0 &&
        currentProperties.map((item, index) => (
          <ConfigProperty
            key={index}
            modelName={configuration?.model}
            label={item.label}
            name={propertyName}
            description={item.name}
          />
        ))}
    </ul>
  );
}
