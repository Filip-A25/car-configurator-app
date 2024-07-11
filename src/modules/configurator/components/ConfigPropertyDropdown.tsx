import { ConfigProperty } from "./ConfigProperty";
import {
  currentConfigurationsState,
  activePropState,
  userConfigurationState,
} from "../state";
import { useRecoilValue, useRecoilState } from "recoil";
import { CarPropertyName } from "../types";
import { useEffect, useState, useCallback } from "react";
import { PageLoading } from "../../global/components";

interface Props {
  propertyName: CarPropertyName;
  isActive: boolean;
}

export function ConfigPropertyDropdown({ propertyName, isActive }: Props) {
  const configurations = useRecoilValue(currentConfigurationsState);
  const userConfiguration = useRecoilValue(userConfigurationState);
  const [activePropIndex, setActivePropIndex] = useRecoilState(activePropState);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSetActivePropIndex = useCallback(() => {
    if (!configurations || !userConfiguration) return;

    const index = configurations[propertyName].findIndex(
      (item) => item.label === userConfiguration[propertyName]?.label
    );

    setActivePropIndex((prevActivePropIndex) => ({
      ...prevActivePropIndex,
      [propertyName]: index,
    }));
  }, [configurations, userConfiguration, propertyName]);

  useEffect(() => {
    handleSetActivePropIndex();
  }, [handleSetActivePropIndex]);

  useEffect(() => {
    if (typeof activePropIndex[propertyName] !== "undefined")
      setIsLoading(false);
  }, [activePropIndex, propertyName]);

  const currentProperties = getCurrentProperties();

  if (isLoading) return <PageLoading />;

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
