import { ConfigProperty } from "./ConfigProperty";
import { currentConfigurationsState, activePropState } from "../state";
import { useRecoilValue } from "recoil";
import { CarPropertyName, NumberVariant, TextVariant } from "../types";
import { useState, useEffect } from "react";

interface Props {
  propertyName: CarPropertyName;
  isActive: boolean;
}

export function ConfigPropertyDropdown({ propertyName, isActive }: Props) {
  const configurations = useRecoilValue(currentConfigurationsState);
  const activePropIndex = useRecoilValue(activePropState);

  const [currentProperties, setCurrentProperties] = useState<
    TextVariant[] | NumberVariant[] | undefined
  >([]);

  const handleConfigurationsSet = () => {
    switch (propertyName) {
      case "color":
        setCurrentProperties(configurations?.color);
        break;
      case "wheels":
        setCurrentProperties(configurations?.wheelVariants);
        break;
      case "interior_variants":
        setCurrentProperties(configurations?.interiorVariants);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    handleConfigurationsSet();
  }, [propertyName, configurations]);

  return (
    <ul>
      {Boolean(currentProperties?.length) &&
        currentProperties?.map((item, index) =>
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
