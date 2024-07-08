import { useEffect } from "react";
import {
  currentConfigurationsState,
  userConfigurationState,
  dropdownOpen,
  dropdownState,
} from "../state";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchCarConfigurations, fetchUserConfiguration } from "../services";
import { useSearchParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { userState } from "../../authentification/state";

export function useConfigEdit() {
  const setConfigurations = useSetRecoilState(currentConfigurationsState);
  const setCurrentUserConfiguration = useSetRecoilState(userConfigurationState);
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const activeDropdownName = useRecoilValue(dropdownState);
  const user = useRecoilValue(userState);

  const [searchParams] = useSearchParams();

  const modelId = searchParams.get("modelId");
  const configId = searchParams.get("configId");

  const handleCarConfigurationsFetch = async (modelId: string) => {
    try {
      const defaultConfigurations = await fetchCarConfigurations(modelId);
      setConfigurations(defaultConfigurations);

      if (!user) throw new Error("User could not be found.");

      if (!configId) {
        setCurrentUserConfiguration({
          ...defaultConfigurations,
          modelId,
          color: defaultConfigurations.color[0],
          wheels: defaultConfigurations.wheels[0],
          interior_variants: defaultConfigurations.interior_variants[0],
          creationDate: Timestamp.fromDate(new Date()),
          totalPrice: defaultConfigurations.price,
        });

        return;
      }

      const userConfigurations = await fetchUserConfiguration(
        user.id,
        configId
      );

      setCurrentUserConfiguration({
        ...userConfigurations,
        modelId,
        color: userConfigurations.color,
        wheels: userConfigurations.wheels,
        interior_variants: userConfigurations.interior_variants,
        creationDate: userConfigurations.creationDate,
        totalPrice: userConfigurations.totalPrice,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!modelId) return;
    handleCarConfigurationsFetch(modelId);
  }, [modelId]);

  useEffect(() => {
    const preventPageLeave = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", preventPageLeave);

    return () => {
      window.removeEventListener("beforeunload", preventPageLeave);
    };
  }, []);

  return {
    isDropdownOpen,
    activeDropdownName,
  };
}
