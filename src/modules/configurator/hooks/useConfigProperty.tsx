import { useEffect, useState } from "react";
import { fetchPropertyImageByVariant } from "../services";
import {
  dropdownState,
  dropdownOpen,
  userConfigurationState,
  activePropState,
  currentConfigurationsState,
} from "../state";
import { CarProperty, InteriorPosition } from "../types";
import { getPropertyTypeName } from "../utilities/utilities";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";

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
  const configurations = useRecoilValue(currentConfigurationsState);

  const [activePropIndex, setActivePropIndex] = useRecoilState(activePropState);

  const [searchParams] = useSearchParams();

  const configId = searchParams.get("configId");

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

  /*
  const handleSetActiveProperty = () => {
    if (!configurations || !currentUserConfiguration) return;
    const properyArray = configurations[propertyName];
    console.log(properyArray);
    const targetProperty = currentUserConfiguration[propertyName];
    console.log(targetProperty);
    const targetIndex = properyArray.findIndex(
      (item) => item === targetProperty
    );

    setActivePropIndex({ ...activePropIndex, [propertyName]: targetIndex });
  };

  useEffect(() => {
    if (configId) handleSetActiveProperty();
  }, []);
  */

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
        description: description,
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
