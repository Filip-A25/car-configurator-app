import { useEffect, useState } from "react";
import { fetchPropertyImageByVariant } from "../services";
import {
  dropdownState,
  dropdownOpen,
  userConfigurationState,
  activePropState,
} from "../state";
import { CarProperty, InteriorPosition } from "../types";
import { getPropertyTypeName } from "../utilities/utils";
import { useSetRecoilState, useRecoilState } from "recoil";

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
  }, [modelName, propertyName]);

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
        name: description,
        price: price,
      },
    });
    setActivePropIndex({ ...activePropIndex, [propertyName]: index });
  };

  const propertyTypeName = getPropertyTypeName(propertyName);

  return {
    handleOpenDropdown,
    propertyImgUrl,
    activePropIndex,
    propertyTypeName,
  };
}
