import { ConfigProperty } from "./ConfigProperty";
import { currentConfigurations, activePropState } from "../state";
import { useRecoilValue } from "recoil";

interface DropdownProps {
  propertyName: "color" | "wheels";
  isActive: boolean;
}

export function ConfigPropertyDropdown({
  propertyName,
  isActive,
}: DropdownProps) {
  const configurations = useRecoilValue(currentConfigurations);
  const activePropIndex = useRecoilValue(activePropState);

  const currentProperties =
    propertyName === "color"
      ? configurations?.color
      : configurations?.wheelVariants;

  return (
    <ul>
      {currentProperties &&
        currentProperties.length > 0 &&
        currentProperties.map((item, index) =>
          !isActive && activePropIndex[propertyName] === index ? (
            <ConfigProperty
              key={index}
              index={index}
              propertyName={propertyName}
              modelName={configurations?.model}
              label={item.label}
              name={propertyName}
              description={item.name}
              price={item.price}
            />
          ) : isActive ? (
            <ConfigProperty
              key={index}
              index={index}
              propertyName={propertyName}
              modelName={configurations?.model}
              label={item.label}
              name={propertyName}
              description={item.name}
              price={item.price}
            />
          ) : null
        )}
    </ul>
  );
}
