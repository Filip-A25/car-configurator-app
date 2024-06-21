import { ConfigProperty } from "./ConfigProperty";
import { currentConfigurations } from "../state";
import { useRecoilValue } from "recoil";
import { useState } from "react";

interface DropdownProps {
  propertyName: "color" | "wheels";
  isActive: boolean;
}

export function ConfigPropertyDropdown({
  propertyName,
  isActive,
}: DropdownProps) {
  const [activePropIndex, setActivePropIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const configurations = useRecoilValue(currentConfigurations);

  const currentProperties =
    propertyName === "color"
      ? configurations?.colors
      : configurations?.wheelVariants;

  return (
    <ul>
      {currentProperties &&
        currentProperties.length > 0 &&
        currentProperties.map((item, index) =>
          !isActive && activePropIndex === index ? (
            <ConfigProperty
              key={index}
              index={index}
              propertyName={propertyName}
              modelName={configurations?.model}
              label={item.label}
              name={propertyName}
              description={item.name}
              isDropdownOpen={isDropdownOpen}
              setActivePropIndex={setActivePropIndex}
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
              isDropdownOpen={isDropdownOpen}
              setActivePropIndex={setActivePropIndex}
            />
          ) : null
        )}
    </ul>
  );
}
