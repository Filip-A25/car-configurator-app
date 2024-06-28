import { SavedConfigurationItem } from "./SavedConfigurationItem";
import { useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";

export default function ConfigurationsSaved() {
  const userConfigurations = useRecoilValue(userConfigurationsState);

  return (
    <ul>
      {userConfigurations.map((config, index) => (
        <SavedConfigurationItem
          key={index}
          name={config.model}
          productionYear={config.productionYear}
          colorLabel={config.color.label}
          colorName={config.color.name}
          wheelsLabel={config.wheels.label}
        />
      ))}
    </ul>
  );
}
