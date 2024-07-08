import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../authentification/state";
import { userConfigurationsState, userConfigurationState } from "../state";
import {
  fetchAllUserConfigurations,
  deleteUserConfiguration,
  fetchUserConfiguration,
} from "../services";
import { OptionsDropdownProps } from "../components";
import { useNavigate } from "react-router-dom";
import { notifyDelete } from "../utilities/utils";
import { configuratorRoutes } from "../components/const";

export function useOptionsDropdown({
  id,
  modelId,
  setIsOptionsDropdownOpen,
}: OptionsDropdownProps) {
  const user = useRecoilValue(userState);
  const setUserConfigurations = useSetRecoilState(userConfigurationsState);
  const setUserConfiguration = useSetRecoilState(userConfigurationState);

  const navigate = useNavigate();

  const handleUserConfigurationsFetch = async (userId: string) => {
    try {
      const response = await fetchAllUserConfigurations(userId);
      setUserConfigurations(response);
    } catch (err: any) {
      throw Error(err);
    }
  };

  const handleConfigurationDelete = async (userId: string) => {
    try {
      await deleteUserConfiguration(userId, id);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleDeleteClick = async () => {
    if (!user) throw new Error("User could not be found.");
    try {
      await handleConfigurationDelete(user.id);
      await handleUserConfigurationsFetch(user.id);
      setIsOptionsDropdownOpen(false);
      notifyDelete();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleEditConfigurationNavigate = async () => {
    if (!user) throw new Error("User could not be found.");
    try {
      const response = await fetchUserConfiguration(user.id, id);
      setUserConfiguration(response);
      navigate(
        `${configuratorRoutes.configurations}/view?modelId=${modelId}&configId=${id}`
      );
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return { handleDeleteClick, handleEditConfigurationNavigate };
}
