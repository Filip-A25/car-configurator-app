import { SavedConfigurationItem } from "./SavedConfigurationItem";
import { useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";

export function ConfigurationsSaved() {
  const userConfigurations = useRecoilValue(userConfigurationsState);

  return (
    <ul>
      {userConfigurations.map((config, index) => (
        <SavedConfigurationItem
          key={index}
          id={config.id}
          name={config.model}
          modelId={config.modelId}
          productionYear={config.productionYear}
          colorLabel={config.color.label}
          colorName={config.color.name}
          wheelsLabel={config.wheels.label}
        />
      ))}
    </ul>
  );
}
