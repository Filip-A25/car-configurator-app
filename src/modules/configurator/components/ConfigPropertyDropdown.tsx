import { ConfigProperty } from "./ConfigProperty";
import { currentConfigurations } from "../state";
import { useRecoilValue } from "recoil";
import { useState } from "react";

export function ConfigPropertyDropdown({
  propertyName,
}: {
  propertyName: "color" | "wheels";
}) {
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
          !isDropdownOpen && activePropIndex === index ? (
            <ConfigProperty
              key={index}
              index={index}
              propertyName={propertyName}
              modelName={configurations?.model}
              label={item.label}
              name={propertyName}
              description={item.name}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              setActivePropIndex={setActivePropIndex}
            />
          ) : isDropdownOpen ? (
            <ConfigProperty
              key={index}
              index={index}
              propertyName={propertyName}
              modelName={configurations?.model}
              label={item.label}
              name={propertyName}
              description={item.name}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              setActivePropIndex={setActivePropIndex}
            />
          ) : null
        )}
    </ul>
  );
}
