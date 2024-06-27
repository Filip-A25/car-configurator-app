import { useRef, useState, useEffect } from "react";
import { fetchCarImagesByColorAndVariant } from "../services";
import { userConfigurationState } from "../state";
import { useRecoilValue } from "recoil";
import { CarModel } from "../types";

export function useCarImageSlide() {
  const [configImages, setConfigImages] = useState<string[]>();
  const currentUserConfiguration = useRecoilValue(userConfigurationState);

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);

  const handleCarImageFetch = async (
    modelName: CarModel,
    color: string,
    wheelVariant: number
  ) => {
    try {
      const photos = await fetchCarImagesByColorAndVariant({
        modelName,
        color,
        wheelVariant,
      });

      setConfigImages(photos);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!currentUserConfiguration) return;
    handleCarImageFetch(
      currentUserConfiguration.model,
      currentUserConfiguration.color.label,
      currentUserConfiguration.wheels.label
    );
  }, [currentUserConfiguration]);

  return { configImages, paginationBackRef, paginationNextRef };
}
