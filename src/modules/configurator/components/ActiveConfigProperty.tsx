import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeColorPropertyState,
  activeWheelPropertyState,
  activeInteriorPropertyState,
  currentConfigurationsState,
  dropdownOpen,
  dropdownState,
  userConfigurationState,
} from "../state";
import { ConfigProperty } from "./ConfigProperty";
import { CarPropertyName } from "../types";
import { ConfigPropertySkeleton } from "./ConfigPropertySkeleton";

export function ActiveConfigProperty({
  propertyName,
}: {
  propertyName: CarPropertyName;
}) {
  const configurations = useRecoilValue(currentConfigurationsState);
  const activeColorProperty = useRecoilValue(activeColorPropertyState);
  const activeWheelProperty = useRecoilValue(activeWheelPropertyState);
  const activeInteriorProperty = useRecoilValue(activeInteriorPropertyState);
  const setIsDropdownOpen = useSetRecoilState(dropdownOpen);
  const setActiveDropdownName = useSetRecoilState(dropdownState);
  const userConfiguration = useRecoilValue(userConfigurationState);

  const getCurrentProperties = () => {
    switch (propertyName) {
      case "color":
        return activeColorProperty;
      case "wheels":
        return activeWheelProperty;
      case "interior_variants":
        return activeInteriorProperty;
      default:
        return;
    }
  };

  const currentProperties = getCurrentProperties();

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
    setActiveDropdownName(propertyName);
  };

  if (!configurations || !currentProperties) return <ConfigPropertySkeleton />;

  return (
    <>
      <ConfigProperty
        propertyName={propertyName}
        modelName={
          userConfiguration ? userConfiguration.model : configurations.model
        }
        label={currentProperties.label}
        name={propertyName}
        description={currentProperties.name}
        price={currentProperties.price}
        onClickHandler={handleDropdownOpen}
      />
    </>
  );
}
