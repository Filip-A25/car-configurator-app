import { useEffect } from "react";
import {
  currentConfigurations,
  userConfiguration,
  dropdownOpen,
  dropdownState,
} from "../state";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { fetchCarConfigurations } from "../../../services/API_configurations";

export function useConfigEdit() {
  const [configurations, setConfigurations] = useRecoilState(
    currentConfigurations
  );
  const setCurrentUserConfiguration = useSetRecoilState(userConfiguration);
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const activeDropdownName = useRecoilValue(dropdownState);

  useEffect(() => {
    handleCarConfigurationsFetch("8fYqUodzXUKYFVMYtUnJ");
  }, []);

  const handleCarConfigurationsFetch = async (id: string) => {
    try {
      const response = await fetchCarConfigurations(id);

      setConfigurations(response);

      setCurrentUserConfiguration({
        model: response.model,
        productionYear: response.productionYear,
        color: response.color[0],
        wheels: response.wheelVariants[1],
        interiorVariant: response.interiorVariants[0],
        price: response.price,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

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
    configurations,
    isDropdownOpen,
    activeDropdownName,
  };
}
