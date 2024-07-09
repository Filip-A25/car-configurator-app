import { useRef, useState, useEffect } from "react";
import {
  fetchCarImagesByColorAndVariant,
  fetchPropertyImageByVariant,
} from "../services";
import { userConfigurationState, activePageState } from "../state";
import { useRecoilValue } from "recoil";
import {
  InteriorPosition,
  PropertyVariantProps,
  ImageColorAndVariantProps,
} from "../types";

export function useCarImageSlide() {
  const [configImages, setConfigImages] = useState<string[]>();
  const currentUserConfiguration = useRecoilValue(userConfigurationState);
  const activePage = useRecoilValue(activePageState);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);

  const handleCarImageFetch = async ({
    modelName,
    color,
    wheelVariant,
  }: ImageColorAndVariantProps) => {
    try {
      const images = await fetchCarImagesByColorAndVariant({
        modelName,
        color,
        wheelVariant,
      });

      setConfigImages(images);
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setIsDataFetching(false);
    }
  };

  const handleInteriorImageFetch = async ({
    modelName,
    name,
    variant,
  }: PropertyVariantProps) => {
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
        fetchPropertyImageByVariant(request)
      );

      const images = await Promise.all(imagePromises);

      setConfigImages(images);
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setIsDataFetching(false);
    }
  };

  useEffect(() => {
    if (!currentUserConfiguration) return;

    if (activePage?.name === "Interior") {
      const requestData: PropertyVariantProps = {
        modelName: currentUserConfiguration.model,
        name: "interior_variants",
        variant: currentUserConfiguration.interior_variants.label,
      };

      handleInteriorImageFetch(requestData);
      return;
    }

    const requestData: ImageColorAndVariantProps = {
      modelName: currentUserConfiguration.model,
      color: currentUserConfiguration.color.label,
      wheelVariant: currentUserConfiguration.wheels.label,
    };

    handleCarImageFetch(requestData);
  }, [currentUserConfiguration, activePage]);

  return { configImages, paginationBackRef, paginationNextRef, isDataFetching };
}
