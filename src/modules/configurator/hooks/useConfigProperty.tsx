import { useEffect, useState } from "react";
import { fetchPropertyImagesByVariant } from "../services";
import {
  dropdownState,
  dropdownOpen,
  userConfigurationState,
  activePropState,
} from "../state";
import { useSetRecoilState, useRecoilState } from "recoil";
import { CarProperty } from "../types";

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
        variant: label,
      };
      const photoUrl = await fetchPropertyImagesByVariant(requestData);

      setPropertyImgUrl(photoUrl);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    handleImageFetch();
  }, [modelName]);

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

  return { handleOpenDropdown, propertyImgUrl, activePropIndex };
}
