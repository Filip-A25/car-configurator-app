import { useEffect } from "react";
import {
  currentConfigurationsState,
  userConfigurationState,
  dropdownOpen,
  dropdownState,
  activePageState,
  pageState,
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
  const setActivePage = useSetRecoilState(activePageState);
  const pages = useRecoilValue(pageState);

  const [searchParams] = useSearchParams();

  const modelId = searchParams.get("modelId");
  const configId = searchParams.get("configId");

  const handleUserConfigurationFetch = async () => {
    if (!user || !configId) throw new Error("Incomplete data.");
    try {
      const response = await fetchUserConfiguration(user.id, configId);
      setCurrentUserConfiguration({ ...response, id: configId });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleCarConfigurationsFetch = async (modelId: string) => {
    try {
      const defaultConfigurations = await fetchCarConfigurations(modelId);
      setConfigurations(defaultConfigurations);

      if (!user) throw new Error("User could not be found.");

      if (!configId) {
        setCurrentUserConfiguration({
          ...defaultConfigurations,
          modelId,
          modelPrice: defaultConfigurations.price,
          color: defaultConfigurations.color[0],
          wheels: defaultConfigurations.wheels[0],
          interior_variants: defaultConfigurations.interior_variants[0],
          creationDate: Timestamp.fromDate(new Date()),
          totalPrice:
            parseFloat(defaultConfigurations.price.toFixed(2)) +
            parseFloat(defaultConfigurations.color[0].price.toFixed(2)) +
            parseFloat(defaultConfigurations.wheels[0].price.toFixed(2)) +
            parseFloat(
              defaultConfigurations.interior_variants[0].price.toFixed(2)
            ),
        });

        return;
      }

      handleUserConfigurationFetch();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!modelId) return;
    handleCarConfigurationsFetch(modelId);
  }, [modelId]);

  useEffect(() => {
    setActivePage(pages[0]);

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
