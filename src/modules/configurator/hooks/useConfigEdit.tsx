import { useEffect } from "react";
import {
  currentConfigurationsState,
  userConfigurationState,
  dropdownOpen,
  dropdownState,
} from "../state";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { fetchCarConfigurations } from "../../../services/API_configurations";
import { useParams } from "react-router-dom";

export function useConfigEdit() {
  const [configurations, setConfigurations] = useRecoilState(
    currentConfigurationsState
  );
  const setCurrentUserConfiguration = useSetRecoilState(userConfigurationState);
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const activeDropdownName = useRecoilValue(dropdownState);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    handleCarConfigurationsFetch(id);
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
