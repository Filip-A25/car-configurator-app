import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../authentification/state";
import { userConfigurationsState } from "../state";
import {
  fetchAllUserConfigurations,
  deleteUserConfiguration,
} from "../services";
import { OptionsDropdownProps } from "../components";
import { useNavigate } from "react-router-dom";
import { notifyDelete } from "../utilities/utilities";

export function useOptionsDropdown({
  id,
  modelId,
  setIsOptionsDropdownOpen,
}: OptionsDropdownProps) {
  const user = useRecoilValue(userState);
  const setUserConfigurations = useSetRecoilState(userConfigurationsState);

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
    navigate(`/home/configurations/view?modelId=${modelId}&configId=${id}`);
  };

  return { handleDeleteClick, handleEditConfigurationNavigate };
}
