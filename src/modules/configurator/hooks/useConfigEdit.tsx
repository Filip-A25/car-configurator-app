import { useEffect, useState, useRef } from "react";
import {
  currentConfigurations,
  userConfiguration,
  dropdownOpen,
  dropdownState,
} from "../state";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fetchCarConfigurations,
  fetchCarImagesByColorAndVariant,
} from "../../../services/API_configurations";

export function useConfigEdit() {
  const [configurations, setConfigurations] = useRecoilState(
    currentConfigurations
  );
  const [currentUserConfiguration, setCurrentUserConfiguration] =
    useRecoilState(userConfiguration);
  const [configImages, setConfigImages] = useState<string[]>();
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const activeDropdownName = useRecoilValue(dropdownState);

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);

  useEffect(() => {
    handleCarConfigurationsFetch("8fYqUodzXUKYFVMYtUnJ");
    handleCarImageFetch("Audi RS5", "tango_red", 1);
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

  const handleCarConfigurationsFetch = async (id: string) => {
    try {
      const response = await fetchCarConfigurations(id);

      setConfigurations(response);

      setCurrentUserConfiguration({
        model: response.model,
        productionYear: response.productionYear,
        color: response.colors[0],
        wheels: response.wheelVariants[0],
        interiorVariant: response.interiorVariants[0],
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return {
    configurations,
    configImages,
    isDropdownOpen,
    activeDropdownName,
    paginationBackRef,
    paginationNextRef,
  };
}
