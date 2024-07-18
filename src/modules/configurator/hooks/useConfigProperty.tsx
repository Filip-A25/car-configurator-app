import { ButtonHTMLAttributes, useEffect, useState, useMemo } from "react";
import { fetchPropertyImageByVariant } from "../services";
import {
  activeColorPropertyState,
  activeWheelPropertyState,
  activeInteriorPropertyState,
} from "../state";
import { CarModel, CarPropertyName, InteriorPosition } from "../types";
import { getPropertyTypeName } from "../utilities/utils";
import { useRecoilValue } from "recoil";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  propertyName: CarPropertyName;
  modelName: CarModel;
  label: string | number;
  name: string;
  description: string;
  price: number;
}

export function useConfigProperty({
  propertyName,
  modelName,
  label,
  name,
  disabled,
}: Props) {
  const [propertyImgUrl, setPropertyImgUrl] = useState("");
  const activeColorProperty = useRecoilValue(activeColorPropertyState);
  const activeWheelProperty = useRecoilValue(activeWheelPropertyState);
  const activeInteriorProperty = useRecoilValue(activeInteriorPropertyState);

  const isSelected = useMemo(() => {
    switch (propertyName) {
      case "color":
        return activeColorProperty?.label === label && !disabled;
      case "wheels":
        return activeWheelProperty?.label === label && !disabled;
      case "interior_variants":
        return activeInteriorProperty?.label === label && !disabled;
      default:
        return;
    }
  }, [activeColorProperty, activeWheelProperty, activeInteriorProperty]);

  const handleImageFetch = async () => {
    try {
      if (!modelName || !name || !label) return;

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

  const propertyTypeName = getPropertyTypeName(propertyName);

  return {
    propertyImgUrl,
    propertyTypeName,
    isSelected,
  };
}
