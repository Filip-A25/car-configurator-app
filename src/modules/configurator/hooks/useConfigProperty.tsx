import { useEffect, useState } from "react";
import { fetchPropertyImageByVariant } from "../services";
import {
  dropdownState,
  dropdownOpen,
  userConfigurationState,
  activePropState,
  activePageState,
} from "../state";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { CarProperty, CarPropertyName, InteriorPosition } from "../types";

export function useConfigProperty({
  index,
  propertyName,
  modelName,
  label,
  name,
  description,
  price,
}: CarProperty) {
  const [propertyImgUrl, setPropertyImgUrl] = useState("");
  const setActiveDropdownName = useSetRecoilState(dropdownState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownOpen);
  const [currentUserConfiguration, setCurrentUserConfiguration] =
    useRecoilState(userConfigurationState);
  const activePage = useRecoilValue(activePageState);

  const [activePropIndex, setActivePropIndex] = useRecoilState(activePropState);

  const handleImageFetch = async () => {
    try {
      if (!modelName) return;

      const requestData = {
        modelName: modelName,
        name: name,
        variant:
          propertyName === "interior_variants"
            ? `${label}_${InteriorPosition.seats}`
            : label,
      };

      const photoUrl = await fetchPropertyImageByVariant(requestData);

      setPropertyImgUrl(photoUrl);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    handleImageFetch();
  }, [modelName, activePage]);

  const handleOpenDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setActiveDropdownName(propertyName);
      return;
    }
    if (!currentUserConfiguration) return;

    setCurrentUserConfiguration({
      ...currentUserConfiguration,
      [propertyName]: {
        label: label,
        description: description,
        price: price,
      },
    });
    setActivePropIndex({ ...activePropIndex, [propertyName]: index });
  };

  const getPropertyTypeName = () => {
    switch (propertyName) {
      case "color":
        return "Paint color";
      case "wheels":
        return "Wheels";
      case "interior_variants":
        return "Color";
      default:
        return;
    }
  };

  return {
    handleOpenDropdown,
    propertyImgUrl,
    activePropIndex,
    getPropertyTypeName,
  };
}
