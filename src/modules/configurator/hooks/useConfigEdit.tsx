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
        wheels: response.wheelVariants[0],
        interiorVariant: response.interiorVariants[0],
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return {
    configurations,
    isDropdownOpen,
    activeDropdownName,
  };
}
