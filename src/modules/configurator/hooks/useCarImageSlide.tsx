import { useRef, useState, useEffect } from "react";
import { fetchCarImagesByColorAndVariant } from "../../../services/API_configurations";
import { userConfiguration } from "../state";
import { useRecoilValue } from "recoil";

export function useCarImageSlide() {
  const [configImages, setConfigImages] = useState<string[]>();
  const currentUserConfiguration = useRecoilValue(userConfiguration);

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);

  useEffect(() => {
    handleCarImageFetch("Audi RS5", "nardo_grey", 1);
  }, []);

  useEffect(() => {
    if (currentUserConfiguration) {
      handleCarImageFetch(
        currentUserConfiguration.model,
        currentUserConfiguration.color.label,
        currentUserConfiguration.wheels.label
      );
    }
  }, [currentUserConfiguration]);

  const handleCarImageFetch = async (
    modelName: "Audi RS5" | "Audi RS6" | "Audi e-tron GT",
    color: string,
    wheelVariant: number
  ) => {
    try {
      const photos = await fetchCarImagesByColorAndVariant(
        modelName,
        color,
        wheelVariant
      );

      setConfigImages(photos);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return { configImages, paginationBackRef, paginationNextRef };
}
