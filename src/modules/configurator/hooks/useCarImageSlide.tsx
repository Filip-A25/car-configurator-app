import { useRef, useState, useEffect } from "react";
import {
  fetchCarImagesByColorAndVariant,
  fetchPropertyImagesByVariant,
  VariantProps,
} from "../services";
import { userConfigurationState, activePageState } from "../state";
import { useRecoilValue } from "recoil";
import { CarModel, InteriorPosition } from "../types";

export function useCarImageSlide() {
  const [configImages, setConfigImages] = useState<string[]>();
  const currentUserConfiguration = useRecoilValue(userConfigurationState);
  const activePage = useRecoilValue(activePageState);

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);

  const handleCarImageFetch = async (
    modelName: CarModel,
    color: string,
    wheelVariant: number
  ) => {
    try {
      const images = await fetchCarImagesByColorAndVariant({
        modelName,
        color,
        wheelVariant,
      });

      setConfigImages(images);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleInteriorImageFetch = async ({
    modelName,
    name,
    variant,
  }: VariantProps) => {
    try {
      const requestData = [
        {
          modelName: modelName,
          name: name,
          variant: `${variant}_${InteriorPosition.dash}`,
        },
        {
          modelName: modelName,
          name: name,
          variant: `${variant}_${InteriorPosition.seats}`,
        },
      ];
      const imagePromises = requestData.map((request) =>
        fetchPropertyImagesByVariant(request)
      );

      const images = await Promise.all(imagePromises);

      setConfigImages(images);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!currentUserConfiguration) return;

    if (activePage.name === "Exterior") {
      handleCarImageFetch(
        currentUserConfiguration.model,
        currentUserConfiguration.color.label,
        currentUserConfiguration.wheels.label
      );
    }

    if (activePage.name === "Interior") {
      const requestData: VariantProps = {
        modelName: currentUserConfiguration.model,
        name: "interior_variants",
        variant: currentUserConfiguration.interior_variants.label,
      };

      handleInteriorImageFetch(requestData);
    }
  }, [currentUserConfiguration, activePage]);

  return { configImages, paginationBackRef, paginationNextRef };
}
