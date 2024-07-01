import { useEffect } from "react";
import {
  currentConfigurationsState,
  userConfigurationState,
  dropdownOpen,
  dropdownState,
} from "../state";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { fetchCarConfigurations } from "../services";
import { useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

export function useConfigEdit() {
  const [configurations, setConfigurations] = useRecoilState(
    currentConfigurationsState
  );
  const setCurrentUserConfiguration = useSetRecoilState(userConfigurationState);
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const activeDropdownName = useRecoilValue(dropdownState);

  const { id } = useParams();

  const handleCarConfigurationsFetch = async (id: string) => {
    try {
      const response = await fetchCarConfigurations(id);

      setConfigurations(response);

      setCurrentUserConfiguration({
        ...response,
        modelId: id,
        color: response.color[0],
        wheels: response.wheelVariants[0],
        interiorVariant: response.interiorVariants[0],
        creationDate: Timestamp.fromDate(new Date()),
        totalPrice: response.price,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!id) return;
    handleCarConfigurationsFetch(id);
  }, []);

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
