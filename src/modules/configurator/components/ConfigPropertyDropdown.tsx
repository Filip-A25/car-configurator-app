import { ConfigProperty } from "./ConfigProperty";
import { currentConfigurationsState, activePropState } from "../state";
import { useRecoilValue } from "recoil";
import { CarPropertyName } from "../types";

interface Props {
  propertyName: CarPropertyName;
  isActive: boolean;
}

export function ConfigPropertyDropdown({ propertyName, isActive }: Props) {
  const configurations = useRecoilValue(currentConfigurationsState);
  const activePropIndex = useRecoilValue(activePropState);

  const getCurrentProperties = () => {
    switch (propertyName) {
      case "color":
        return configurations?.color;
      case "wheels":
        return configurations?.wheels;
      case "interior_variants":
        return configurations?.interior_variants;
      default:
        return;
    }
  };

  const currentProperties = getCurrentProperties();

  return (
    <ul>
      {currentProperties &&
        Boolean(currentProperties.length) &&
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
