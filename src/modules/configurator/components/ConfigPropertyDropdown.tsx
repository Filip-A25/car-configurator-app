import { ConfigProperty } from "./ConfigProperty";
import { currentConfigurationsState, userConfigurationState } from "../state";
import { useRecoilValue, useRecoilState } from "recoil";
import { CarPropertyName, PropertyVariant } from "../types";
import { ConfigPropertySkeleton } from "./ConfigPropertySkeleton";

export function ConfigPropertyDropdown({
  propertyName,
}: {
  propertyName: CarPropertyName;
}) {
  const configurations = useRecoilValue(currentConfigurationsState);
  const [userConfiguration, setUserConfiguration] = useRecoilState(
    userConfigurationState
  );

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

  const handleSetActiveProperty = (propertyData: PropertyVariant) => {
    if (!userConfiguration) return;
    setUserConfiguration({
      ...userConfiguration,
      [propertyName]: {
        label: propertyData.label,
        name: propertyData.name,
        price: propertyData.price,
      },
    });
  };

  const currentProperties = getCurrentProperties();

  if (!configurations) return <ConfigPropertySkeleton />;

  return (
    <ul>
      {currentProperties &&
        Boolean(currentProperties.length) &&
        currentProperties.map((item, index) => (
          <ConfigProperty
            key={index}
            propertyName={propertyName}
            modelName={configurations?.model}
            label={item.label}
            name={propertyName}
            description={item.name}
            price={item.price}
            onClickHandler={() => {
              const propertyData: PropertyVariant = {
                label: item.label,
                name: item.name,
                price: item.price,
              };
              handleSetActiveProperty(propertyData);
            }}
          />
        ))}
    </ul>
  );
}
