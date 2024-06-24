import { useEffect, useState } from "react";
import { fetchPropertyImagesByVariant } from "../../../services/API_configurations";
import {
  dropdownState,
  dropdownOpen,
  userConfiguration,
  activePropState,
} from "../state";
import { useSetRecoilState, useRecoilState } from "recoil";

interface PropertyProps {
  index: number;
  propertyName: "color" | "wheels";
  modelName: "Audi RS5" | "Audi RS6" | "Audi e-tron GT" | undefined;
  label: string | number;
  name: string;
  description: string;
  price: number;
}

export function useConfigProperty({
  index,
  propertyName,
  modelName,
  label,
  name,
  description,
  price,
}: PropertyProps) {
  const [propertyImgUrl, setPropertyImgUrl] = useState("");
  const setActiveDropdownName = useSetRecoilState(dropdownState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownOpen);
  const [currentUserConfiguration, setCurrentUserConfiguration] =
    useRecoilState(userConfiguration);

  const [activePropIndex, setActivePropIndex] = useRecoilState(activePropState);

  useEffect(() => {
    handleImageFetch();
  }, []);

  const handleImageFetch = async () => {
    try {
      if (!modelName) return;
      const photoUrl = await fetchPropertyImagesByVariant(
        modelName,
        name,
        label
      );
      setPropertyImgUrl(photoUrl);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleOpenDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setActiveDropdownName(propertyName);
    } else {
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
    }
  };
  return { handleOpenDropdown, propertyImgUrl, activePropIndex };
}
